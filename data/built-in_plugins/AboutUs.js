let datapath = new URL("..", import.meta.url).href
let eConsole = "%c ElainaV3 "
let eCss = "color: #ffffff; background-color: #f77fbe"

import lang from "../configs/Language.js"

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

        img.setAttribute("src", `${datapath}assets/Icon/${image}`)
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

        img.setAttribute("src", `${datapath}assets/Icon/${image}`)
        img.classList.add("donate")

        link.target = '_blank'
        link.href = href
        link.onclick = onClick || null

        link.append(img)

        return link
    }
}

const injectSettings = (panel) => {
    const langCode = document.querySelector("html").lang;
    const langMap = lang.langlist
    const selectedLang = lang[langMap[langCode] || "EN"];
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
                UI.Label("Thanks for using Elaina-V3 :3","first_line"),
                UI.Label("If you love ElainaV3, you can support me by sharing this theme to your friend"),
                UI.Label("or donating me"),
                UI.Row("Donation-row",[
                    UI.ImageAndLink("ko-fi.webp","https://ko-fi.com/elainadacatto"),
                    UI.ImageAndLink("momo.svg", "https://me.momo.vn/elainadacatto"),
                ])
            ])
        ])
    )
}

window.addEventListener('load', async () => {
    const interval = setInterval(() => {
        const manager = document.getElementById('lol-uikit-layer-manager-wrapper')
        if (manager) {
            clearInterval(interval)
            new MutationObserver((mutations) => {
                const panel = document.querySelector('div.lol-settings-options > lol-uikit-scrollable.aboutus_settings')
                if (panel && mutations.some((record) => Array.from(record.addedNodes).includes(panel))) {
                    injectSettings(panel)
                }
            }).observe(manager, {
                childList: true,
                subtree: true
            })
        }
    },500)
})