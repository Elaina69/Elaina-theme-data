import config from "../config/holiday.js"
import { log } from "../utils/themeLog.js";

const datapath = new URL("..", import.meta.url).href

class HolidayMessages {
    constructor() {
        if (!ElainaData.has("Day")) ElainaData.set("Day", "0/0")
        if (!ElainaData.has("Holiday-Shown-Images")) ElainaData.set("Holiday-Shown-Images", {})

        this.message = ""
        this.imageLink = ""
        this.filter = ""

        this._checkToday()
        this._checkChristmas()

        if (ElainaData.get("Holiday") && ElainaData.get("holiday-message")) {
            this.showMessage(false)
        }

        log(`${ElainaData.get("Day")}`)
    }

    _addData(date) {
        this.message = config[date]["Text"]

        const images = config[date]["Image"]
        let randomImage = ""

        if (images.length > 0) {
            let shownImages = ElainaData.has("Holiday-Shown-Images") ? ElainaData.get("Holiday-Shown-Images") : {}
            let shownForDate = shownImages[date] || []

            const unshownImages = images.filter(img => !shownForDate.includes(img))

            if (unshownImages.length > 0) {
                randomImage = unshownImages[Math.floor(Math.random() * unshownImages.length)]
            }
            else {
                log(`All images for ${date} have been shown. Resetting...`)
                shownForDate = []
                randomImage = images[Math.floor(Math.random() * images.length)]
            }

            shownForDate.push(randomImage)
            shownImages[date] = shownForDate
            ElainaData.set("Holiday-Shown-Images", shownImages)

            this.imageLink = `${datapath}assets/image/${randomImage}`
        } else {
            this.imageLink = ""
        }

        this.filter = config[date]["filters"]

        log(`${this.message}`)

        ElainaData.set("Day", date)
        ElainaData.set("Holiday", true)
    }

    _checkToday() {
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()
        const newdate = day + "/" + month

        if (ElainaData.has("Day") && newdate != ElainaData.get("Day")) {
            try {
                if (newdate == config[newdate]["Day"]) {
                    if (!config[newdate]["nsfw"]) {
                        this._addData(newdate)
                    }
                    else if (config[newdate]["nsfw"] && ElainaData.get("NSFW-Content")) {
                        this._addData(newdate)
                        log(`NSFW content!!`)
                    }
                }
                else {
                    log(`Today doesn't have event`)
                    ElainaData.set("Day", newdate)
                }
            }
            catch {
                log(`Today doesn't have event`)
                ElainaData.set("Day", newdate)
            }
        }
    }

    async _checkChristmas() {
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()
        const newdate = day + "/" + month

        if (newdate == "25/12" && ElainaData.get("Merry-Christmas")) {
            try {
                const response = await fetch(`${datapath}config/pandoru.txt`)
                if (!response.ok) throw new Error(`Failed to fetch the file: ${response.statusText}`)
                const pandoru = await response.text()
                console.log(pandoru)
            }
            catch (err) {
                console.error("Error:", err)
            }
        }
    }

    async _createLoaderMenu(root) {
        const close = await getString('l.close')
        const { Component, jsx, render } = await import('//esm.run/nano-jsx')
        const message = this.message
        const imageLink = this.imageLink
        const filter = this.filter

        class LoaderMenu extends Component {
            render() {
                return jsx/*html*/`
                    <div class="modal" style="position: absolute; inset: 0px; z-index: 8500;" id="Holiday">
                        <lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;"></lol-uikit-full-page-backdrop>
                        <div class="dialog-confirm" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;">
                            <lol-uikit-dialog-frame class="dialog-frame" orientation="bottom" close-button="false">
                                <div class="dialog-content">
                                    <lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-small" style="width: 500px;">
                                        <h5>Elaina_V4</h5>
                                        <hr class="heading-spacer" />
                                        <p class="Elaina-Update" style="text-align: center">${message}</p>
                                        <hr class="heading-spacer" />
                                        <hr class="heading-spacer" />
                                        <img src="${imageLink}" style="width: 410px; border: 0px; border-radius: 10px; filter: ${filter};">
                                    </lol-uikit-content-block>
                                </div>
                                <lol-uikit-flat-button-group type="dialog-frame">
                                    <lol-uikit-flat-button tabindex="1" onClick=${() => {document.getElementById("Holiday").hidden = true}}>${close}</lol-uikit-flat-button>
                                </lol-uikit-flat-button-group>
                            </lol-uikit-dialog-frame>
                        </div>
                    </div>
                `
            }
        }
        render(jsx`<${LoaderMenu} />`, root)
    }

    showMessage = (force) => {
        if (force) this._addData(ElainaData.get("Day"))

        window.addEventListener("load", async () => {
            const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper')
            const root = document.createElement('div')
            while (!manager()) await new Promise(r => setTimeout(r, 200))
            await this._createLoaderMenu(root)
            manager().prepend(root)
            let close = window.setInterval(() => {
                try {
                    let closeButton = document.querySelector("#Holiday lol-uikit-dialog-frame").shadowRoot.querySelector("div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button")
                    closeButton.addEventListener("click", () => { document.getElementById("Holiday").hidden = true })
                }
                catch {}
                window.clearInterval(close)
            })
        })
        ElainaData.set("Holiday", false)
    }
}

const holidayMessages = new HolidayMessages()

export function showMessage(force) {
    holidayMessages.showMessage(force)
}