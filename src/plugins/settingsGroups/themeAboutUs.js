import { UI } from "./settingsUI.js"

export function aboutustab(panel) {
    panel.prepend(
        UI.Row("",[
            UI.Row("Developer",[
                UI.Row("dev-avatar",[
                    UI.Row("dev-div",[
                        UI.ImageAndLink(false, "https://avatars.githubusercontent.com/u/29869255", "dev_ava", "https://github.com/Ku-Tadao"),
                        UI.Label("Kubi", "first_line_kubi"),
                        UI.Label("Optimizing theme")
                    ]),
                    UI.Row("dev-div",[
                        UI.ImageAndLink(true, "About-Us/ElainaDaCatto.png", "dev_ava", "https://github.com/Elaina69"),
                        UI.Label("Elaina Da Catto", "first_line_elaina"),
                        UI.Label("Main Developer")
                    ]),
                    UI.Row("dev-div",[
                        UI.ImageAndLink(false, "https://avatars.githubusercontent.com/u/43145883", "dev_ava", "https://github.com/Lyfhael"),
                        UI.Label("Lyfhael", "first_line_lyfhael"),
                        UI.Label("Co-Founder")
                    ]),
                ]),
            ]),
            UI.Label("Contributors:","contributors"),
            UI.Row("Contributors-row",[
                UI.Contributor(false, "https://avatars.githubusercontent.com/u/38210249","Nomi-san","Daubuoi"),
                UI.Contributor(false, "https://avatars.githubusercontent.com/u/8694498","BakaFT","Support, Translator"),
            ]),
            UI.Row("Contributors-row",[
                UI.Contributor(false, "https://avatars.githubusercontent.com/u/45071533","Sarah Engel","Support, Plugins provider"),
                UI.Contributor(true, "About-Us/Soulmare.png","Soulmare","Support, Translator"),
            ]),
            UI.Row("Contributors-row",[
                UI.Contributor(true, "About-Us/balaclava.png","Balaclava","Plugins provider"),
                UI.Contributor(true, "About-Us/DmitryFisk.png","DmitryFisk","Plugins provider"),
            ]),
            UI.Row("Contributors-row",[
                UI.Contributor(true, "About-Us/Legnatbird.png","Legnatbird","Support, Translator"),
                UI.Contributor(true, "About-Us/Flirip.png","Flirip","Translator"),
            ]),
            UI.Row("Donation-row",[
                UI.Contributor(true, "About-Us/unproductive.webp","unproductive","Support, Plugins provider"),
                UI.Contributor(false, "https://avatars.githubusercontent.com/u/59478113","Rumi","Support"),
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
                    UI.ImageAndLink(true, "paypal.png", "donate", "https://www.paypal.com/paypalme/ElainaDaCattoRiel"),
                    UI.ImageAndLink(true, "momo.svg", "donate","https://me.momo.vn/elainadacatto"),
                ])
            ])
        ])
    )
}