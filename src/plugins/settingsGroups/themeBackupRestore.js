import { UI } from "./settingsUI.js"
import { datastore_list, utils } from "../settings.js"

async function CheckBackupFile() {
    try {
        document.getElementById("datastore-cloud-checking").textContent = `${await getString("Loading")}...`
        document.getElementById("datastore-cloud-checking").style.color = "#a09b8c"
    }catch{}
    window.setTimeout(async ()=>{
        let a = document.querySelector(".restore-data-button")
        let b = document.querySelector(".delete-data-button")
        let c = document.getElementById("datastore-cloud-checking")
        let checkFile = await readfile(`DataStore-backup/${await utils.getSummonerID()}/datastore.json`)
        if (checkFile.success) {
            console.log("You have backup file on cloud, ready to restore it.")
            c.textContent = `${await getString("Check-Backup.success")}`
            c.style.color = "green"
            a.style.visibility = "visible"
            b.style.visibility = "visible"
        }
        else {
            console.log("You don't have backup file on cloud yet.")
            c.textContent = `${await getString("Check-Backup.error")}`
            c.style.color = "red"
            a.style.visibility = "hidden"
            b.style.visibility = "hidden"
        }
    }, 2000)
}

function setDefaultData(list, restore) {
	Object.entries(list).forEach(([key, value]) => {
	  	if (!DataStore.has(key)) {
			DataStore.set(key, value);
			console.log(`${key} data restored`)
	  	}
		else if (DataStore.has(key) && restore) {
			DataStore.set(key, value);
			console.log(`${key} data restored`)
	  	}

	});
}

export async function backuprestoretab(panel) {
    CheckBackupFile()
    panel.prepend(
        UI.Row("",[
            UI.Label("Manual backup and restore", ""),
            document.createElement('br'),
            UI.Row("manualRestoreBackup", [
                UI.Button("Backup", "ManualBackup", async () => {
                    let sumID = await utils.getSummonerID()
                    let keys = Object.keys(datastore_list)
                    let mirage = datastore_list
                    keys.forEach(key => {
                        mirage[key] = DataStore.get(key)
                    })

                    let blob = new Blob([JSON.stringify(mirage)], { type: 'application/json' })
                    let a = document.getElementById("downloadBackup")
                    
                    a.href = URL.createObjectURL(blob)
                    a.download = `${sumID}.json`
                    a.click()
                    a.href = ""
                }),
                document.createElement('br'),
                UI.Row("RestoreRow", [
                    UI.Button(await getString("Restore-Data"),"ManualRestore", () => {
                        document.getElementById("manualRestoreInput").click()
                    }),
                    UI.Label("", "restoreFileInfo")
                ]),
                UI.fileInput("manualRestoreInput", ".json", async (event)=> {
                    const file = event.target.files[0]
                    let text = document.getElementById("restoreFileInfo")
                    
                    if (file && file.type === "application/json") {
                        const reader = new FileReader();
                    
                        reader.onload = async (e) => {
                            text.textContent = await getString("Manual-restore-inProgress")
                            text.style.color = "blue"
                            try {
                                const json = JSON.parse(e.target.result);
                                let restoreData = new Promise((resolve, reject) => {
                                    setTimeout(async () => {
                                        try { 
                                            setDefaultData(json, true)
                                            resolve()
                                            window.setTimeout(()=>window.restartClient(),2000)
                                        }
                                        catch {
                                            reject()
                                            console.log(eConsole+`%c Datastore file not found, avoid restoring`,eCss,"")
                                        }
                                    },5000)
                                })
                                
                                Toast.promise(restoreData, {
                                    loading: 'Restoring Datastore...',
                                    success: 'Restore complete!',
                                    error: 'Error while restoring data, check console for more info!'
                                })
                            } catch {
                                text.textContent = await getString("Invalid-JSON")
                                text.style.color = "red"
                            }
                        };
                    
                        reader.readAsText(file);
                    } 
                    else {
                        text.textContent = await getString("JSON-file-only")
                        text.style.color = "red"
                    }
                }),
                UI.Link("", ``, ()=> {}, "downloadBackup")
            ]),
            UI.CheckBox(
                `${await getString("backup-datastore")}`,'bakdata','bakdatabox',()=>{
                    let el = document.getElementById("bakdata")
                    let box = document.getElementById("bakdatabox")
            
                    if (DataStore.get("backup-datastore")) {
                        el.removeAttribute("class")
                        box.checked = false
                        DataStore.set("backup-datastore", false)
                        //deleteBackup(DataStore.get("Summoner-ID"))
                    }
                    else {
                        el.setAttribute("class", "checked")
                        box.checked = true
                        DataStore.set("backup-datastore", true)
                        CheckBackupFile()
                        //writeBackupData()
                    }
                },true
            ),
            UI.Label(`${await getString("Loading")}...`, "datastore-cloud-checking"),
            document.createElement('br'),
            UI.Row("restoreAndDeleteData", [
                UI.Button(`${await getString("Restore-Data")}`, "restore-data-button", () => {
                    let restoreData = new Promise((resolve, reject) => {
                        setTimeout(async () => {
                            try { 
                                let summonerID = await utils.getSummonerID()
                                let cloud = await readBackup(summonerID, "datastore.json")
                                if (cloud.success) {
                                    setDefaultData(JSON.parse(cloud.content), true)
                                    resolve()
                                    window.setTimeout(()=>window.restartClient(),2000)
                                }
                            }
                            catch {
                                reject()
                                console.log(eConsole+`%c Datastore file not found, avoid restoring`,eCss,"")
                            }
                        },5000)
                    })
                    
                    Toast.promise(restoreData, {
                        loading: 'Restoring Datastore...',
                        success: 'Restore complete!',
                        error: 'Error while restoring data, check console for more info!'
                    })
                }),
                UI.Button(`${await getString("Delete-Data")}`, "delete-data-button",async () => {
                    deleteBackup(DataStore.get("Summoner-ID"))
                    CheckBackupFile()
                }),
            ]),
        ])
    )
}