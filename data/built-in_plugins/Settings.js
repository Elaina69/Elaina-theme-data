let datapath = new URL("..", import.meta.url).href
let eConsole = "%c ElainaV3 "
let eCss = "color: #ffffff; background-color: #f77fbe"

import ChampsP from "../configs/ChampionsPrices.js"
import lang from "../configs/Language.js"
import utils from "../_utils.js"


export function Settings(context) {
    function newSettingsTab(className) {
        let tab = {
            "statements":[
                ["open-element","lol-uikit-scrollable",[]],
                ["static-attr","class",className],
                ["flush-element"],
                    ["close-element"]
            ],
            "locals":[],
            "named":[],
            "yields":[],
            "blocks":[],
            "hasPartials":false
        }
        return tab
    }

    const themeTab = newSettingsTab("theme_settings")
    const pluginsTab = newSettingsTab("plugins_settings")
    const about = newSettingsTab("aboutus_settings")

    context.rcp.postInit('rcp-fe-lol-settings', async (api) => {
        window.__RCP_SETTINGS_API = api

        let ember_api = window.__RCP_EMBER_API
        let ember = await ember_api.getEmber()

        let newGroup = {
            name: 'elaina-v3',
            titleKey: 'el_title',
            capitalTitleKey: 'el_title_capital',
            categories:[]
        }

        let newGroupPush = (Name, Title) => {
            newGroup.categories.push({
                name: Name,
                titleKey: Title,
                routeName: Name,
                group: newGroup,
                loginStatus: true,
                requireLogin: false,
                forceDisabled: false,
                computeds: ember.Object.create({
                    disabled: false
                }),
                isEnabled: () => true,
            })
        }

        newGroupPush('el-theme-settings','el_theme-settings')
        newGroupPush('el-plugins-settings','el_plugins-settings')
        newGroupPush('el-aboutus-settings','el_aboutus-settings')

        api._modalManager._registeredCategoryGroups.splice(1, 0, newGroup)
        api._modalManager._refreshCategoryGroups()
    })

    context.rcp.postInit('rcp-fe-ember-libs', async (api) => {
        window.__RCP_EMBER_API = api

        let ember = await api.getEmber()

        let originalExtend = ember.Router.extend
        ember.Router.extend = function() {
            let result = originalExtend.apply(this, arguments)

            result.map(function() {
                this.route('el-theme-settings')
                this.route('el-plugins-settings')
                this.route('el-aboutus-settings')
            })

            return result
        }
    },

    context.rcp.postInit('rcp-fe-lol-l10n', async (api) => {
        let tra = api.tra()

        let originalGet = tra.__proto__.get
        tra.__proto__.get = function(key) {
            if (key.startsWith('el_')) {
                switch (key) {
                    case 'el_title': return 'Elaina-V3'
                    case 'el_title_capital': return 'ELAINA-V3'
                    case 'el_theme-settings': return 'THEME SETTINGS'
                    case 'el_plugins-settings': return 'PLUGINS SETTINGS'
                    case 'el_aboutus-settings': return 'ABOUT US'
                    default: break;
                }
            }

            return originalGet.apply(this, [key]);
        }
    }),

    context.rcp.postInit('rcp-fe-ember-libs', async (api) => {
        window.__RCP_EMBER_API = api

        let ember = await api.getEmber()

        let originalExtend = ember.Router.extend
        ember.Router.extend = function() {
            let result = originalExtend.apply(this, arguments)
            result.map(function() {
                this.route('el-theme-settings')
                this.route('el-plugins-settings')
                this.route('el-aboutus-settings')
            })

            return result
        }

        let factory = await api.getEmberApplicationFactory()

        let originalBuilder = factory.factoryDefinitionBuilder
        factory.factoryDefinitionBuilder = function() {
            let builder = originalBuilder.apply(this, arguments)
            let originalBuild = builder.build
            builder.build = function() {
                let name = this.getName()
                if (name == 'rcp-fe-lol-settings') {
                    window.__SETTINGS_OBJECT = this

                    let addTab = (Name,Id,Tab) => {
                        this.addTemplate(Name, ember.HTMLBars.template({
                            id: Id,
                            block: JSON.stringify(Tab),
                            meta: {}
                        }))
                    }

                    addTab('el-theme-settings',"ElainaThemeSettings",themeTab)
                    addTab('el-plugins-settings',"ElainaPluginsSettings",pluginsTab)
                    addTab('el-aboutus-settings',"ElainaAboutUsSettings",about)
                }
                
                return originalBuild.apply(this, arguments)
            }
            return builder
        }
    }))
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
        img.setAttribute("src", `${datapath}assets/Icon/${image}`)
        img.classList.add(cls)
        return img
    },
    Link: (text, href, onClick) => {
        const link = document.createElement('p')
        link.classList.add('lol-settings-code-of-conduct-link')
        link.classList.add('lol-settings-window-size-text')
    
        const a = document.createElement('a')
        a.innerText = text
        a.target = '_blank'
        a.href = href
        a.onclick = onClick || null
    
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
    CheckBox: (text, ID, boxID, check, confirm) => {
        const container = document.createElement("div")
        const origin = document.createElement("lol-uikit-flat-checkbox")
        const checkbox = document.createElement("input")
        const label = document.createElement("label")
        const none = document.createElement("div")

        origin.setAttribute("class",'')
        origin.id = ID
    
        checkbox.type = "checkbox"
        checkbox.id = boxID
        checkbox.onclick = check
        checkbox.setAttribute("slot", "input")
    
        label.innerHTML = text
        label.setAttribute("slot", "label")
    
        if (confirm) {
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
                if (DataStore.get("Custom-Font")) {
                    DataStore.set("CurrentFont", opt)
                    document.querySelector("#Custom-font").remove()
                    utils.addFont(DataStore.get("Font-folder")+DataStore.get("CurrentFont"),"Custom-font","Custom")
                }
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
}

const themesSettings = (panel) => {
    const langCode = document.querySelector("html").lang;
    const langMap = lang.langlist
    const selectedLang = lang[langMap[langCode] || "EN"];
    panel.prepend(
        UI.Row("",[
            UI.Row("Info",[
                UI.Row("Info-div",[
                    UI.Link(
                        'ElainaV3',
                        'https://github.com/Elaina69/Elaina-V3'
                    ),
                    UI.Label(
                        `*${selectedLang["note"]}: ${selectedLang["note-1"]}`
                    ),
                    UI.Button (`${selectedLang["reload-client"]}`,'reload', ()=>{window.restartClient()}),
                ]),
                UI.Image("Logo.png", "theme-settings-logo")
            ]),
            UI.Slider(
                selectedLang["wallpaper-volume"],DataStore.get("wallpaper-volume"),"elaina-bg","wallpaper-volume"
            ),
            UI.Slider(
                selectedLang["music-volume"],DataStore.get("audio-volume"),"bg-audio","audio-volume"
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["prevent-manual-update"]}`,'prvtup','prvtupbox',
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
            UI.CheckBox(
                `${selectedLang["old-prev/next-button"]}`,"oldpnb","oldpnbbox",
                ()=>{
                    let oldpnbel = document.getElementById("oldpnb")
                    let oldpnbbox = document.getElementById("oldpnbbox")
    
                    if (DataStore.get("old-prev/next-button")) {
                    oldpnbbox.checked = false
                    DataStore.set("old-prev/next-button", false)
                    oldpnbel.removeAttribute("class")
                    }
                    else {
                    oldpnbbox.checked = true
                    DataStore.set("old-prev/next-button", true)
                    oldpnbel.setAttribute("class", "checked")
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["sidebar-transparent"]}`,'sbt','sbtbox',
                ()=>{
                    let sbtel = document.getElementById("sbt")
                    let sbtbox = document.getElementById("sbtbox")
    
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
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["settings-dialogs-transparent"]}`,'stdiat','stdiatbox',
                ()=>{
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
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["hide-champions-splash-art"]}`,'hidechampart','hidechampartbox',
                ()=>{
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
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["hide-vertical-lines"]}`,"hidevl","hidevlbox",
                ()=>{
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
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["custom-font"]}`,'cusfont','cusfontbox',
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
                        `${selectedLang["custom-rp"]}`,'cusrp','cusrpbox',
                        ()=>{
                            let cusrpel = document.getElementById("cusrp")
                            let cusrpbox = document.getElementById("cusrpbox")
            
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
                        },true
                    ),
                    document.createElement('br'),
                    UI.Input("RP-data")
                ]),
                UI.Row("custom-be",[
                    UI.CheckBox(
                        `${selectedLang["custom-be"]}`,'cusbe','cusbebox',
                        ()=>{
                            let cusbeel = document.getElementById("cusbe")
                            let cusbebox = document.getElementById("cusbebox")
            
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
                        },true
                    ),
                    document.createElement('br'),
                    UI.Input("BE")
                ])
            ]),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["custom-rank-name"]}`,'cusrankname','cusranknamebox',
                ()=>{
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
                },true
            ),
            document.createElement('br'),
            UI.Input("Rank-line1"),
            UI.Input("Rank-line2"),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["animate-loading"]}`,'aniload','aniloadbox',
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
                `${selectedLang["custom-icon"]}`,'cusicon','cusiconbox',
                ()=>{
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
                },true
            ),
            document.createElement('br'),
            UI.Row("Custom-icon-list",[
                UI.CheckBox(
                    `${selectedLang["custom-avatar"]}`,'cusav','cusavbox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-Border"]}`,'cusbor','cusborbox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-Regalia-Banner"]}`,'cusregabnr','cusregabnrbox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.DropdownCustomBanner(),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-Hover-card-backdrop"]}`,'cushvbdrop','cushvbdropbox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-RP-Icon"]}`,'cusrpi','cusrpibox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-BE-Icon"]}`,'cusbei','cusbeibox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-Rank-Icon"]}`,'cusranki','cusrankibox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-Emblem"]}`,'cusemi','cusemibox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-Clash-banner"]}`,'cusclassb','cusclassbbox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-Trophy"]}`,'custrophy','custrophybox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang['Custom-Gamemode-Icon']}`,'cusgameicon','cusgameiconbox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-Ticker"]}`,'custick','custickbox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br')
            ]),
            UI.CheckBox(
                `${selectedLang["custom-runes-bg"]}`,'rsbg','rsbgbox',
                ()=>{
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
                },true
            ),
            document.createElement('br'),
            /*UI.CheckBox(
                `${selectedLang["custom-cursor"]}`,'cuscursor','cuscursorbox',
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
                `*${selectedLang["note"]}: ${selectedLang["note-2"]}`
            ),
            document.createElement('br'),*/
            UI.CheckBox(
                `${selectedLang["hide-theme-usage-time"]}`,'hideusetime','hideusetimebox',
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
                `${selectedLang["hide-overview"]}`,'hideovertab','hideovertabbox',
                ()=>{
                    let hideovertabel = document.getElementById("hideovertab")
                    let hideovertabbox = document.getElementById("hideovertabbox")
    
                    if (DataStore.get("hide-overview")) {
                    hideovertabbox.checked = false
                    DataStore.set("hide-overview", false)
                    hideovertabel.removeAttribute("class")
                    }
                    else {
                    hideovertabbox.checked = true
                    DataStore.set("hide-overview", true)
                    hideovertabel.setAttribute("class", "checked")
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["hide-merch"]}`,'hidemerchtab','hidemerchtabbox',
                ()=>{
                    let hidemerchtabel = document.getElementById("hidemerchtab")
                    let hidemerchtabbox = document.getElementById("hidemerchtabbox")
    
                    if (DataStore.get("hide-merch")) {
                    hidemerchtabbox.checked = false
                    DataStore.set("hide-merch", false)
                    hidemerchtabel.removeAttribute("class")
                    }
                    else {
                    hidemerchtabbox.checked = true
                    DataStore.set("hide-merch", true)
                    hidemerchtabel.setAttribute("class", "checked")
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["hide-patch-note"]}`,'hidepn','hidepnbox',
                ()=>{
                    let hidepnel = document.getElementById("hidepn")
                    let hidepnbox = document.getElementById("hidepnbox")
    
                    if (DataStore.get("hide-patch-note")) {
                    hidepnbox.checked = false
                    DataStore.set("hide-patch-note", false)
                    hidepnel.removeAttribute("class")
                    }
                    else {
                    hidepnbox.checked = true
                    DataStore.set("hide-patch-note", true)
                    hidepnel.setAttribute("class", "checked")
                    }
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["hide-esport"]}`,'hideesptab','hideesptabbox',
                ()=>{
                    let hideesptabel = document.getElementById("hideesptab")
                    let hideesptabbox = document.getElementById("hideesptabbox")
    
                    if (DataStore.get("hide-esport")) {
                    hideesptabbox.checked = false
                    DataStore.set("hide-esport", false)
                    hideesptabel.removeAttribute("class")
                    }
                    else {
                    hideesptabbox.checked = true
                    DataStore.set("hide-esport", true)
                    hideesptabel.setAttribute("class", "checked")
                    }
                },true
            ),
            document.createElement('br'),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["NSFW-Content"]}`,'nsfw','nsfwbox',
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
        ])
    )
}
const pluginsSettings = (panel) => {
    const langCode = document.querySelector("html").lang;
    const langMap = lang.langlist
    const selectedLang = lang[langMap[langCode] || "EN"];
    const rank = {
        "Ranked Queue ID": [
            {"id" : 0, "name": `${selectedLang["Ranked Solo 5vs5"]}`},
            {"id" : 1, "name": `${selectedLang["Ranked Flex Summoner's Rift"]}`},
            {"id" : 2, "name": `${selectedLang["Ranked Flex TT"]}`},
            {"id" : 3, "name": `${selectedLang["Ranked TFT"]}`},
            {"id" : 4, "name": `${selectedLang["Ranked TFT TURBO"]}`},
            {"id" : 5, "name": `${selectedLang["Ranked TFT DOUBLE UP"]}`}
        ],
    
        "Ranked Tier ID": [
            {"id" : 0, "name": `${selectedLang["Iron"]}`},
            {"id" : 1, "name": `${selectedLang["Bronze"]}`},
            {"id" : 2, "name": `${selectedLang["Silver"]}`},
            {"id" : 3, "name": `${selectedLang["Gold"]}`},
            {"id" : 4, "name": `${selectedLang["Platinum"]}`},
            {"id" : 5, "name": `${selectedLang["Diamond"]}`},
            {"id" : 6, "name": `${selectedLang["Emerald"]}`},
            {"id" : 7, "name": `${selectedLang["Master"]}`},
            {"id" : 8, "name": `${selectedLang["Grand-Master"]}`},
            {"id" : 9, "name": `${selectedLang["Challenger"]}`}
        ],
    
        "Ranked Division ID": [
            {"id" : 0, "name": "I"},
            {"id" : 1, "name": "II"},
            {"id" : 2, "name": "III"},
            {"id" : 3, "name": "IV"}
        ]
    }
    const Challengerank = {
        "challengeCrystalLevel": [
            {"id" : 0, "name": `${selectedLang["Iron"]}`},
            {"id" : 1, "name": `${selectedLang["Bronze"]}`},
            {"id" : 2, "name": `${selectedLang["Silver"]}`},
            {"id" : 3, "name": `${selectedLang["Gold"]}`},
            {"id" : 4, "name": `${selectedLang["Platinum"]}`},
            {"id" : 5, "name": `${selectedLang["Diamond"]}`},
            {"id" : 6, "name": `${selectedLang["Emerald"]}`},
            {"id" : 7, "name": `${selectedLang["Master"]}`},
            {"id" : 8, "name": `${selectedLang["Grand-Master"]}`},
            {"id" : 9, "name": `${selectedLang["Challenger"]}`}
        ],
    }
    panel.prepend(
        UI.Row("",[
            UI.Row("Info",[
                UI.Row("Info-div",[
                    UI.Link(
                    'ElainaV3',
                    'https://github.com/Elaina69/Elaina-V3'
                    ),
                    UI.Label(
                    `*${selectedLang["note"]}: ${selectedLang["note-1"]}`
                    ),
                    UI.Button (`${selectedLang["reload-client"]}`,'reload', ()=>{window.restartClient()}),
                ]),
                UI.Image("Logo.png", "plugins-settings-logo")
            ]),
            UI.Label(
                `${selectedLang["plugins-settings"]}`
            ),
            UI.CheckBox(
                `${selectedLang["old-ll-settings"]}`,'oldll','oldllbox',
                ()=>{
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
                },true
            ),
            document.createElement('br'),
            UI.Row("loothelp",[
                UI.CheckBox(
                    `${selectedLang["loot-helper"]}`,'lh','lhbox',
                    ()=>{
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
                    },true
                )
            ]),
            UI.CheckBox(
                `${selectedLang["auto_accept_button"]}`,'autoacceptbutton','autoacceptbuttonbox',
                ()=>{
                    let autoacceptbuttonel = document.getElementById("autoacceptbutton")
                    let autoacceptbuttonbox = document.getElementById("autoacceptbuttonbox")
            
                    if (DataStore.get("auto_accept_button")) {
                    autoacceptbuttonel.removeAttribute("class")
                    autoacceptbuttonbox.checked = false
                    DataStore.set("auto_accept_button", false)
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
                `${selectedLang["Enable-Invite-Fr"]}`,'invfr','invfrbox',
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
                `${selectedLang["aram-only"]}`, "Aram only", "Aram only checkbox",
                () => {
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
                },true
            ),
            document.createElement('br'),
            UI.Row("j1_4",[
                UI.CheckBox(
                    `${selectedLang["1/4-joke"]}`,'_1_4','_1_4box',
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
                    },true
                )
            ]),
            /*UI.Row("pandoru",[
                UI.CheckBox(
                    `${selectedLang["Santa"]}`,'MC','MCbox',
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
                    `${selectedLang["buy-all-champs"]}`,'byc','bycbox',
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
                UI.Dropdown(ChampsP, "ChampsPrice", `${selectedLang["prices"]}`, "description", "Cost"),
                document.createElement('br')
            ]),
            UI.CheckBox(
                `${selectedLang["auto-find-queue"]}`,'autoq','autoqbox',
                ()=>{
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
                },true
            ),
            UI.Row("Q-Delay",[
                UI.Row("Create-Delay",[
                    UI.Label(`${selectedLang["Create-Delay"]}`, "Create-Delay-Text"),
                    UI.Input("Create-Delay"),
                ]),
                UI.Row("Find-Delay",[
                    UI.Label(`${selectedLang["Find-Delay"]}`, "Find-Delay-Text"),
                    UI.Input("Find-Delay")
                ])
            ]),
            UI.Dropdown(DataStore.get("queueList"), "Gamemode", `${selectedLang["Gamemode"]}`, "description", "queueId"),
            document.createElement('br'),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["Custom-profile-hover"]}`,'cusprf','cusprfbox',
                ()=>{
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
                },true
            ),
            document.createElement('br'),
            UI.Row("customprf", [
                UI.CheckBox(
                    `${selectedLang["Custom-mastery-score"]}`,'cusmastery','cusmasterybox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.Input("Mastery-Score"),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["custom-rank-hover"]}`,'cusrankhover','cusrankhoverbox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.Dropdown(rank, "Ranked Queue ID", `${selectedLang["Ranked Queue"]}`, "name", "id"),
                document.createElement('br'),
                UI.Dropdown(rank, "Ranked Tier ID", `${selectedLang["Ranked Tier"]}`, "name", "id"),
                document.createElement('br'),
                UI.Dropdown(rank, "Ranked Division ID", `${selectedLang["Ranked Division"]}`, "name", "id"),
                document.createElement('br'),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["Custom-challenge-crystal"]}`,'cuschalcry','cuschalcrybox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.Dropdown(Challengerank, "challengeCrystalLevel", `${selectedLang["challenge-rank"]}`, "name", "id"),
                UI.Label(`${selectedLang["challenge-point"]}`, "challenge-point-Text"),
                UI.Input("Challenge-Points"),
                document.createElement('br'),
                UI.CheckBox(
                    `${selectedLang["custom-status"]}`,'cussta','cusstabox',
                    ()=>{
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
                    },true
                ),
                UI.Label(`${selectedLang["status-delay"]}`),
                UI.Input("status-delay"),
            ]),
            UI.Row("namespoof",[
                UI.CheckBox(
                    `${selectedLang["name-spoofer"]}`,'namespf','namespfbox',
                    ()=>{
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
                    },true
                ),
                document.createElement('br'),
                UI.Input("Spoof-name"),
            ]),
            UI.CheckBox(
                `${selectedLang["Debug-mode"]}`,'debug','debugbox',
                ()=>{
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
                },true
            ),
            document.createElement('br'),
            UI.CheckBox(
                `${selectedLang["Developer-Mode"]}`,'devbutton','devbuttonbox', ()=>{
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
                },DataStore.get("Dev-button")
            ),
            document.createElement('br'),
        ])
    )
}
    
/*
UI.CheckBox(
    `${selectedLang[""]}`,'','box', ()=>{
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
        let element = document.getElementById(el)
        let box = document.getElementById(checkbox)
        if (Data && element.getAttribute("class") == "") {
            box.checked = true
        }
    }
    const interval = setInterval(() => {
        const manager = document.getElementById('lol-uikit-layer-manager-wrapper')
        if (manager) {
            clearInterval(interval)
            new MutationObserver((mutations) => {
                const panel = document.querySelector('div.lol-settings-options > lol-uikit-scrollable.plugins_settings')
                if (panel && mutations.some((record) => Array.from(record.addedNodes).includes(panel))) {
                    pluginsSettings(panel)
                    let check = setInterval (()=>{
                        if (document.getElementById("Info")) {
                            clearInterval(check)
                            try {
                                let origin = document.querySelector(".plugins-settings-logo")
                                origin.addEventListener("click", ()=> {
                                    DataStore.set(`${"Active-dev-button"}`, DataStore.get(`${"Active-dev-button"}`) + 1)
                                    if (DataStore.get(`${"Active-dev-button"}`) == 20) {
                                        DataStore.set(`${"Dev-button"}`, true)
                                        console.log(eConsole+"%c Developer mode button has appeared !",eCss,"")
                                    }
                                    else if (DataStore.get(`${"Active-dev-button"}`) > 20) {
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
            }).observe(manager, {
                childList: true,
                subtree: true
            })

            new MutationObserver((mutations) => {
                const panel = document.querySelector('div.lol-settings-options > lol-uikit-scrollable.theme_settings')
                if (panel && mutations.some((record) => Array.from(record.addedNodes).includes(panel))) {
                    themesSettings(panel)
                    let check = setInterval (()=>{
                        if (document.getElementById("Info")) {
                            clearInterval(check)
                            //tickcheck(DataStore.get(""), el, box)
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
                            tickcheck(DataStore.get("Hide-Champions-Splash-Art"), "hidechampart", "hidechampart")
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
            }).observe(manager, {
                childList: true,
                subtree: true
            })
        }
    },500)
})