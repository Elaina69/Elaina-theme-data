import { log } from "../utils/themeLog.js";

window.addEventListener("keydown", async (event)=>{
    let key = event.key
    if (event.ctrlKey && key=="p") {
        window.openPluginsFolder(`${DataStore.get("Plugin-folder-name")}`)
    }
    if (key=="F1") {
        CommandBar.show()
    }
    // if (key=="F5") {
    //     window.restartClient()
    // }
    if ((event.ctrlKey && key=="s") || (event.altKey && key =="F4")) {
        writeBackupData()
    }
    if (event.key === 'Tab') {
        event.preventDefault()
        log("Tab key is disable!");
    }
})