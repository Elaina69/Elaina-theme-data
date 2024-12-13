import utils from '../utils/utils.js'
import * as observer from "../utils/observer.js"
import cdnVersion from "../update/cdnVersionList.js"
import datastore_list from "../config/datastoreDefault.js"
import data from "./settingsGroups/settingsStructure.js"
import { settingsUtils } from "../utils/settingsUtils.js"
import { themesSettings } from "./settingsGroups/themeSettings.js"
import { pluginsSettings } from "./settingsGroups/themePluginsSettings.js"
import { backuprestoretab } from "./settingsGroups/themeBackupRestore.js"
import { aboutustab } from "./settingsGroups/themeAboutUs.js"
import { log, error } from "../utils/themeLog.js";

let datapath = new URL("..", import.meta.url).href

DataStore.set("settingsChangenumber", 0)

async function restartAfterChange(el, data) {
    let lastdata = document.getElementById(el).getAttribute("lastdatastore")
    
    DataStore.set("settingsChangenumber", lastdata == JSON.stringify(!DataStore.get(data))? DataStore.get("settingsChangenumber") + 1 : DataStore.get("settingsChangenumber") - 1)

    if (!document.querySelector("#restartAfterChangeButton") && DataStore.get("settingsChangenumber") > 0) {
        let target = document.querySelector(".lol-settings-footer.ember-view")
        let a = document.createElement("lol-uikit-flat-button-group")
        let b = document.createElement("lol-uikit-flat-button")

        a.setAttribute("type","window-popup")
        a.classList.add("lol-settings-close-container")
        a.style.cssText = "margin-left: 10px"
        a.id = "restartAfterChangeButton"

        b.classList.add("lol-settings-close-button")
        b.style.cssText = "width: 150px;"
        b.textContent = await getString("restart-client")
        b.id = "restartAfterChange"

        b.addEventListener("click",() => {
            let keys = Object.keys(datastore_list)
            let mirage = datastore_list
            keys.forEach(key => {
                mirage[key] = DataStore.get(key)
            })
            if (DataStore.get("backup-datastore")) {
                try { writeBackupData() }
                catch { log("Server is down rightnow")}
                window.setTimeout(()=>{
                    window.restartClient()
                }, 3000)
            }
            else window.restartClient()
        })

        target.append(a)
        a.append(b)
    }
    else if (DataStore.get("settingsChangenumber") == 0) {
        document.querySelector("#restartAfterChangeButton").remove()
    }
}

function writeBackupData() {
    let keys = Object.keys(datastore_list)
    let mirage = datastore_list
    keys.forEach(key => {
        mirage[key] = DataStore.get(key)
    })
    writeBackup(DataStore.get("Summoner-ID"), "datastore.json", JSON.stringify(mirage))
}
    
window.addEventListener('load', async () => {
    observer.subscribeToElementCreation(".plugins-settings-logo", (element) => {
        element.addEventListener("click", ()=> {
            DataStore.set("Active-dev-button", DataStore.get("Active-dev-button") + 1)
            if (DataStore.get("Active-dev-button") == 20) {
                DataStore.set("Dev-button", true)
                log("Developer mode button has appeared !")
            }
            else if (DataStore.get("Active-dev-button") > 20) {
                DataStore.set("Dev-button", true)
                log("You already become developer !")
            }
        })
    })
    const interval = setInterval(() => {
        const manager = document.getElementById('lol-uikit-layer-manager-wrapper')
        if (manager) {
            clearInterval(interval)
            new MutationObserver((mutations) => {
                const plugin = document.querySelector('lol-uikit-scrollable.plugins_settings')
                const theme = document.querySelector('lol-uikit-scrollable.theme_settings')
                const aboutus = document.querySelector('lol-uikit-scrollable.aboutus_settings')
                const backupandrestore = document.querySelector('lol-uikit-scrollable.backup_restore_settings')

                if (theme && mutations.some((record) => Array.from(record.addedNodes).includes(theme))) {
                    themesSettings(theme)
                }
                else if (plugin && mutations.some((record) => Array.from(record.addedNodes).includes(plugin))) {
                    pluginsSettings(plugin)
                }
                else if (backupandrestore && mutations.some((record) => Array.from(record.addedNodes).includes(backupandrestore))) {
                    backuprestoretab(backupandrestore)
                }
                else if (aboutus && mutations.some((record) => Array.from(record.addedNodes).includes(aboutus))) {
                    aboutustab(aboutus)
                }
            }).observe(manager, {
                childList: true,
                subtree: true
            })
        }
    },500)
})

export { datapath, utils, cdnVersion, restartAfterChange, datastore_list }
export function Settings(context) {
    settingsUtils(context, data)
}

window.writeBackupData = writeBackupData