let datapath = new URL("..", import.meta.url).href
let eConsole = "%c Elaina "
let eCss = "color: #ffffff; background-color: #f77fbe"

DataStore.set("settingsChangenumber", 0)

import ChampsP from "../Configs/ChampionsPrices.js"
import utils from '../Utilities/_utils'
import cdnVersion from "../Update/CDNversion-list.js"
import datastore_list from "../Configs/Datastore-default.js"
import { settingsUtils } from "https://unpkg.com/blank-settings-utils@latest/Settings-Utils.js"

let data = [
    {
        "groupName": 'elaina-v4',
        "titleKey": 'el_title',
        "titleName": 'Elaina theme',
        "capitalTitleKey": 'el_title_capital',
        "capitalTitleName": 'ELAINA THEME',
        "element": [
            {
                "name": "el-theme-settings",
                "title": "el_theme-settings",
                "titleName": "THEME SETTINGS",
                "class": "theme_settings",
                "id": "ElainaThemeSettings",
            },
            {
                "name": "el-plugins-settings",
                "title": "el_plugins-settings",
                "titleName": "PLUGINS SETTINGS",
                "class": "plugins_settings",
                "id": "ElainaPluginsSettings",
            },
            {
                "name": "el-backup-restore-settings",
                "title": "el_backup-restore-settings",
                "titleName": "BACKUP & RESTORE",
                "class": "backup_restore_settings",
                "id": "ElainaBackupRestoreSettings",
            },
            {
                "name": "el-aboutus-settings",
                "title": "el_aboutus-settings",
                "titleName": "ABOUT US",
                "class": "aboutus_settings",
                "id": "ElainaAboutUsSettings",
            },
        ],
    },
]

export function Settings(context) {
    settingsUtils(context, data)
}

