import { datapath, utils, cdnVersion } from "../settings.js"

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
        img.setAttribute("src", `${datapath}assets/icon/${image}`)
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
    Contributor: (localImage, image,C_name,info) => {
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

        img.setAttribute("src", localImage? `${datapath}assets/icon/${image}` : image)
        img.classList.add("contributor-img")

        Name.innerText = C_name
        Name.classList.add('lol-settings-window-size-text')
        Name.id = "contributor-name"

        Info.classList.add('lol-settings-window-size-text')
        Info.innerText = info
        Info.style = "margin: 0px"

        return origin
    },
    ImageAndLink: (localImage, image, cls, href, onClick) => {
        const link = document.createElement('a')
        const img = document.createElement('img')

        img.setAttribute("src", localImage? `${datapath}assets/icon/${image}` : image)
        img.classList.add(cls)

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

export { UI }