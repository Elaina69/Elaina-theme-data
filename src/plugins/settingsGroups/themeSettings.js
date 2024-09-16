import { UI } from "./settingsUI.js"
import { tickcheck, restartAfterChange, utils } from "../settings.js"

async function themesSettings(panel) {
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
                UI.Image("Logo.png", "theme-settings-logo")
            ]),
            UI.Label(await getString("add-background-manually")),
            UI.Row("add-background-manually-row", [
                UI.Label(" ", "add-background-manual-message"),
                UI.Label(await getString("wallpaper")),
                UI.Row("manual-wallpaper", [
                    UI.Input("manual-wallpaper-name"),
                    UI.Button(await getString("add"),"add-background",async ()=> {
                        let text = document.querySelector("#add-background-manual-message")
                        let currentWallpaper = DataStore.get("Wallpaper-list")
                        let newWallpaper = DataStore.get("manual-wallpaper-name")
                        let exist = false
                        for (let i = 0; i < currentWallpaper.length; i++) {
                            currentWallpaper[i] == newWallpaper? exist = true : exist = false
                        }
                        if (!exist) {
                            currentWallpaper.push(newWallpaper)
                            DataStore.set("Wallpaper-list", currentWallpaper)
                            text.textContent = await getString("wallpaper-added")
                            text.style.color = "green"
                        }
                        else {
                            text.textContent = await getString("wallpaper-already-added")
                            text.style.color = "red"
                        }
                    }),
                    UI.Button(await getString("delete"),"delete-background",async ()=> {
                        let text = document.querySelector("#add-background-manual-message")
                        let currentWallpaper = DataStore.get("Wallpaper-list")
                        let newWallpaper = DataStore.get("manual-wallpaper-name")
                        let temp = []
                        let exist = false
                        for (let i = 0; i < currentWallpaper.length; i++) {
                            currentWallpaper[i] == newWallpaper? exist = true : exist = false
                            if (currentWallpaper[i] == newWallpaper) exist = true
                            else {
                                temp.push(currentWallpaper[i])
                                exist = false
                            }
                        }
                        DataStore.set("Wallpaper-list", temp)
                        if (exist) {
                            text.textContent = await getString("wallpaper-deleted")
                            text.style.color = "green"
                        }
                        else {
                            text.textContent = await getString("wallpaper-not-exist")
                            text.style.color = "red"
                        }
                    })
                ]),
                UI.Label(await getString("audio")),
                UI.Row("manual-audio", [
                    UI.Input("manual-audio-name"),
                    UI.Button(await getString("add"),"add-background",async ()=> {
                        let text = document.querySelector("#add-background-manual-message")
                        let currentAudio = DataStore.get("Audio-list")
                        let newAudio = DataStore.get("manual-audio-name")
                        let exist = false
                        for (let i = 0; i < currentAudio.length; i++) {
                            currentAudio[i] == newAudio? exist = true : exist = false
                        }
                        if (!exist) {
                            currentAudio.push(newAudio)
                            DataStore.set("Audio-list", currentAudio)
                            text.textContent = await getString("audio-added")
                            text.style.color = "green"
                        }
                        else {
                            text.textContent = await getString("audio-already-added")
                            text.style.color = "red"
                        }
                    }),
                    UI.Button(await getString("delete"),"delete-background",async ()=> {
                        let text = document.querySelector("#add-background-manual-message")
                        let currentAudio = DataStore.get("Audio-list")
                        let newAudio = DataStore.get("manual-audio-name")
                        let temp = []
                        let exist = false
                        for (let i = 0; i < currentAudio.length; i++) {
                            currentAudio[i] == newAudio? exist = true : exist = false
                            if (currentAudio[i] == newAudio) exist = true
                            else {
                                temp.push(currentAudio[i])
                                exist = false
                            }
                        }
                        DataStore.set("Audio-list", temp)
                        if (exist) {
                            text.textContent = await getString("audio-deleted")
                            text.style.color = "green"
                        }
                        else {
                            text.textContent = await getString("audio-not-exist")
                            text.style.color = "red"
                        }
                    })
                ]),
                UI.Label(await getString("banner")),
                UI.Row("manual-banner", [
                    UI.Input("manual-banner-name"),
                    UI.Button(await getString("add"),"add-background",async ()=> {
                        let text = document.querySelector("#add-background-manual-message")
                        let currentBanner = DataStore.get("Banner-list")
                        let newBanner = DataStore.get("manual-banner-name")
                        let exist = false
                        for (let i = 0; i < currentBanner.length; i++) {
                            currentBanner[i] == newBanner? exist = true : exist = false
                        }
                        if (!exist) {
                            currentBanner.push(newBanner)
                            DataStore.set("Banner-list", currentBanner)
                            text.textContent = await getString("banner-added")
                            text.style.color = "green"
                        }
                        else {
                            text.textContent = await getString("banner-already-added")
                            text.style.color = "red"
                        }
                    }),
                    UI.Button(await getString("delete"),"delete-background",async ()=> {
                        let text = document.querySelector("#add-background-manual-message")
                        let currentBanner = DataStore.get("Banner-list")
                        let newBanner = DataStore.get("manual-banner-name")
                        let temp = []
                        let exist = false
                        for (let i = 0; i < currentBanner.length; i++) {
                            currentBanner[i] == newBanner? exist = true : exist = false
                            if (currentBanner[i] == newBanner) exist = true
                            else {
                                temp.push(currentBanner[i])
                                exist = false
                            }
                        }
                        DataStore.set("Banner-list", temp)
                        if (exist) {
                            text.textContent = await getString("banner-deleted")
                            text.style.color = "green"
                        }
                        else {
                            text.textContent = await getString("banner-not-exist")
                            text.style.color = "red"
                        }
                    })
                ]),
                UI.Label(await getString("font")),
                UI.Row("manual-font", [
                    UI.Input("manual-font-name"),
                    UI.Button(await getString("add"),"add-background",async ()=> {
                        let text = document.querySelector("#add-background-manual-message")
                        let currentFont = DataStore.get("Font-list")
                        let newFont = DataStore.get("manual-font-name")
                        let exist = false
                        for (let i = 0; i < currentFont.length; i++) {
                            currentFont[i] == newFont? exist = true : exist = false
                        }
                        if (!exist) {
                            currentFont.push(newFont)
                            DataStore.set("Font-list", currentFont)
                            text.textContent = await getString("font-added")
                            text.style.color = "green"
                        }
                        else {
                            text.textContent = await getString("font-already-added")
                            text.style.color = "red"
                        }
                    }),
                    UI.Button(await getString("delete"),"delete-background",async ()=> {
                        let text = document.querySelector("#add-background-manual-message")
                        let currentFont = DataStore.get("Font-list")
                        let newFont = DataStore.get("manual-font-name")
                        let temp = []
                        let exist = false
                        for (let i = 0; i < currentFont.length; i++) {
                            currentFont[i] == newFont? exist = true : exist = false
                            if (currentFont[i] == newFont) exist = true
                            else {
                                temp.push(currentFont[i])
                                exist = false
                            }
                        }
                        DataStore.set("Font-list", temp)
                        if (exist) {
                            text.textContent = await getString("font-deleted")
                            text.style.color = "green"
                        }
                        else {
                            text.textContent = await getString("font-not-exist")
                            text.style.color = "red"
                        }
                    })
                ]),
            ], true),
            UI.Label(await getString("wallpaper/audio-settings")),
            UI.Row("background-settings",[
                UI.Button(await getString("open-background-folder"), "open-background-folder", () => { window.openPluginsFolder(`${DataStore.get("Plugin-folder-name")}/src/assets/backgrounds`) }),
                UI.Slider(
                    await getString("wallpaper-volume"),DataStore.get("wallpaper-volume"),"elaina-bg","wallpaper-volume"
                ),
                UI.Label(await getString("Wallpaper-Speed"), ""),
                UI.Row("changePlaybackRow",[
                    UI.SpeedInput("Playback-speed"),
                    UI.Label("%","playback-percent"),
                ]),
                UI.Label("", "speed-check"),
                document.createElement('br'),
                UI.Slider(
                    await getString("music-volume"),DataStore.get("audio-volume"),"bg-audio","audio-volume"
                ),
                UI.CheckBox(
                    `${await getString("turnoff-audio-ingame")}`,'offaudio','offaudiobox', ()=>{
                        let el = document.getElementById("offaudio")
                        let box = document.getElementById("offaudiobox")
                
                        if (DataStore.get("turnoff-audio-ingame")) {
                            el.removeAttribute("class")
                            box.checked = false
                            DataStore.set("turnoff-audio-ingame", false)
                        }
                        else {
                            el.setAttribute("class", "checked")
                            box.checked = true
                            DataStore.set("turnoff-audio-ingame", true)
                        }
                    },true, "turnoff-audio-ingame"
                ),
            ]),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("prevent-manual-update")}`,'prvtup','prvtupbox',
                ()=>{
                    let prvtupel = document.getElementById("prvtup")
                    let prvtupbox = document.getElementById("prvtupbox")
            
                    if (DataStore.get("prevent-manual-update")) {
                    prvtupel.removeAttribute("class")
                    prvtupbox.checked = false
                    DataStore.set("prevent-manual-update", false)
                    }
                    else {
                    prvtupel.setAttribute("class", "checked")
                    prvtupbox.checked = true
                    DataStore.set("prevent-manual-update", true)
                    }
                },true
            ),
            document.createElement('br'),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("custom-navbar-css")}`,'cusnavcss','cusnavcssbox', ()=>{
                    restartAfterChange("cusnavcss","custom-navbar-css")
                    let el = document.getElementById("cusnavcss")
                    let box = document.getElementById("cusnavcssbox")
            
                    if (DataStore.get("custom-navbar-css")) {
                        el.removeAttribute("class")
                        box.checked = false
                        DataStore.set("custom-navbar-css", false)
                    }
                    else {
                        el.setAttribute("class", "checked")
                        box.checked = true
                        DataStore.set("custom-navbar-css", true)
                    }
                },true, "custom-navbar-css"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("old-prev/next-button")}`,"oldpnb","oldpnbbox",
                ()=>{
                    let oldpnbel = document.getElementById("oldpnb")
                    let oldpnbbox = document.getElementById("oldpnbbox")
    
                    if (DataStore.get("old-prev/next-button")) {
                        oldpnbbox.checked = false
                        DataStore.set("old-prev/next-button", false)
                        oldpnbel.removeAttribute("class")
                        del_webm_buttons()
                        create_webm_buttons()
                    }
                    else {
                        oldpnbbox.checked = true
                        DataStore.set("old-prev/next-button", true)
                        oldpnbel.setAttribute("class", "checked")
                        del_webm_buttons()
                        create_webm_buttons()
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("sidebar-transparent")}`,'sbt','sbtbox', 
                ()=>{
                    let sbtel = document.getElementById("sbt")
                    let sbtbox = document.getElementById("sbtbox")
                    restartAfterChange("sbt", "sidebar-transparent")
                    if (DataStore.get("sidebar-transparent")) {
                    sbtbox.checked = false
                    DataStore.set("sidebar-transparent", false)
                    sbtel.removeAttribute("class")
                    }
                    else {
                    sbtbox.checked = true
                    DataStore.set("sidebar-transparent", true)
                    sbtel.setAttribute("class", "checked")
                    }
                },true, "sidebar-transparent"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("lobby-transparent-filter")}`,'ltf','ltfbox', 
                ()=>{
                    let el = document.getElementById("ltf")
                    let box = document.getElementById("ltfbox")
                    restartAfterChange("ltf", "lobby-transparent-filter")
                    if (DataStore.get("lobby-transparent-filter")) {
                        box.checked = false
                        DataStore.set("lobby-transparent-filter", false)
                        el.removeAttribute("class")
                    }
                    else {
                        box.checked = true
                        DataStore.set("lobby-transparent-filter", true)
                        el.setAttribute("class", "checked")
                    }
                },true, "lobby-transparent-filter"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("settings-dialogs-transparent")}`,'stdiat','stdiatbox',
                ()=>{
                    restartAfterChange("stdiat","settings-dialogs-transparent")
                    let stdiatel = document.getElementById("stdiat")
                    let stdiatbox = document.getElementById("stdiatbox")
    
                    if (DataStore.get("settings-dialogs-transparent")) {
                    stdiatbox.checked = false
                    DataStore.set("settings-dialogs-transparent", false)
                    stdiatel.removeAttribute("class")
                    }
                    else {
                    stdiatbox.checked = true
                    DataStore.set("settings-dialogs-transparent", true)
                    stdiatel.setAttribute("class", "checked")
                    }
                },true, "settings-dialogs-transparent"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-champions-splash-art")}`,'hidechampart','hidechampartbox',
                ()=>{
                    restartAfterChange('hidechampart', "hide-champions-splash-art")
                    let hidechampartel = document.getElementById("hidechampart")
                    let hidechampartbox = document.getElementById("hidechampartbox")
    
                    if (DataStore.get("hide-champions-splash-art")) {
                    hidechampartbox.checked = false
                    DataStore.set("hide-champions-splash-art", false)
                    hidechampartel.removeAttribute("class")
                    }
                    else {
                    hidechampartbox.checked = true
                    DataStore.set("hide-champions-splash-art", true)
                    hidechampartel.setAttribute("class", "checked")
                    }
                },true, "hide-champions-splash-art"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-vertical-lines")}`,"hidevl","hidevlbox",
                ()=>{
                    restartAfterChange("hidevl", "hide-vertical-lines")
                    let hidevlel = document.getElementById("hidevl")
                    let hidevlbox = document.getElementById("hidevlbox")
    
                    if (DataStore.get("hide-vertical-lines")) {
                    hidevlbox.checked = false
                    DataStore.set("hide-vertical-lines", false)
                    hidevlel.removeAttribute("class")
                    }
                    else {
                    hidevlbox.checked = true
                    DataStore.set("hide-vertical-lines", true)
                    hidevlel.setAttribute("class", "checked")
                    }
                },true, "hide-vertical-lines"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("custom-font")}`,'cusfont','cusfontbox',
                ()=>{
                    let cusfontel = document.getElementById("cusfont")
                    let cusfontbox = document.getElementById("cusfontbox")
    
                    if (DataStore.get("Custom-Font")) {
                        cusfontbox.checked = false
                        DataStore.set("Custom-Font", false)
                        cusfontel.removeAttribute("class")
                        document.querySelector("#Custom-font").remove()
                    }
                    else {
                        cusfontbox.checked = true
                        DataStore.set("Custom-Font", true)
                        cusfontel.setAttribute("class", "checked")
                        utils.addFont(DataStore.get("Font-folder")+DataStore.get("CurrentFont"),"Custom-font","Custom")
                    }
                },true
            ),
            document.createElement('br'),
            UI.DropdownCustomFont(),
            document.createElement('br'),
            UI.Row("Custom-Curency",[
                UI.Row("custom-rp",[
                    UI.CheckBox(
                        `${await getString("custom-rp")}`,'cusrp','cusrpbox',
                        ()=>{
                            let cusrpel = document.getElementById("cusrp")
                            let cusrpbox = document.getElementById("cusrpbox")
                            restartAfterChange('cusrp', "Custom_RP")
            
                            if (DataStore.get("Custom_RP")) {
                                cusrpbox.checked = false
                                DataStore.set("Custom_RP", false)
                                cusrpel.removeAttribute("class")
                            }
                            else {
                                cusrpbox.checked = true
                                DataStore.set("Custom_RP", true)
                                cusrpel.setAttribute("class", "checked")
                            }
                        },true, "Custom_RP"
                    ),
                    document.createElement('br'),
                    UI.Input("RP-data")
                ]),
                UI.Row("custom-be",[
                    UI.CheckBox(
                        `${await getString("custom-be")}`,'cusbe','cusbebox',
                        ()=>{
                            let cusbeel = document.getElementById("cusbe")
                            let cusbebox = document.getElementById("cusbebox")
                            restartAfterChange('cusbe', "Custom_BE")
            
                            if (DataStore.get("Custom_BE")) {
                                cusbebox.checked = false
                                DataStore.set("Custom_BE", false)
                                cusbeel.removeAttribute("class")
                            }
                            else {
                                cusbebox.checked = true
                                DataStore.set("Custom_BE", true)
                                cusbeel.setAttribute("class", "checked")
                            }
                        },true, "Custom_BE"
                    ),
                    document.createElement('br'),
                    UI.Input("BE")
                ])
            ]),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("custom-rank-name")}`,'cusrankname','cusranknamebox',
                ()=>{
                    restartAfterChange('cusrankname', "Custom-Rank-Name")
                    let cusranknameel = document.getElementById("cusrankname")
                    let cusranknamebox = document.getElementById("cusranknamebox")
    
                    if (DataStore.get("Custom-Rank-Name")) {
                    cusranknamebox.checked = false
                    DataStore.set("Custom-Rank-Name", false)
                    cusranknameel.removeAttribute("class")
                    }
                    else {
                    cusranknamebox.checked = true
                    DataStore.set("Custom-Rank-Name", true)
                    cusranknameel.setAttribute("class", "checked")
                    }
                },true, "Custom-Rank-Name"
            ),
            document.createElement('br'),
            UI.Input("Rank-line1"),
            UI.Input("Rank-line2"),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("change-nickname-color")}`,'nicknamecolor','nicknamecolorbox', ()=>{
                    let el = document.getElementById("nicknamecolor")
                    let box = document.getElementById("nicknamecolorbox")
            
                    if (DataStore.get("change-nickname-color")) {
                        el.removeAttribute("class")
                        box.checked = false
                        DataStore.set("change-nickname-color", false)
                    }
                    else {
                        el.setAttribute("class", "checked")
                        box.checked = true
                        DataStore.set("change-nickname-color", true)
                    }
                },true
            ),
            document.createElement('br'),
            UI.colorPicker("nickname-color", "nickname-color", () => {
                if (DataStore.get("change-nickname-color")) {
                    let input = document.getElementById("nickname-color")
                    DataStore.set("nickname-color", input.value)
                    try {
                        document.getElementById("nickname-color-css").remove()
                    }catch{}
                    utils.addStyleWithID("nickname-color-css", /*css*/`
                        span.player-name__force-locale-text-direction {
                            color: ${input.value};
                        }
                    `)
                }
            }),
            document.createElement('br'),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("animate-loading")}`,'aniload','aniloadbox',
                ()=>{
                    let aniloadel = document.getElementById("aniload")
                    let aniloadbox = document.getElementById("aniloadbox")
    
                    if (DataStore.get("animate-loading")) {
                    aniloadbox.checked = false
                    DataStore.set("animate-loading", false)
                    aniloadel.removeAttribute("class")
                    }
                    else {
                    aniloadbox.checked = true
                    DataStore.set("animate-loading", true)
                    aniloadel.setAttribute("class", "checked")
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("custom-icon")}`,'cusicon','cusiconbox',
                ()=>{
                    restartAfterChange('cusicon', "Custom-Icon")
                    let cusiconel = document.getElementById("cusicon")
                    let cusiconbox = document.getElementById("cusiconbox")
    
                    if (DataStore.get("Custom-Icon")) {
                    cusiconbox.checked = false
                    DataStore.set("Custom-Icon", false)
                    cusiconel.removeAttribute("class")
                    }
                    else {
                    cusiconbox.checked = true
                    DataStore.set("Custom-Icon", true)
                    cusiconel.setAttribute("class", "checked")
                    }
                },true, "Custom-Icon"
            ),
            document.createElement('br'),
            UI.Row("Custom-icon-list",[
                UI.CheckBox(
                    `${await getString("custom-avatar")}`,'cusav','cusavbox',
                    ()=>{
                        restartAfterChange('cusav', "Custom-Avatar")
                        let cusavel = document.getElementById("cusav")
                        let cusavbox = document.getElementById("cusavbox")
            
                        if (DataStore.get("Custom-Avatar")) {
                            cusavbox.checked = false
                            DataStore.set("Custom-Avatar", false)
                            cusavel.removeAttribute("class")
                        }
                        else {
                            cusavbox.checked = true
                            DataStore.set("Custom-Avatar", true)
                            cusavel.setAttribute("class", "checked")
                        }
                    },true, "Custom-Avatar"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Border")}`,'cusbor','cusborbox',
                    ()=>{
                        restartAfterChange('cusbor', "Custom-Border")
                        let cusborel = document.getElementById("cusbor")
                        let cusborbox = document.getElementById("cusborbox")
            
                        if (DataStore.get("Custom-Border")) {
                            cusborbox.checked = false
                            DataStore.set("Custom-Border", false)
                            cusborel.removeAttribute("class")
                        }
                        else {
                            cusborbox.checked = true
                            DataStore.set("Custom-Border", true)
                            cusborel.setAttribute("class", "checked")
                        }
                    },true, "Custom-Border"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Regalia-Banner")}`,'cusregabnr','cusregabnrbox',
                    ()=>{
                        restartAfterChange('cusregabnr', "Custom-Regalia-Banner")
                        let cusregabnrel = document.getElementById("cusregabnr")
                        let cusregabnrbox = document.getElementById("cusregabnrbox")
            
                        if (DataStore.get("Custom-Regalia-Banner")) {
                            cusregabnrbox.checked = false
                            DataStore.set("Custom-Regalia-Banner", false)
                            cusregabnrel.removeAttribute("class")
                        }
                        else {
                            cusregabnrbox.checked = true
                            DataStore.set("Custom-Regalia-Banner", true)
                            cusregabnrel.setAttribute("class", "checked")
                        }
                    },true, "Custom-Regalia-Banner"
                ),
                document.createElement('br'),
                UI.DropdownCustomBanner(),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Hover-card-backdrop")}`,'cushvbdrop','cushvbdropbox',
                    ()=>{
                        restartAfterChange('cushvbdrop', "Custom-Hover-card-backdrop")
                        let cushvbdropel = document.getElementById("cushvbdrop")
                        let cushvbdropbox = document.getElementById("cushvbdropbox")
            
                        if (DataStore.get("Custom-Hover-card-backdrop")) {
                            cushvbdropbox.checked = false
                            DataStore.set("Custom-Hover-card-backdrop", false)
                            cushvbdropel.removeAttribute("class")
                        }
                        else {
                            cushvbdropbox.checked = true
                            DataStore.set("Custom-Hover-card-backdrop", true)
                            cushvbdropel.setAttribute("class", "checked")
                        }
                    },true, "Custom-Hover-card-backdrop"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-RP-Icon")}`,'cusrpi','cusrpibox',
                    ()=>{
                        restartAfterChange('cusrpi', "Custom-RP-Icon")
                        let cusrpiel = document.getElementById("cusrpi")
                        let cusrpibox = document.getElementById("cusrpibox")
            
                        if (DataStore.get("Custom-RP-Icon")) {
                            cusrpibox.checked = false
                            DataStore.set("Custom-RP-Icon", false)
                            cusrpiel.removeAttribute("class")
                        }
                        else {
                            cusrpibox.checked = true
                            DataStore.set("Custom-RP-Icon", true)
                            cusrpiel.setAttribute("class", "checked")
                        }
                    },true, "Custom-RP-Icon"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-BE-Icon")}`,'cusbei','cusbeibox',
                    ()=>{
                        restartAfterChange('cusbei', "Custom-BE-Icon")
                        let cusbeiel = document.getElementById("cusbei")
                        let cusbeibox = document.getElementById("cusbeibox")
            
                        if (DataStore.get("Custom-BE-Icon")) {
                            cusbeibox.checked = false
                            DataStore.set("Custom-BE-Icon", false)
                            cusbeiel.removeAttribute("class")
                        }
                        else {
                            cusbeibox.checked = true
                            DataStore.set("Custom-BE-Icon", true)
                            cusbeiel.setAttribute("class", "checked")
                        }
                    },true, "Custom-BE-Icon"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Rank-Icon")}`,'cusranki','cusrankibox',
                    ()=>{
                        restartAfterChange('cusranki', "Custom-Rank-Icon")
                        let cusrankiel = document.getElementById("cusranki")
                        let cusrankibox = document.getElementById("cusrankibox")
            
                        if (DataStore.get("Custom-Rank-Icon")) {
                            cusrankibox.checked = false
                            DataStore.set("Custom-Rank-Icon", false)
                            cusrankiel.removeAttribute("class")
                        }
                        else {
                            cusrankibox.checked = true
                            DataStore.set("Custom-Rank-Icon", true)
                            cusrankiel.setAttribute("class", "checked")
                        }
                    },true, "Custom-Rank-Icon"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Emblem")}`,'cusemi','cusemibox',
                    ()=>{
                        restartAfterChange('cusemi',"Custom-Emblem")
                        let cusemiel = document.getElementById("cusemi")
                        let cusemibox = document.getElementById("cusemibox")
            
                        if (DataStore.get("Custom-Emblem")) {
                            cusemibox.checked = false
                            DataStore.set("Custom-Emblem", false)
                            cusemiel.removeAttribute("class")
                        }
                        else {
                            cusemibox.checked = true
                            DataStore.set("Custom-Emblem", true)
                            cusemiel.setAttribute("class", "checked")
                        }
                    },true, "Custom-Emblem"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Clash-banner")}`,'cusclassb','cusclassbbox',
                    ()=>{
                        restartAfterChange('cusclassb', "Custom-Clash-banner")
                        let cusclassbel = document.getElementById("cusclassb")
                        let cusclassbbox = document.getElementById("cusclassbbox")
            
                        if (DataStore.get("Custom-Clash-banner")) {
                            cusclassbbox.checked = false
                            DataStore.set("Custom-Clash-banner", false)
                            cusclassbel.removeAttribute("class")
                        }
                        else {
                            cusclassbbox.checked = true
                            DataStore.set("Custom-Clash-banner", true)
                            cusclassbel.setAttribute("class", "checked")
                        }
                    },true, "Custom-Clash-banner"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Trophy")}`,'custrophy','custrophybox',
                    ()=>{
                        restartAfterChange('custrophy', "Custom-Trophy")
                        let custrophyel = document.getElementById("custrophy")
                        let custrophybox = document.getElementById("custrophybox")
            
                        if (DataStore.get("Custom-Trophy")) {
                            custrophybox.checked = false
                            DataStore.set("Custom-Trophy", false)
                            custrophyel.removeAttribute("class")
                        }
                        else {
                            custrophybox.checked = true
                            DataStore.set("Custom-Trophy", true)
                            custrophyel.setAttribute("class", "checked")
                        }
                    },true, "Custom-Trophy"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString('Custom-Gamemode-Icon')}`,'cusgameicon','cusgameiconbox',
                    ()=>{
                        restartAfterChange('cusgameicon', 'Custom-Gamemode-Icon')
                        let cusgameiconel = document.getElementById("cusgameicon")
                        let cusgameiconbox = document.getElementById("cusgameiconbox")
            
                        if (DataStore.get('Custom-Gamemode-Icon')) {
                            cusgameiconbox.checked = false
                            DataStore.set('Custom-Gamemode-Icon', false)
                            cusgameiconel.removeAttribute("class")
                        }
                        else {
                            cusgameiconbox.checked = true
                            DataStore.set('Custom-Gamemode-Icon', true)
                            cusgameiconel.setAttribute("class", "checked")
                        }
                    },true, 'Custom-Gamemode-Icon'
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Ticker")}`,'custick','custickbox',
                    ()=>{
                        restartAfterChange('custick', "Custom-Ticker")
                        let custickel = document.getElementById("custick")
                        let custickbox = document.getElementById("custickbox")
            
                        if (DataStore.get("Custom-Ticker")) {
                            custickbox.checked = false
                            DataStore.set("Custom-Ticker", false)
                            custickel.removeAttribute("class")
                        }
                        else {
                            custickbox.checked = true
                            DataStore.set("Custom-Ticker", true)
                            custickel.setAttribute("class", "checked")
                        }
                    },true, "Custom-Ticker"
                ),
                document.createElement('br')
            ]),
            UI.CheckBox(
                `${await getString("custom-runes-bg")}`,'rsbg','rsbgbox',
                ()=>{
                    restartAfterChange('rsbg', "Runes-BG")
                    let rsbgel = document.getElementById("rsbg")
                    let rsbgbox = document.getElementById("rsbgbox")
    
                    if (DataStore.get("Runes-BG")) {
                    rsbgbox.checked = false
                    DataStore.set("Runes-BG", false)
                    rsbgel.removeAttribute("class")
                    }
                    else {
                    rsbgbox.checked = true
                    DataStore.set("Runes-BG", true)
                    rsbgel.setAttribute("class", "checked")
                    }
                },true, "Runes-BG"
            ),
            document.createElement('br'),
            /*UI.CheckBox(
                `${await getString("custom-cursor")}`,'cuscursor','cuscursorbox',
                ()=>{
                    let cuscursorel = document.getElementById("cuscursor")
                    let cuscursorbox = document.getElementById("cuscursorbox")
    
                    if (DataStore.get("Custom-Cursor")) {
                    cuscursorbox.checked = false
                    DataStore.set("Custom-Cursor", false)
                    cuscursorel.removeAttribute("class")
                    }
                    else {
                    cuscursorbox.checked = true
                    DataStore.set("Custom-Cursor", true)
                    cuscursorel.setAttribute("class", "checked")
                    }
                },true
            ),
            UI.Label(
                `*${await getString("note")}: ${await getString("note-2")}`
            ),
            document.createElement('br'),*/
            UI.CheckBox(
                `${await getString("hide-theme-usage-time")}`,'hideusetime','hideusetimebox',
                ()=>{
                    let hideusetimeel = document.getElementById("hideusetime")
                    let hideusetimebox = document.getElementById("hideusetimebox")
            
                    if (DataStore.get("hide-theme-usage-time")) {
                    hideusetimeel.removeAttribute("class")
                    hideusetimebox.checked = false
                    DataStore.set("hide-theme-usage-time", false)
                    }
                    else {
                    hideusetimeel.setAttribute("class", "checked")
                    hideusetimebox.checked = true
                    DataStore.set("hide-theme-usage-time", true)
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-overview")}`,'hideovertab','hideovertabbox',
                ()=>{
                    let hideovertabel = document.getElementById("hideovertab")
                    let hideovertabbox = document.getElementById("hideovertabbox")
    
                    if (DataStore.get("hide-overview")) {
                    hideovertabbox.checked = false
                    DataStore.set("hide-overview", false)
                    hideovertabel.removeAttribute("class")
                    applyShowtab()
                    }
                    else {
                    hideovertabbox.checked = true
                    DataStore.set("hide-overview", true)
                    hideovertabel.setAttribute("class", "checked")
                    applyHidetab()
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-merch")}`,'hidemerchtab','hidemerchtabbox',
                ()=>{
                    let hidemerchtabel = document.getElementById("hidemerchtab")
                    let hidemerchtabbox = document.getElementById("hidemerchtabbox")
    
                    if (DataStore.get("hide-merch")) {
                    hidemerchtabbox.checked = false
                    DataStore.set("hide-merch", false)
                    hidemerchtabel.removeAttribute("class")
                    applyShowtab()
                    }
                    else {
                    hidemerchtabbox.checked = true
                    DataStore.set("hide-merch", true)
                    hidemerchtabel.setAttribute("class", "checked")
                    applyHidetab()
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-patch-note")}`,'hidepn','hidepnbox',
                ()=>{
                    let hidepnel = document.getElementById("hidepn")
                    let hidepnbox = document.getElementById("hidepnbox")
    
                    if (DataStore.get("hide-patch-note")) {
                    hidepnbox.checked = false
                    DataStore.set("hide-patch-note", false)
                    hidepnel.removeAttribute("class")
                    applyShowtab()
                    }
                    else {
                    hidepnbox.checked = true
                    DataStore.set("hide-patch-note", true)
                    hidepnel.setAttribute("class", "checked")
                    applyHidetab()
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-esport")}`,'hideesptab','hideesptabbox',
                ()=>{
                    let hideesptabel = document.getElementById("hideesptab")
                    let hideesptabbox = document.getElementById("hideesptabbox")
    
                    if (DataStore.get("hide-esport")) {
                    hideesptabbox.checked = false
                    DataStore.set("hide-esport", false)
                    hideesptabel.removeAttribute("class")
                    applyShowtab()
                    }
                    else {
                    hideesptabbox.checked = true
                    DataStore.set("hide-esport", true)
                    hideesptabel.setAttribute("class", "checked")
                    applyHidetab()
                    }
                },true
            ),
            document.createElement('br'),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("NSFW-Content")}`,'nsfw','nsfwbox',
                ()=>{
                    let nsfwel = document.getElementById("nsfw")
                    let nsfwbox = document.getElementById("nsfwbox")
            
                    if (DataStore.get("NSFW-Content")) {
                    nsfwel.removeAttribute("class")
                    nsfwbox.checked = false
                    DataStore.set("NSFW-Content", false)
                    }
                    else {
                    nsfwel.setAttribute("class", "checked")
                    nsfwbox.checked = true
                    DataStore.set("NSFW-Content", true)
                    }
                },true
            ),
            document.createElement('br'),
            document.createElement('br'),
            // UI.CheckBox(
            //     `${await getString("Change-CDN-version")}`,'cdnver','cdnverbox', ()=>{
            //         let cdnverel = document.getElementById("cdnver")
            //         let cdnverbox = document.getElementById("cdnverbox")
            //         restartAfterChange('cdnver', "Change-CDN-version")
                
            //         if (DataStore.get("Change-CDN-version")) {
            //             cdnverel.removeAttribute("class")
            //             cdnverbox.checked = false
            //             DataStore.set("Change-CDN-version", false)
            //         }
            //         else {
            //             cdnverel.setAttribute("class", "checked")
            //             cdnverbox.checked = true
            //             DataStore.set("Change-CDN-version", true)
            //         }
            //     },DataStore.get("Dev-button"),"Change-CDN-version"
            // ),
            // document.createElement('br'),
            // UI.DropdownCDNversion(),
            // document.createElement('br'),
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

function themeSettingsCheckbox() {
    //tickcheck(DataStore.get(""), el, box)
    tickcheck(DataStore.get("custom-navbar-css"), "cusnavcss", "cusnavcssbox")
    tickcheck(DataStore.get("turnoff-audio-ingame"), "offaudio", "offaudiobox")
    tickcheck(DataStore.get("Change-CDN-version"), "cdnver", "cdnverbox")
    tickcheck(DataStore.get('Custom-Gamemode-Icon'), "cusgameicon", "cusgameiconbox")
    tickcheck(DataStore.get("NSFW-Content"), "nsfw", "nsfwbox")
    tickcheck(DataStore.get("prevent-manual-update"), "prvtup", "prvtupbox")
    tickcheck(DataStore.get("hide-theme-usage-time"), "hideusetime", "hideusetimebox")
    tickcheck(DataStore.get("Custom-Regalia-Banner"), "cusregabnr", "cusregabnrbox")
    tickcheck(DataStore.get("Custom-Hover-card-backdrop"), "cushvbdrop", "cushvbdropbox")
    tickcheck(DataStore.get("hide-overview"), "hideovertab", "hideovertabbox")
    tickcheck(DataStore.get("hide-merch"), "hidemerchtab", "hidemerchtabbox")
    tickcheck(DataStore.get("hide-patch-note"), "hidepn", "hidepnbox")
    tickcheck(DataStore.get("hide-esport"), "hideesptab", "hideesptabbox")
    tickcheck(DataStore.get("Custom-Border"), "cusbor", "cusborbox")
    tickcheck(DataStore.get("Custom-RP-Icon"), "cusrpi", "cusrpibox")
    tickcheck(DataStore.get("Custom-BE-Icon"), "cusbei", "cusbeibox")
    tickcheck(DataStore.get("Custom-Rank-Icon"), "cusranki", "cusrankibox")
    tickcheck(DataStore.get("Custom-Emblem"), "cusemi", "cusemibox")
    tickcheck(DataStore.get("Custom-Clash-banner"), "cusclassb", "cusclassbbox")
    tickcheck(DataStore.get("Custom-Ticker"), "custick", "custickbox")
    tickcheck(DataStore.get("Custom-Trophy"), "custrophy", "custrophybox")
    tickcheck(DataStore.get("Runes-BG"), "rsbg", "rsbgbox")
    tickcheck(DataStore.get("hide-vertical-lines"), "hidevl", "hidevlbox")
    tickcheck(DataStore.get("Sidebar-Transparent"), "sbt", "sbtbox")
    tickcheck(DataStore.get("Hide-Champions-Splash-Art"), "hidechampart", "hidechampartbox")
    tickcheck(DataStore.get("Custom-Font"), "cusfont", "cusfontbox")
    tickcheck(DataStore.get("Custom_RP"), "cusrp", "cusrpbox")
    tickcheck(DataStore.get("Custom_BE"), "cusbe", "cusbebox")
    tickcheck(DataStore.get("Custom-Rank-Name"), "cusrankname", "cusranknamebox")
    tickcheck(DataStore.get("animate-loading"), "aniload","aniloadbox")
    tickcheck(DataStore.get("Custom-Avatar"), "cusav", "cusavbox")
    tickcheck(DataStore.get("Custom-Icon"), "cusicon", "cusiconbox")
    tickcheck(DataStore.get("settings-dialogs-transparent"), "stdiat", "stdiatbox")
    tickcheck(DataStore.get("old-prev/next-button"), "oldpnb", "oldpnbbox")
    tickcheck(DataStore.get("lobby-transparent-filter"), 'ltf', 'ltfbox')
    tickcheck(DataStore.get("change-nickname-color"), 'nicknamecolor', 'nicknamecolorbox')
}

export { themesSettings, themeSettingsCheckbox }