function writeBackupData() {
    let keys = Object.keys(datastore_list)
    let mirage = datastore_list
    keys.forEach(key => {
        mirage[key] = DataStore.get(key)
    })
    writeBackup(DataStore.get("Summoner-ID"), "datastore.json", JSON.stringify(mirage))
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

window.writeBackupData = writeBackupData

async function restartAfterChange(el, data) {
    let lastdata = document.getElementById(el).getAttribute("lastdatastore")
    if (lastdata == JSON.stringify(DataStore.get(data))) {
        DataStore.set("settingsChangenumber", DataStore.get("settingsChangenumber") + 1)
    }
    else {
        DataStore.set("settingsChangenumber", DataStore.get("settingsChangenumber") - 1)
    }

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
                writeBackupData()
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

const UI = {
    Row: (id, childs) => {
        const row = document.createElement('div')
        row.classList.add('lol-settings-general-row')
        row.id = id
        if (Array.isArray(childs)) childs.forEach((el) => row.appendChild(el))
        return row
    },
    Label: (text, id) => {
        const label = document.createElement('p')
        label.classList.add('lol-settings-window-size-text')
        label.innerText = text
        label.id = id
        return label
    },
    Image: (image, cls) => {
        const img = document.createElement('img')
        img.setAttribute("src", `${datapath}Assets/Icon/${image}`)
        img.classList.add(cls)
        return img
    },
    Link: (text, href, onClick, ID) => {
        const link = document.createElement('p')
        link.classList.add('lol-settings-code-of-conduct-link')
        link.classList.add('lol-settings-window-size-text')
    
        const a = document.createElement('a')
        a.innerText = text
        a.target = '_blank'
        a.href = href
        a.onclick = onClick || null
        a.download
        a.id = ID || null
    
        link.append(a)
        return link
    },
    Button: (text, cls, onClk) => {
        const btn = document.createElement('lol-uikit-flat-button-secondary')
        btn.innerText = text
        btn.onclick = onClk
        btn.style.display = 'flex'
        btn.setAttribute('class', cls)
        return btn
    },
    Input: (target) => {
        const origin = document.createElement('lol-uikit-flat-input')
        const searchbox = document.createElement('input')
    
        origin.classList.add(target)
        origin.style.marginBottom = '12px'
    
        searchbox.type = 'url'
        searchbox.placeholder = DataStore.get(target)
        searchbox.style.width = '190px'
        searchbox.name = 'name'
        searchbox.oninput = ()=>{
            let input = {
                get value() {
                    return searchbox.value
                },
            }
            DataStore.set(target, input.value)
        }
        origin.appendChild(searchbox)
        return origin
    },
    SpeedInput: (target) => {
        const origin = document.createElement('lol-uikit-flat-input')
        const searchbox = document.createElement('input')
    
        origin.classList.add(target)
        origin.style.marginBottom = '12px'
    
        searchbox.type = 'url'
        searchbox.placeholder = DataStore.get(target)
        searchbox.style.width = '75px'
        searchbox.style.textAlign = "end"
        searchbox.name = 'name'
        searchbox.oninput = async ()=>{
            let input = {
                get value() {
                    return searchbox.value
                },
            }

            if (input.value >= 6.25 && input.value <= 300) {
                DataStore.set(target, input.value)
                document.getElementById("speed-check").textContent = ""
                document.getElementById("speed-check").style.color = ""
            }
            else {
                document.getElementById("speed-check").textContent = await getString("speed-check-deny")
                document.getElementById("speed-check").style.color = "red"
            }

            document.getElementById('elaina-bg').playbackRate = DataStore.get("Playback-speed")/100
        }
        origin.appendChild(searchbox)
        return origin
    },
    CheckBox: (text, ID, boxID, check, show, datastore_name) => {
        const container = document.createElement("div")
        const origin = document.createElement("lol-uikit-flat-checkbox")
        const checkbox = document.createElement("input")
        const label = document.createElement("label")
        const none = document.createElement("div")

        origin.setAttribute("class",'')
        origin.id = ID
        origin.setAttribute("lastDatastore", DataStore.get(datastore_name))
    
        checkbox.type = "checkbox"
        checkbox.id = boxID
        checkbox.onclick = check
        checkbox.setAttribute("slot", "input")
    
        label.innerHTML = text
        label.setAttribute("slot", "label")
    
        if (show) {
            container.appendChild(origin)
            origin.appendChild(checkbox)
            origin.appendChild(label)
    
            return container
        }
        else {
            container.appendChild(none)
            return container
        }
    },
    Slider: (text, value, target, setValue) => {
        const div        = document.createElement("div")
        const title      = document.createElement("div")
        const row        = document.createElement('div')
        const origin     = document.createElement("lol-uikit-slider")
        const slider     = document.createElement("div")
        const sliderbase = document.createElement("div")
    
        let audio = document.getElementById(`${target}`)
    
        row.setAttribute("class", "lol-settings-sound-row-slider")
        title.setAttribute("class", "lol-settings-sound-title")
    
        origin.setAttribute("class", "lol-settings-slider")
        origin.setAttribute("value", `${value}`* 100)
        origin.setAttribute("percentage", "")
        origin.addEventListener("change", ()=>{
            audio.volume = origin.value / 100;
            DataStore.set(`${setValue}`, origin.value / 100)
            title.innerHTML = `${text}: ${origin.value}`
        })
    
        title.innerHTML = `${text}: ${value * 100}`
    
        slider.setAttribute("class", "lol-uikit-slider-wrapper horizontal")
        sliderbase.setAttribute("class", "lol-uikit-slider-base")
    
        div.appendChild(title)
        div.appendChild(row)
        row.appendChild(origin)
        origin.appendChild(slider)
        slider.appendChild(sliderbase)
    
        return div
    },
    Dropdown: (list,target,text,name,id) => {
        const origin = document.createElement("div")
        const title  = document.createElement("div")
        const dropdown = document.createElement("lol-uikit-framed-dropdown")
    
        origin.classList.add("Dropdown-div")
        title.classList.add("lol-settings-window-size-text")
        title.innerHTML = text
        dropdown.classList.add("lol-settings-general-dropdown")
        origin.append(title,dropdown)
        for (let i = 0; i < list[target].length; i++) {
            const opt = list[target][i]
            const el = document.createElement("lol-uikit-dropdown-option")
            el.setAttribute("slot", "lol-uikit-dropdown-option")
            el.innerText = opt[name]
            el.id = opt[id]
            el.onclick = () => {
                DataStore.set(target, opt[id])
            }
            if (DataStore.get(target) == opt[id]) {
                el.setAttribute("selected", "true")
            }
            dropdown.appendChild(el)
        }
        return origin
    },
    DropdownCustomFont: () => {
        const origin = document.createElement("div")
        const dropdown = document.createElement("lol-uikit-framed-dropdown")
    
        origin.classList.add("Dropdown-div")
        dropdown.classList.add("lol-settings-general-dropdown")
        origin.append(dropdown)
        for (let i = 0; i < DataStore.get("Font-list").length; i++) {
            const opt = DataStore.get("Font-list")[i]
            const el = document.createElement("lol-uikit-dropdown-option")
            el.setAttribute("slot", "lol-uikit-dropdown-option")
            el.innerText = opt
            el.onclick = () => {
                DataStore.set("CurrentFont", opt)
                try {
                    document.querySelector("#Custom-font").remove()
                    utils.addFont(DataStore.get("Font-folder")+DataStore.get("CurrentFont"),"Custom-font","Custom")
                }catch{}
            }
            if (DataStore.get("CurrentFont") == opt) {
                el.setAttribute("selected", "true")
            }
            dropdown.appendChild(el)
        }
        return origin
    },
    DropdownCustomBanner: () => {
        const origin = document.createElement("div")
        const dropdown = document.createElement("lol-uikit-framed-dropdown")
        
        origin.classList.add("Dropdown-div")
        dropdown.classList.add("lol-settings-general-dropdown")
        origin.append(dropdown)
        for (let i = 0; i < DataStore.get("Banner-list").length; i++) {
            const opt = DataStore.get("Banner-list")[i]
            const el = document.createElement("lol-uikit-dropdown-option")
            el.setAttribute("slot", "lol-uikit-dropdown-option")
            el.innerText = opt
            el.onclick = () => {
                DataStore.set("CurrentBanner", opt)
            }
            if (DataStore.get("CurrentBanner") == opt) {
                el.setAttribute("selected", "true")
            }
            dropdown.appendChild(el)
        }
        return origin
    },
    DropdownCDNversion: () => {
        const origin = document.createElement("div")
        const dropdown = document.createElement("lol-uikit-framed-dropdown")
    
        origin.classList.add("Dropdown-div")
        dropdown.classList.add("lol-settings-general-dropdown")
        origin.append(dropdown)
        for (let i = 0; i < cdnVersion.length; i++) {
            const opt = cdnVersion[i]
            const el = document.createElement("lol-uikit-dropdown-option")
            el.setAttribute("slot", "lol-uikit-dropdown-option")
            el.innerText = opt
            el.onclick = () => {
                DataStore.set("Cdn-version", opt)
            }
            if (DataStore.get("Cdn-version") == opt) {
                el.setAttribute("selected", "true")
            }
            dropdown.appendChild(el)
        }
        return origin
    },
    Contributor: (image,C_name,info) => {
        const origin = document.createElement("div")
        const div = document.createElement("div")
        const img = document.createElement('img')
        const Name = document.createElement("p")
        const Info = document.createElement("p")

        origin.append(img)
        origin.append(div)
        div.append(Name)
        div.append(Info)

        origin.id = "Contrib"

        div.style = "margin-left: 10px;"

        img.setAttribute("src", `${datapath}Assets/Icon/${image}`)
        img.classList.add("contributor-img")

        Name.innerText = C_name
        Name.classList.add('lol-settings-window-size-text')
        Name.id = "contributor-name"

        Info.classList.add('lol-settings-window-size-text')
        Info.innerText = info
        Info.style = "margin: 0px"

        return origin
    },
    ImageAndLink: (image, href, onClick) => {
        const link = document.createElement('a')
        const img = document.createElement('img')

        img.setAttribute("src", `${datapath}Assets/Icon/${image}`)
        img.classList.add("donate")

        link.target = '_blank'
        link.href = href
        link.onclick = onClick || null

        link.append(img)

        return link
    },
    fileInput: (Id, acceptFile, onChange) => {
        const input = document.createElement("input")
        input.type = "file"
        input.accept = acceptFile
        input.id = Id
        input.onchange = onChange
        input.style.display = "none"

        return input
    }
}




















const themesSettings = async (panel) => {
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
            document.createElement('br'),
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
                `${await getString("Custom-Navbar-Css")}`,'cusnavcss','cusnavcssbox', ()=>{
                    restartAfterChange("cusnavcss","Custom-Navbar-Css")
                    let el = document.getElementById("cusnavcss")
                    let box = document.getElementById("cusnavcssbox")
            
                    if (DataStore.get("Custom-Navbar-Css")) {
                        el.removeAttribute("class")
                        box.checked = false
                        DataStore.set("Custom-Navbar-Css", false)
                    }
                    else {
                        el.setAttribute("class", "checked")
                        box.checked = true
                        DataStore.set("Custom-Navbar-Css", true)
                    }
                },true, "Custom-Navbar-Css"
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
                    restartAfterChange("sbt", "Sidebar-Transparent")
                    if (DataStore.get("Sidebar-Transparent")) {
                    sbtbox.checked = false
                    DataStore.set("Sidebar-Transparent", false)
                    sbtel.removeAttribute("class")
                    }
                    else {
                    sbtbox.checked = true
                    DataStore.set("Sidebar-Transparent", true)
                    sbtel.setAttribute("class", "checked")
                    }
                },true, "Sidebar-Transparent"
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
                    restartAfterChange('hidechampart', "Hide-Champions-Splash-Art")
                    let hidechampartel = document.getElementById("hidechampart")
                    let hidechampartbox = document.getElementById("hidechampartbox")
    
                    if (DataStore.get("Hide-Champions-Splash-Art")) {
                    hidechampartbox.checked = false
                    DataStore.set("Hide-Champions-Splash-Art", false)
                    hidechampartel.removeAttribute("class")
                    }
                    else {
                    hidechampartbox.checked = true
                    DataStore.set("Hide-Champions-Splash-Art", true)
                    hidechampartel.setAttribute("class", "checked")
                    }
                },true, "Hide-Champions-Splash-Art"
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
                `${await getString("animate-loading")}`,'aniload','aniloadbox',
                ()=>{
                    let aniloadel = document.getElementById("aniload")
                    let aniloadbox = document.getElementById("aniloadbox")
    
                    if (DataStore.get("Animate-Loading")) {
                    aniloadbox.checked = false
                    DataStore.set("Animate-Loading", false)
                    aniloadel.removeAttribute("class")
                    }
                    else {
                    aniloadbox.checked = true
                    DataStore.set("Animate-Loading", true)
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
            UI.CheckBox(
                `${await getString("Change-CDN-version")}`,'cdnver','cdnverbox', ()=>{
                    let cdnverel = document.getElementById("cdnver")
                    let cdnverbox = document.getElementById("cdnverbox")
                    restartAfterChange('cdnver', "Change-CDN-version")
                
                    if (DataStore.get("Change-CDN-version")) {
                        cdnverel.removeAttribute("class")
                        cdnverbox.checked = false
                        DataStore.set("Change-CDN-version", false)
                    }
                    else {
                        cdnverel.setAttribute("class", "checked")
                        cdnverbox.checked = true
                        DataStore.set("Change-CDN-version", true)
                    }
                },DataStore.get("Dev-button"),"Change-CDN-version"
            ),
            document.createElement('br'),
            UI.DropdownCDNversion(),
            document.createElement('br'),
        ])
    )
}




















