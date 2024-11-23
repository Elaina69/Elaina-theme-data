let datapath = new URL("..", import.meta.url).href

DataStore.set("settingsChangenumber", 0)

import utils from '../utils/utils.js'
import cdnVersion from "../update/cdnVersionList.js"
import datastore_list from "../config/datastoreDefault.js"

const CONSOLE_STYLE = {
    prefix: '%c Elaina ',
    css: 'color: #ffffff; background-color: #f77fbe'
};

const log = (message, ...args) => console.log(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);
const error = (message, ...args) => console.error(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);

async function restartAfterChange(el, data) {
    let lastdata = document.getElementById(el).getAttribute("lastdatastore")
    
    DataStore.set("settingsChangenumber", lastdata == JSON.stringify(DataStore.get(data))? DataStore.get("settingsChangenumber") + 1 : DataStore.get("settingsChangenumber") - 1)

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

function tickcheck (Data, el, checkbox) {
    try {
        let element = document.getElementById(el)
        let box = document.getElementById(checkbox)
        if (Data && element.getAttribute("class") == "") {
            box.checked = true
        }
    }
    catch{ error(`Can't find target's class`) }
}

function writeBackupData() {
    let keys = Object.keys(datastore_list)
    let mirage = datastore_list
    keys.forEach(key => {
        mirage[key] = DataStore.get(key)
    })
    writeBackup(DataStore.get("Summoner-ID"), "datastore.json", JSON.stringify(mirage))
}
window.writeBackupData = writeBackupData

export { datapath, utils, cdnVersion, tickcheck, restartAfterChange, datastore_list }

import data from "./settingsGroups/settingsStructure.js"
import { settingsUtils } from "../utils/settingsUtils.js"
import { themesSettings, themeSettingsCheckbox } from "./settingsGroups/themeSettings.js"
import { pluginsSettings, pluginsSettingsCheckbox} from "./settingsGroups/themePluginsSettings.js"
import { backuprestoretab } from "./settingsGroups/themeBackupRestore.js"
import { aboutustab } from "./settingsGroups/themeAboutUs.js"

export function Settings(context) {
    settingsUtils(context, data)
}
    
window.addEventListener('load', async () => {
    // function DeleteEl (target, confirm) {
    //     try {
    //         let origin = document.querySelector(target)
    //         if (confirm) {origin.remove()}
    //     }
    //     catch{}
    // }
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
                    let check = setInterval (()=>{
                        if (document.getElementById("Info")) {
                            clearInterval(check)
                            themeSettingsCheckbox()
                        }
                    },100)
                }
                else if (plugin && mutations.some((record) => Array.from(record.addedNodes).includes(plugin))) {
                    pluginsSettings(plugin)
                    let check = setInterval (()=>{
                        if (document.getElementById("Info")) {
                            clearInterval(check)
                            try {
                                let origin = document.querySelector(".plugins-settings-logo")
                                origin.addEventListener("click", ()=> {
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
                            }
                            catch{}
                            if (DataStore.get("Dev-button")) {
                                tickcheck(DataStore.get("Dev-mode"), "devbutton", "devbuttonbox")
                            }
                            pluginsSettingsCheckbox()
                        }
                    },100)
                }
                else if (backupandrestore && mutations.some((record) => Array.from(record.addedNodes).includes(backupandrestore))) {
                    backuprestoretab(backupandrestore)
                    let check = setInterval (()=>{
                        if (document.getElementById("bakdata")) {
                            clearInterval(check)
                            tickcheck(DataStore.get("backup-datastore"), "bakdata", "bakdatabox")
                        }
                    },100)
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