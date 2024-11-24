import { UI } from "./settingsUI.js"
import { tickcheck, restartAfterChange } from "../settings.js"

async function pluginsSettings(panel) {
    let rank = {
        "Ranked Queue ID": [
            {
                "id" : 0, 
                "name": `${await getString("Ranked Solo 5vs5")}`, 
                "Option": "RANKED_SOLO_5x5",
            },
            {
                "id" : 1, 
                "name": `${await getString("Ranked Flex Summoner's Rift")}`, 
                "Option": "RANKED_FLEX_SR",
            },
            {
                "id" : 2, 
                "name": `${await getString("Ranked Flex TT")}`,
                "Option": "RANKED_FLEX_TT", 
            },
            {
                "id" : 3, 
                "name": `${await getString("Ranked TFT")}`, 
                "Option": "RANKED_TFT",
            },
            {
                "id" : 4, 
                "name": `${await getString("Ranked TFT TURBO")}`, 
                "Option": "RANKED_TFT_TURBO",
            },
            {
                "id" : 5, 
                "name": `${await getString("Ranked TFT DOUBLE UP")}`, 
                "Option": "RANKED_TFT_DOUBLE_UP",
            },
            {
                "id" : 6, 
                "name": `${await getString("Ranked TFT PAIRS")}`, 
                "Option": "RANKED_TFT_PAIRS",
            },
            {
                "id" : 7, 
                "name": `${await getString("Arena")}`, 
                "Option": "CHERRY"
            }
        ],
    
        "Ranked Tier ID": [
            {
                "id" : 0, 
                "name": `${await getString("Iron")}`,
                "Option": "IRON",
            },
            {
                "id" : 1, 
                "name": `${await getString("Bronze")}`,
                "Option": "BRONZE",
            },
            {
                "id" : 2, 
                "name": `${await getString("Silver")}`,
                "Option": "SILVER",
            },
            {
                "id" : 3, 
                "name": `${await getString("Gold")}`,
                "Option": "GOLD",
            },
            {
                "id" : 4, 
                "name": `${await getString("Platinum")}`,
                "Option": "PLATINUM",
            },
            {
                "id" : 5, 
                "name": `${await getString("Diamond")}`,
                "Option": "DIAMOND",
            },
            {
                "id" : 6,
                "name": `${await getString("Emerald")}`,
                "Option": "EMERALD",
            },
            {
                "id" : 7, 
                "name": `${await getString("Master")}`,
                "Option": "MASTER",
            },
            {
                "id" : 8, 
                "name": `${await getString("Grand-Master")}`,
                "Option": "GRANDMASTER",
            },
            {
                "id" : 9, 
                "name": `${await getString("Challenger")}`,
                "Option": "CHALLENGER"
            }
        ],
    
        "Ranked Division ID": [
            {
                "id" : 0, 
                "name": "I"
            },
            {
                "id" : 1, 
                "name": "II"
            },
            {
                "id" : 2, 
                "name": "III"
            },
            {
                "id" : 3, 
                "name": "IV"
            }
        ]
    }
    
    panel.prepend(
        UI.Row("",[
            UI.Row("Info",[
                UI.Row("Info-div",[
                    UI.Link(
                    'ElainaV4',
                    'https://github.com/Elaina69/Elaina-V4'
                    ),
                    UI.Label(
                    `*${await getString("note")}: ${await getString("note-1")}`
                    ),
                ]),
                UI.Image("logo.png", "plugins-settings-logo")
            ]),
            UI.Label(
                `${await getString("plugins-settings")}`
            ),
            UI.CheckBox(
                `${await getString("old-ll-settings")}`,'oldll','oldllbox',
                ()=>{
                    restartAfterChange('oldll',"Old-League-Loader-Settings")
                    let oldllel = document.getElementById("oldll")
                    let oldllbox = document.getElementById("oldllbox")
    
                    if (DataStore.get("Old-League-Loader-Settings")) {
                        oldllbox.checked = false
                        DataStore.set("Old-League-Loader-Settings", false)
                        oldllel.removeAttribute("class")
                    }
                    else {
                        oldllbox.checked = true
                        DataStore.set("Old-League-Loader-Settings", true)
                        oldllel.setAttribute("class", "checked")
                    }
                },true,"Old-League-Loader-Settings"
            ),
            document.createElement('br'),
            UI.Row("loothelp",[
                UI.CheckBox(
                    `${await getString("loot-helper")}`,'lh','lhbox',
                    ()=>{
                        restartAfterChange('lh', "loot-helper")
                        let lhel = document.getElementById("lh")
                        let lhbox = document.getElementById("lhbox")
        
                        if (DataStore.get("loot-helper")) {
                            lhbox.checked = false
                            DataStore.set("loot-helper", false)
                            lhel.removeAttribute("class")
                        }
                        else {
                            lhbox.checked = true
                            DataStore.set("loot-helper", true)
                            lhel.setAttribute("class", "checked")
                        }
                    },true, "loot-helper"
                )
            ]),
            UI.CheckBox(
                `${await getString("auto_accept_button")}`,'autoacceptbutton','autoacceptbuttonbox',
                ()=>{
                    let autoacceptbuttonel = document.getElementById("autoacceptbutton")
                    let autoacceptbuttonbox = document.getElementById("autoacceptbuttonbox")
            
                    if (DataStore.get("auto_accept_button")) {
                        autoacceptbuttonel.removeAttribute("class")
                        autoacceptbuttonbox.checked = false
                        DataStore.set("auto_accept_button", false)
                        document.getElementById("autoAcceptQueueButton").remove()
                    }
                    else {
                        autoacceptbuttonel.setAttribute("class", "checked")
                        autoacceptbuttonbox.checked = true
                        DataStore.set("auto_accept_button", true)
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("Enable-Invite-Fr")}`,'invfr','invfrbox',
                ()=>{
                    let invfrel = document.getElementById("invfr")
                    let invfrbox = document.getElementById("invfrbox")
            
                    if (DataStore.get("Enable-Invite-Fr")) {
                    invfrel.removeAttribute("class")
                    invfrbox.checked = false
                    DataStore.set("Enable-Invite-Fr", false)
                    }
                    else {
                    invfrel.setAttribute("class", "checked")
                    invfrbox.checked = true
                    DataStore.set("Enable-Invite-Fr", true)
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("aram-only")}`, "Aram only", "Aram only checkbox",
                () => {
                    restartAfterChange("Aram only", "aram-only")
                    let Aramel = document.getElementById("Aram only")
                    let Arambox = document.getElementById("Aram only checkbox")
    
                    if (DataStore.get("aram-only")) {
                    Arambox.checked = false
                    DataStore.set("aram-only", false)
                    Aramel.removeAttribute("class")
                    }
                    else {
                    Arambox.checked = true
                    DataStore.set("aram-only", true)
                    Aramel.setAttribute("class", "checked")
                    }
                },true, "aram-only"
            ),
            document.createElement('br'),
            UI.Row("j1_4",[
                UI.CheckBox(
                    `${await getString("1/4-joke")}`,'_1_4','_1_4box',
                    ()=>{
                    let _1_4el = document.getElementById("_1_4")
                    let _1_4box = document.getElementById("_1_4box")
    
                    if (DataStore.get("April fool` joke")) {
                        _1_4box.checked = false
                        DataStore.set("April fool` joke", false)
                        _1_4el.removeAttribute("class")
                    }
                    else {
                        _1_4box.checked = true
                        DataStore.set("April fool` joke", true)
                        _1_4el.setAttribute("class", "checked")
                    }
                    },DataStore.get("Dev-button")
                )
            ]),
            // UI.Row("pandoru",[
            //     UI.CheckBox(
            //         `${await getString("Santa")}`,'MC','MCbox',
            //         ()=>{
            //         let MCel = document.getElementById("MC")
            //         let MCbox = document.getElementById("MCbox")
        
            //         if (DataStore.get("Merry-Christmas")) {
            //             MCbox.checked = false
            //             DataStore.set("Merry-Christmas", false)
            //             MCel.removeAttribute("class")
            //         }
            //         else {
            //             MCbox.checked = true
            //             DataStore.set("Merry-Christmas", true)
            //             MCel.setAttribute("class", "checked")
            //         }
            //         },true
            //     )
            // ]),
            // UI.Row("buyallchamp",[
            //     UI.CheckBox(
            //         `${await getString("buy-all-champs")}`,'byc','bycbox',
            //         ()=>{
            //         let bycel = document.getElementById("byc")
            //         let bycbox = document.getElementById("bycbox")
    
            //         if (DataStore.get("buy-all-champs")) {
            //             bycbox.checked = false
            //             DataStore.set("buy-all-champs", false)
            //             bycel.removeAttribute("class")
            //         }
            //         else {
            //             bycbox.checked = true
            //             DataStore.set("buy-all-champs", true)
            //             bycel.setAttribute("class", "checked")
            //         }
            //         },true
            //     ),
            //     document.createElement('br'),
            //     UI.Dropdown(ChampsP, "ChampsPrice", `${await getString("prices")}`, "description", "Cost"),
            //     document.createElement('br')
            // ]),
            UI.CheckBox(
                `${await getString("auto-find-queue")}`,'autoq','autoqbox',
                ()=>{
                    restartAfterChange('autoq', "Auto-Find-Queue")
                    let autoqel = document.getElementById("autoq")
                    let autoqbox = document.getElementById("autoqbox")
    
                    if (DataStore.get("Auto-Find-Queue")) {
                    autoqbox.checked = false
                    DataStore.set("Auto-Find-Queue", false)
                    autoqel.removeAttribute("class")
                    }
                    else {
                    autoqbox.checked = true
                    DataStore.set("Auto-Find-Queue", true)
                    autoqel.setAttribute("class", "checked")
                    }
                },true, "Auto-Find-Queue"
            ),
            UI.Row("Q-Delay",[
                UI.Row("Create-Delay",[
                    UI.Label(`${await getString("Create-Delay")}`, "Create-Delay-Text"),
                    UI.Input("Create-Delay"),
                ]),
                UI.Row("Find-Delay",[
                    UI.Label(`${await getString("Find-Delay")}`, "Find-Delay-Text"),
                    UI.Input("Find-Delay")
                ])
            ]),
            UI.Dropdown(DataStore.get("queueList"), "Gamemode", `${await getString("Gamemode")}`, "description", "queueId"),
            document.createElement('br'),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("Custom-profile-hover")}`,'cusprf','cusprfbox',
                ()=>{
                    restartAfterChange('cusprf', "Custom-profile-hover")
                    let cusprfel = document.getElementById("cusprf")
                    let cusprfbox = document.getElementById("cusprfbox")
            
                    if (DataStore.get("Custom-profile-hover")) {
                    cusprfel.removeAttribute("class")
                    cusprfbox.checked = false
                    DataStore.set("Custom-profile-hover", false)
                    }
                    else {
                    cusprfel.setAttribute("class", "checked")
                    cusprfbox.checked = true
                    DataStore.set("Custom-profile-hover", true)
                    }
                },true, "Custom-profile-hover"
            ),
            document.createElement('br'),
            UI.Row("customprf", [
                UI.CheckBox(
                    `${await getString("Custom-mastery-score")}`,'cusmastery','cusmasterybox',
                    ()=>{
                        restartAfterChange('cusmastery', "Custom-mastery-score")
                        let cusmasteryel = document.getElementById("cusmastery")
                        let cusmasterybox = document.getElementById("cusmasterybox")
                    
                        if (DataStore.get("Custom-mastery-score")) {
                            cusmasteryel.removeAttribute("class")
                            cusmasterybox.checked = false
                            DataStore.set("Custom-mastery-score", false)
                        }
                        else {
                            cusmasteryel.setAttribute("class", "checked")
                            cusmasterybox.checked = true
                            DataStore.set("Custom-mastery-score", true)
                        }
                    },true, "Custom-mastery-score"
                ),
                document.createElement('br'),
                UI.Input("Mastery-Score"),
                document.createElement('br'),
                UI.Row("customrank_checkbox", [
                    UI.CheckBox(
                        `${await getString("custom-rank-hover")}`,'cusrankhover','cusrankhoverbox',
                        ()=>{
                            restartAfterChange('cusrankhover', "Custom-rank")
                        let cusrankhoverel = document.getElementById("cusrankhover")
                        let cusrankhoverbox = document.getElementById("cusrankhoverbox")
        
                        if (DataStore.get("Custom-rank")) {
                            cusrankhoverbox.checked = false
                            DataStore.set("Custom-rank", false)
                            cusrankhoverel.removeAttribute("class")
                        }
                        else {
                            cusrankhoverbox.checked = true
                            DataStore.set("Custom-rank", true)
                            cusrankhoverel.setAttribute("class", "checked")
                        }
                        },true, "Custom-rank"
                    ),
                    // UI.Button(await getString("Refresh"), "refresh_option", async () => {
                    //     let requestRank = {
                    //         "lol": {
                    //             "rankedLeagueQueue"    : rank["Ranked Queue ID"][DataStore.get("Ranked Queue ID")]["Option"],
                    //             "rankedLeagueTier"     : rank["Ranked Tier ID"][DataStore.get("Ranked Tier ID")]["Option"],
                    //             "rankedLeagueDivision" : rank["Ranked Division ID"][DataStore.get("Ranked Division ID")]["name"]
                    //         }
                    //     }
                    //     await fetch("/lol-chat/v1/me", {
                    //         method: "PUT",
                    //         headers: {"content-type": "application/json"},
                    //         body: JSON.stringify(requestRank)
                    //     })
                    // })
                ]),
                document.createElement('br'),
                UI.Dropdown(rank, "Ranked Queue ID", `${await getString("Ranked Queue")}`, "name", "id"),
                document.createElement('br'),
                UI.Dropdown(rank, "Ranked Tier ID", `${await getString("Ranked Tier")}`, "name", "id"),
                document.createElement('br'),
                UI.Dropdown(rank, "Ranked Division ID", `${await getString("Ranked Division")}`, "name", "id"),
                document.createElement('br'),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-challenge-crystal")}`,'cuschalcry','cuschalcrybox',
                    ()=>{
                        restartAfterChange('cuschalcry',"Custom-challenge-crystal")
                    let cuschalcryel = document.getElementById("cuschalcry")
                    let cuschalcrybox = document.getElementById("cuschalcrybox")
                
                    if (DataStore.get("Custom-challenge-crystal")) {
                        cuschalcryel.removeAttribute("class")
                        cuschalcrybox.checked = false
                        DataStore.set("Custom-challenge-crystal", false)
                    }
                    else {
                        cuschalcryel.setAttribute("class", "checked")
                        cuschalcrybox.checked = true
                        DataStore.set("Custom-challenge-crystal", true)
                    }
                    },true,"Custom-challenge-crystal"
                ),
                document.createElement('br'),
                UI.Dropdown(rank, "Ranked Tier ID", `${await getString("challenge-rank")}`, "name", "id"),
                UI.Label(`${await getString("challenge-point")}`, "challenge-point-Text"),
                UI.Input("Challenge-Points"),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("custom-status")}`,'cussta','cusstabox',
                    ()=>{
                        restartAfterChange('cussta',"Custom-Status")
                    let cusstael = document.getElementById("cussta")
                    let cusstabox = document.getElementById("cusstabox")
    
                    if (DataStore.get("Custom-Status")) {
                        cusstabox.checked = false
                        DataStore.set("Custom-Status", false)
                        cusstael.removeAttribute("class")
                    }
                    else {
                        cusstabox.checked = true
                        DataStore.set("Custom-Status", true)
                        cusstael.setAttribute("class", "checked")
                    }
                    },true,"Custom-Status"
                ),
                UI.Label(`${await getString("status-delay")}`),
                UI.Input("status-delay"),
            ]),
            UI.Row("namespoof",[
                UI.CheckBox(
                    `${await getString("name-spoofer")}`,'namespf','namespfbox',
                    ()=>{
                        restartAfterChange('namespf',"Name-Spoofer")
                    let namespfel = document.getElementById("namespf")
                    let namespfbox = document.getElementById("namespfbox")
    
                    if (DataStore.get("Name-Spoofer")) {
                        namespfbox.checked = false
                        DataStore.set("Name-Spoofer", false)
                        namespfel.removeAttribute("class")
                    }
                    else {
                        namespfbox.checked = true
                        DataStore.set("Name-Spoofer", true)
                        namespfel.setAttribute("class", "checked")
                    }
                    },true,"Name-Spoofer"
                ),
                document.createElement('br'),
                UI.Input("Spoof-name"),
            ]),
            UI.CheckBox(
                `${await getString("Debug-mode")}`,'debug','debugbox',
                ()=>{
                    restartAfterChange('debug',"Debug-mode")
                    let debugel = document.getElementById("debug")
                    let debugbox = document.getElementById("debugbox")
            
                    if (DataStore.get("Debug-mode")) {
                    debugel.removeAttribute("class")
                    debugbox.checked = false
                    DataStore.set("Debug-mode", false)
                    }
                    else {
                    debugel.setAttribute("class", "checked")
                    debugbox.checked = true
                    DataStore.set("Debug-mode", true)
                    }
                },DataStore.get("Dev-button"),"Debug-mode"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("Developer-Mode")}`,'devbutton','devbuttonbox', ()=>{
                    restartAfterChange('devbutton',"Dev-mode")
                    let devbuttonel = document.getElementById("devbutton")
                    let devbuttonbox = document.getElementById("devbuttonbox")
            
                    if (DataStore.get("Dev-mode")) {
                        devbuttonel.removeAttribute("class")
                        devbuttonbox.checked = false
                        DataStore.set("Dev-mode", false)
                    }
                    else {
                        devbuttonel.setAttribute("class", "checked")
                        devbuttonbox.checked = true
                        DataStore.set("Dev-mode", true)
                        window.alert("You just turned on developer mode \nIf you are not a developer, please turn it off right now \nOtherwise the whole theme will not work properly")
                    }
                },DataStore.get("Dev-button"),"Dev-mode"
            ),
            document.createElement('br'),
        ])
    )
}