const pluginsSettings = async (panel) => {
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
                UI.Image("Logo.png", "plugins-settings-logo")
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
            /*UI.Row("pandoru",[
                UI.CheckBox(
                    `${await getString("Santa")}`,'MC','MCbox',
                    ()=>{
                    let MCel = document.getElementById("MC")
                    let MCbox = document.getElementById("MCbox")
        
                    if (DataStore.get("Merry-Christmas")) {
                        MCbox.checked = false
                        DataStore.set("Merry-Christmas", false)
                        MCel.removeAttribute("class")
                    }
                    else {
                        MCbox.checked = true
                        DataStore.set("Merry-Christmas", true)
                        MCel.setAttribute("class", "checked")
                    }
                    },true
                )
            ]),*/
            UI.Row("buyallchamp",[
                UI.CheckBox(
                    `${await getString("buy-all-champs")}`,'byc','bycbox',
                    ()=>{
                    let bycel = document.getElementById("byc")
                    let bycbox = document.getElementById("bycbox")
    
                    if (DataStore.get("buy-all-champs")) {
                        bycbox.checked = false
                        DataStore.set("buy-all-champs", false)
                        bycel.removeAttribute("class")
                    }
                    else {
                        bycbox.checked = true
                        DataStore.set("buy-all-champs", true)
                        bycel.setAttribute("class", "checked")
                    }
                    },true
                ),
                document.createElement('br'),
                UI.Dropdown(ChampsP, "ChampsPrice", `${await getString("prices")}`, "description", "Cost"),
                document.createElement('br')
            ]),
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




















const backuprestoretab = async (panel) => {
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
                    } else {
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
                        writeBackupData()
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




















const aboutustab = (panel) => {
    panel.prepend(
        UI.Row("",[
            UI.Row("Developer",[
                UI.Row("dev-avatar",[
                    UI.Row("dev-div",[
                        UI.Image("About-Us/ElainaDaCatto.png", "dev_ava"),
                        UI.Label("Elaina Da Catto", "first_line_p"),
                        UI.Label("Main Developer")
                    ]),
                    UI.Row("dev-div",[
                        UI.Image("About-Us/Lyfhael.webp", "dev_ava"),
                        UI.Label("Lyfhael", "first_line_b"),
                        UI.Label("Co-Founder")
                    ]),
                ]),
            ]),
            UI.Label("Contributors:","contributors"),
            UI.Row("Contributors-row",[
                UI.Contributor("About-Us/Nomi.png","Nomi-san","Support, Plugins provider"),
                UI.Contributor("About-Us/BakaFT.png","BakaFT","Support, Translator"),
            ]),
            UI.Row("Contributors-row",[
                UI.Contributor("About-Us/Sarah.png","Sarah Engel","Support, Plugins provider"),
                UI.Contributor("About-Us/Soulmare.png","Soulmare","Support, Translator"),
            ]),
            UI.Row("Contributors-row",[
                UI.Contributor("About-Us/balaclava.png","Balaclava","Plugins provider"),
                UI.Contributor("About-Us/DmitryFisk.png","DmitryFisk","Plugins provider"),
            ]),
            UI.Row("Contributors-row",[
                UI.Contributor("About-Us/Legnatbird.png","Legnatbird","Support, Translator"),
                UI.Contributor("About-Us/Flirip.png","Flirip","Translator"),
            ]),
            UI.Row("Donation-row",[
                UI.Contributor("About-Us/unproductive.webp","unproductive","Support, Plugins provider"),
                UI.Contributor("About-Us/Rumi.webp","Rumi","Support"),
            ]),
            /*
            UI.Row("Contributors-row",[
                UI.Contributor("About-Us/","",""),
                UI.Contributor("About-Us/","",""),
            ]),
            */
            document.createElement("br"),
            UI.Row("Donation",[
                UI.Label("Thanks for using Elaina theme :3","first_line"),
                UI.Label("If you love Elaina theme, you can support me by sharing this theme to your friend"),
                UI.Label("or donating me"),
                UI.Row("Donation-row",[
                    //UI.ImageAndLink("ko-fi.webp","https://ko-fi.com/elainadacatto"),
                    UI.ImageAndLink("paypal.png","https://www.paypal.com/paypalme/ElainaDaCattoRiel"),
                    UI.ImageAndLink("momo.svg", "https://me.momo.vn/elainadacatto"),
                ])
            ])
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
    
window.addEventListener('load', async () => {
    function DeleteEl (target, confirm) {
        try {
            let origin = document.querySelector(target)
            if (confirm) {origin.remove()}
        }
        catch{}
    }
    function tickcheck (Data, el, checkbox) {
        try {
            let element = document.getElementById(el)
            let box = document.getElementById(checkbox)
            if (Data && element.getAttribute("class") == "") {
                box.checked = true
            }
        }
        catch{ console.error(eConsole+`%c Can't find target's class`,eCss,"") }
    }
    const interval = setInterval(() => {
        const manager = document.getElementById('lol-uikit-layer-manager-wrapper')
        if (manager) {
            clearInterval(interval)
            new MutationObserver((mutations) => {
                const plugin = document.querySelector('div.lol-settings-options > lol-uikit-scrollable.plugins_settings')
                const theme = document.querySelector('div.lol-settings-options > lol-uikit-scrollable.theme_settings')
                const aboutus = document.querySelector('div.lol-settings-options > lol-uikit-scrollable.aboutus_settings')
                const backupandrestore = document.querySelector('div.lol-settings-options > lol-uikit-scrollable.backup_restore_settings')

                if (theme && mutations.some((record) => Array.from(record.addedNodes).includes(theme))) {
                    themesSettings(theme)
                    let check = setInterval (()=>{
                        if (document.getElementById("Info")) {
                            clearInterval(check)
                            //tickcheck(DataStore.get(""), el, box)
                            tickcheck(DataStore.get("Custom-Navbar-Css"), "cusnavcss", "cusnavcssbox")
                            tickcheck(DataStore.get("backup-datastore"), "bakdata", "bakdatabox")
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
                            tickcheck(DataStore.get("Animate-Loading"), "aniload","aniloadbox")
                            tickcheck(DataStore.get("Custom-Avatar"), "cusav", "cusavbox")
                            tickcheck(DataStore.get("Custom-Icon"), "cusicon", "cusiconbox")
                            tickcheck(DataStore.get("settings-dialogs-transparent"), "stdiat", "stdiatbox")
                            tickcheck(DataStore.get("old-prev/next-button"), "oldpnb", "oldpnbbox")
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
                                        console.log(eConsole+"%c Developer mode button has appeared !",eCss,"")
                                    }
                                    else if (DataStore.get("Active-dev-button") > 20) {
                                        DataStore.set("Dev-button", true)
                                        console.log(eConsole+"%c You already become developer !",eCss,"")
                                    }
                                })
                            }
                            catch{}
                            if (DataStore.get("Dev-button")) {
                                tickcheck(DataStore.get("Dev-mode"), "devbutton", "devbuttonbox")
                            }
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
                            tickcheck(DataStore.get("buy-all-champs"), "byc", "bycbox")
                            tickcheck(DataStore.get("Custom-rank"), "cusrankhover", "cusrankhoverbox")
                            tickcheck(DataStore.get("auto_accept_button"), "autoacceptbutton", "autoacceptbuttonbox")
                        }
                    },100)
                }
                else if (backupandrestore && mutations.some((record) => Array.from(record.addedNodes).includes(backupandrestore))) {
                    backuprestoretab(backupandrestore)
                    let check = setInterval (()=>{
                        if (document.getElementById("bakdata")) {
                            clearInterval(check)
                            //tickcheck(DataStore.get(""), el, box)
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