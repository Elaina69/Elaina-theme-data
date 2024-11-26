import { UI } from "./settingsUI.js"
import { restartAfterChange, utils } from "../settings.js"

const FILE_REGEX = {
    Wallpaper: /\.(png|jpg|jpeg|gif|bmp|webp|ico|mp4|webm|mkv|mov|avi|wmv|3gp|m4v)$/,
    Audio: /\.(mp3|flac|ogg|wav|aac)$/,
    Font: /\.(ttf|otf|woff|woff2)$/,
    Banner: /\.(png|jpg|jpeg|gif|bmp|webp|ico)$/,
};

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
                UI.Image("logo.png", "theme-settings-logo")
            ]),
            UI.Label(await getString("update-list-manually")),
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

                        if (!FILE_REGEX.Wallpaper.test(newWallpaper)) {
                            text.textContent = await getString("invalid-wallpaper-format");
                            text.style.color = "red";
                        }
                        else {
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

                        if (!FILE_REGEX.Audio.test(newAudio)) {
                            text.textContent = await getString("invalid-audio-format");
                            text.style.color = "red";
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

                        if (!FILE_REGEX.Banner.test(newBanner)) {
                            text.textContent = await getString("invalid-banner-format");
                            text.style.color = "red";
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

                        if (!FILE_REGEX.Font.test(newFont)) {
                            text.textContent = await getString("invalid-font-format");
                            text.style.color = "red";
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
                UI.Button(await getString("open-background-folder"), "open-background-folder", () => { window.openPluginsFolder(`${DataStore.get("Plugin-folder-name")}/assets/backgrounds`) }),
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
                    `${await getString("turnoff-audio-ingame")}`,'offaudio','offaudiobox', 
                    ()=>{},true, "turnoff-audio-ingame"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Disable-Theme-Audio")}`,"disablethemeaudio","disablethemeaudiobox", ()=>{
                        let audioController = document.querySelector(".webm-bottom-buttons-container")
                        let audio = document.getElementById("bg-audio")
                
                        if (!DataStore.get("Disable-Theme-Audio")) {
                            window.setAudio()
                            audioController.style.display = "flex"
                        }
                        else {
                            audio.src = ''
                            audioController.style.display = "none"
                        }
                    },true, "Disable-Theme-Audio"
                ),
            ]),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("prevent-manual-update")}`,'prvtup','prvtupbox',
                ()=>{},true,"prevent-manual-update"
            ),
            document.createElement('br'),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("custom-navbar-css")}`,'cusnavcss','cusnavcssbox', ()=>{
                    restartAfterChange("cusnavcss","custom-navbar-css")
                },true, "custom-navbar-css"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("old-prev/next-button")}`,"oldpnb","oldpnbbox",
                ()=>{
                    del_webm_buttons()
                    create_webm_buttons()
                },true, "old-prev/next-button"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("sidebar-transparent")}`,'sbt','sbtbox', 
                ()=>{
                    restartAfterChange("sbt", "sidebar-transparent")
                },true, "sidebar-transparent"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("lobby-transparent-filter")}`,'ltf','ltfbox', 
                ()=>{
                    restartAfterChange("ltf", "lobby-transparent-filter")
                },true, "lobby-transparent-filter"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("settings-dialogs-transparent")}`,'stdiat','stdiatbox',
                ()=>{
                    restartAfterChange("stdiat","settings-dialogs-transparent")
                },true, "settings-dialogs-transparent"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-champions-splash-art")}`,'hidechampart','hidechampartbox',
                ()=>{
                    restartAfterChange('hidechampart', "hide-champions-splash-art")
                },true, "hide-champions-splash-art"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-vertical-lines")}`,"hidevl","hidevlbox",
                ()=>{
                    restartAfterChange("hidevl", "hide-vertical-lines")
                },true, "hide-vertical-lines"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("custom-font")}`,'cusfont','cusfontbox',
                ()=>{
                    if (!DataStore.get("Custom-Font")) {
                        document.querySelector("#Custom-font").remove()
                    }
                    else {
                        utils.addFont(DataStore.get("Font-folder")+DataStore.get("CurrentFont"),"Custom-font","Custom")
                    }
                },true, "Custom-Font"
            ),
            document.createElement('br'),
            UI.DropdownCustomFont(),
            document.createElement('br'),
            UI.Row("Custom-Curency",[
                UI.Row("custom-rp",[
                    UI.CheckBox(
                        `${await getString("custom-rp")}`,'cusrp','cusrpbox',
                        ()=>{
                            restartAfterChange('cusrp', "Custom_RP")
                        },true, "Custom_RP"
                    ),
                    document.createElement('br'),
                    UI.Input("RP-data")
                ]),
                UI.Row("custom-be",[
                    UI.CheckBox(
                        `${await getString("custom-be")}`,'cusbe','cusbebox',
                        ()=>{
                            restartAfterChange('cusbe', "Custom_BE")
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
                },true, "Custom-Rank-Name"
            ),
            document.createElement('br'),
            UI.Input("Rank-line1"),
            UI.Input("Rank-line2"),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("change-nickname-color")}`,'nicknamecolor','nicknamecolorbox', ()=>{     
                    if (!DataStore.get("change-nickname-color")) {
                        document.getElementById("nickname-color-css").remove()
                    }
                    else {
                        utils.addStyleWithID("nickname-color-css", /*css*/`
                            span.player-name__force-locale-text-direction {
                                color: ${DataStore.get("nickname-color-with-opacity")};
                            }
                        `)
                    }
                },true, "change-nickname-color"
            ),
            document.createElement('br'),
            UI.Row("change-nickname-color-row", [
                UI.Row("nickname-color-with-text", [
                    UI.colorPicker("nickname-color", "nickname-color", () => {
                        let input = document.getElementById("nickname-color")
        
                        DataStore.set("nickname-color", input.value)
                        DataStore.set("nickname-color-with-opacity", input.value + DataStore.get("nickname-opacity"))
    
                        document.getElementById("nickname-color-text").innerHTML = DataStore.get("nickname-color-with-opacity")
        
                        if (DataStore.get("change-nickname-color")) {
                            document.getElementById("nickname-color-css").remove()
        
                            utils.addStyleWithID("nickname-color-css", /*css*/`
                                span.player-name__force-locale-text-direction {
                                    color: ${DataStore.get("nickname-color-with-opacity")};
                                }
                            `)
                        }
                    }),
                    UI.Label(DataStore.get("nickname-color-with-opacity"), "nickname-color-text")
                ]),
                UI.opacitySlider("change-nickname-opacity", await getString("opacity"), "nickname-opacity", async ()=> {
                    let origin = document.getElementById("change-nickname-opacity")
                    let title = document.getElementById("change-nickname-opacity-title")
    
                    DataStore.set("nickname-opacity", Math.round(origin.value / 100 * 255).toString(16).padStart(2, '0'))
                    DataStore.set("nickname-color-with-opacity", DataStore.get("nickname-color")+DataStore.get("nickname-opacity"))
    
                    title.innerHTML = `${await getString("opacity")}: ${origin.value}%`
    
                    document.getElementById("nickname-color-text").innerHTML = DataStore.get("nickname-color-with-opacity")
    
                    if ("change-nickname-color") {
                        document.getElementById("nickname-color-css").remove()
    
                        utils.addStyleWithID("nickname-color-css", /*css*/`
                            span.player-name__force-locale-text-direction {
                                color: ${DataStore.get("nickname-color-with-opacity")};
                            }
                        `)
                    }
                }),
            ]),
            UI.CheckBox(
                `${await getString("animate-loading")}`,'aniload','aniloadbox',
                ()=>{},true, "animate-loading"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("custom-icon")}`,'cusicon','cusiconbox',
                ()=>{
                    restartAfterChange('cusicon', "Custom-Icon")
                },true, "Custom-Icon"
            ),
            document.createElement('br'),
            UI.Row("Custom-icon-list",[
                UI.CheckBox(
                    `${await getString("custom-avatar")}`,'cusav','cusavbox',
                    ()=>{
                        restartAfterChange('cusav', "Custom-Avatar")
                    },true, "Custom-Avatar"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Border")}`,'cusbor','cusborbox',
                    ()=>{
                        restartAfterChange('cusbor', "Custom-Border")
                    },true, "Custom-Border"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Regalia-Banner")}`,'cusregabnr','cusregabnrbox',
                    ()=>{
                        restartAfterChange('cusregabnr', "Custom-Regalia-Banner")
                    },true, "Custom-Regalia-Banner"
                ),
                document.createElement('br'),
                UI.DropdownCustomBanner(),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Hover-card-backdrop")}`,'cushvbdrop','cushvbdropbox',
                    ()=>{
                        restartAfterChange('cushvbdrop', "Custom-Hover-card-backdrop")
                    },true, "Custom-Hover-card-backdrop"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-RP-Icon")}`,'cusrpi','cusrpibox',
                    ()=>{
                        restartAfterChange('cusrpi', "Custom-RP-Icon")
                    },true, "Custom-RP-Icon"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-BE-Icon")}`,'cusbei','cusbeibox',
                    ()=>{
                        restartAfterChange('cusbei', "Custom-BE-Icon")
                    },true, "Custom-BE-Icon"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Rank-Icon")}`,'cusranki','cusrankibox',
                    ()=>{
                        restartAfterChange('cusranki', "Custom-Rank-Icon")
                    },true, "Custom-Rank-Icon"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Emblem")}`,'cusemi','cusemibox',
                    ()=>{
                        restartAfterChange('cusemi',"Custom-Emblem")
                    },true, "Custom-Emblem"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Clash-banner")}`,'cusclassb','cusclassbbox',
                    ()=>{
                        restartAfterChange('cusclassb', "Custom-Clash-banner")
                    },true, "Custom-Clash-banner"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Trophy")}`,'custrophy','custrophybox',
                    ()=>{
                        restartAfterChange('custrophy', "Custom-Trophy")
                    },true, "Custom-Trophy"
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString('Custom-Gamemode-Icon')}`,'cusgameicon','cusgameiconbox',
                    ()=>{
                        restartAfterChange('cusgameicon', 'Custom-Gamemode-Icon')
                    },true, 'Custom-Gamemode-Icon'
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${await getString("Custom-Ticker")}`,'custick','custickbox',
                    ()=>{
                        restartAfterChange('custick', "Custom-Ticker")
                    },true, "Custom-Ticker"
                ),
                document.createElement('br')
            ]),
            UI.CheckBox(
                `${await getString("custom-runes-bg")}`,'rsbg','rsbgbox',
                ()=>{
                    restartAfterChange('rsbg', "Runes-BG")
                },true, "Runes-BG"
            ),
            document.createElement('br'),
            /*UI.CheckBox(
                `${await getString("custom-cursor")}`,'cuscursor','cuscursorbox',
                ()=>{},true, "Custom-Cursor"
            ),
            UI.Label(
                `*${await getString("note")}: ${await getString("note-2")}`
            ),
            document.createElement('br'),*/
            UI.CheckBox(
                `${await getString("hide-theme-usage-time")}`,'hideusetime','hideusetimebox',
                ()=>{},true,"hide-theme-usage-time"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-overview")}`,'hideovertab','hideovertabbox',
                ()=>{
                    applyHideAndShowtab(true)
                },true,"hide-overview"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-merch")}`,'hidemerchtab','hidemerchtabbox',
                ()=>{
                    applyHideAndShowtab(true)
                },true,"hide-merch"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-patch-note")}`,'hidepn','hidepnbox',
                ()=>{
                    applyHideAndShowtab(true)
                },true,"hide-patch-note"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-esport")}`,'hideesptab','hideesptabbox',
                ()=>{
                    applyHideAndShowtab(true)
                },true, "hide-esport"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-tft-match-history")}`,'hidetftmhtab','hidetftmhtabbox',
                ()=>{
                    applyHideAndShowTFTtab(true)
                },true, "hide-tft-match-history"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-tft-news")}`,'hidetftntab','hidetftntabbox',
                ()=>{
                    applyHideAndShowTFTtab(true)
                },true, "hide-tft-news"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-tft-rotational-shop")}`,'hidetftrstab','hidetftrstabbox',
                ()=>{
                    applyHideAndShowTFTtab(true)
                },true, "hide-tft-rotational-shop"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-tft-troves")}`,'hidetfttrovestab','hidetfttrovestabbox',
                ()=>{
                    applyHideAndShowTFTtab(true)
                },true, "hide-tft-troves"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-tft-battle-pass")}`,'hidetftbattletab','hidetftbattletabbox',
                ()=>{
                    applyHideAndShowTFTtab(true)
                }, true, "hide-tft-battle-pass"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("hide-tft-home")}`,'hidetfthometab','hidetfthometabbox',
                ()=>{
                    applyHideAndShowTFTtab(true)
                },true, "hide-tft-home"
            ),
            document.createElement('br'),
            document.createElement('br'),
            UI.CheckBox(
                `${await getString("NSFW-Content")}`,'nsfw','nsfwbox',
                ()=>{},true, "NSFW-Content"
            ),
            document.createElement('br'),
            document.createElement('br'),
            // UI.CheckBox(
            //     `${await getString("Change-CDN-version")}`,'cdnver','cdnverbox', ()=>{
            //         restartAfterChange('cdnver', "Change-CDN-version")
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
        restartAfterChange(id, datastore)
    },true, datastore
),
document.createElement('br'),
*/

export { themesSettings }