/*
UI.CheckBox(
    `${await getString("")}`,'','box', ()=>{
        restartAfterChange(,)
        let el = document.getElementById("")
        let box = document.getElementById("box")

        if (DataStore.get("")) {
            el.removeAttribute("class")
            box.checked = false
            DataStore.set("", false)
        }
        else {
            el.setAttribute("class", "checked")
            box.checked = true
            DataStore.set("", true)
        }
    },true
),
document.createElement('br'),
*/

function pluginsSettingsCheckbox() {
    //tickcheck(DataStore.get(""), el, box)
    tickcheck(DataStore.get("Enable-Invite-Fr"), 'invfr', "invfrbox")
    tickcheck(DataStore.get("Debug-mode"), "debug", "debugbox")
    tickcheck(DataStore.get("Custom-profile-hover"), "cusprf", "cusprfbox")
    tickcheck(DataStore.get("Custom-mastery-score"), "cusmastery", "cusmasterybox")
    tickcheck(DataStore.get("Custom-challenge-crystal"), "cuschalcry", "cuschalcrybox")
    tickcheck(DataStore.get("Name-Spoofer"), "namespf", "namespfbox")
    tickcheck(DataStore.get("aram-only"), "Aram only", "Aram only checkbox")
    tickcheck(DataStore.get("Old-League-Loader-Settings"), "oldll", "oldllbox")
    tickcheck(DataStore.get("Auto-Find-Queue"), "autoq", "autoqbox")
    tickcheck(DataStore.get("Custom-Status"), "cussta", "cusstabox")
    tickcheck(DataStore.get("April fool` joke"), "_1_4", "_1_4box")
    //tickcheck(DataStore.get("Merry-Christmas"), "MC", "MCbox")
    tickcheck(DataStore.get("loot-helper"), "lh", "lhbox")
    //tickcheck(DataStore.get("buy-all-champs"), "byc", "bycbox")
    tickcheck(DataStore.get("Custom-rank"), "cusrankhover", "cusrankhoverbox")
    tickcheck(DataStore.get("auto_accept_button"), "autoacceptbutton", "autoacceptbuttonbox")
}

export { pluginsSettings, pluginsSettingsCheckbox }