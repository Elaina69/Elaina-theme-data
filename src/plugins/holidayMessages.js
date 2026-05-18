import config from "../config/holiday.js"
import { serverDomain } from "../config/serverDomain.js"
import { log } from "../utils/themeLog.js"

const datapath = new URL("..", import.meta.url).href
const RICK_ROLL_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygULcmljayBhc3RsZXk%3D"

class HolidayMessages {
    constructor() {
        if (!ElainaData.has("Day")) ElainaData.set("Day", "0/0")
        if (!ElainaData.has("Holiday-Shown-Images")) ElainaData.set("Holiday-Shown-Images", {})

        this.currentHoliday = null

        this._checkToday()
        this._runSkippedActions(this._getToday())
        this._checkChristmas()

        if (ElainaData.get("Holiday")) {
            if (!this.currentHoliday) {
                this._addData(ElainaData.get("Day"), { ignoreDataKey: true })
            }

            if (this._shouldAutoShow(this.currentHoliday)) {
                this.showMessage(false)
            }
        }

        log(`${ElainaData.get("Day")}`)
    }

    _getToday() {
        const month = new Date().getMonth() + 1
        const day = new Date().getDate()

        return day + "/" + month
    }

    _getHoliday(date) {
        const holiday = config[date]

        if (!holiday || holiday["Day"] !== date) {
            return null
        }

        return holiday
    }

    _canShowHoliday(holiday) {
        return !holiday["nsfw"] || ElainaData.get("NSFW-Content")
    }

    _shouldAutoShow(holiday) {
        return Boolean(holiday && (ElainaData.get("holiday-message") || holiday.ignoreMessageSetting))
    }

    _addData(date, { ignoreDataKey = false } = {}) {
        const holiday = this._getHoliday(date)

        if (!holiday || !this._canShowHoliday(holiday)) {
            return false
        }

        if (!ignoreDataKey && holiday["DataKey"] && ElainaData.has(holiday["DataKey"])) {
            ElainaData.set("Day", date)
            ElainaData.set("Holiday", false)
            return false
        }

        this.currentHoliday = this._normalizeHoliday(date, holiday)

        log(`${this.currentHoliday.message}`)

        ElainaData.set("Day", date)
        ElainaData.set("Holiday", true)

        return true
    }

    _normalizeHoliday(date, holiday) {
        return {
            date,
            dataKey: holiday["DataKey"],
            title: holiday["Title"] || "Elaina_V4",
            message: holiday["Text"] || "",
            dialogWidth: holiday["DialogWidth"] || "500px",
            messageStyle: holiday["MessageStyle"] || "text-align: center",
            ignoreMessageSetting: holiday["IgnoreHolidayMessageSetting"] || false,
            media: this._createMediaConfig(date, holiday),
            actions: {
                beforeShow: holiday["Actions"]?.["beforeShow"] || [],
                buttonClose: holiday["Actions"]?.["buttonClose"] || ["hideModal"],
                frameClose: holiday["Actions"]?.["frameClose"] || ["hideModal"],
                skipped: holiday["Actions"]?.["skipped"] || [],
            },
        }
    }

    _createMediaConfig(date, holiday) {
        if (holiday["Video"]) {
            const video = holiday["Video"]

            return {
                type: "video",
                src: this._resolveAssetPath(video["path"], video["source"]),
                width: video["width"] || "410px",
                volume: video["volume"],
                attributes: video["attributes"] || {},
            }
        }

        const image = this._pickImage(date, holiday["Image"] || [])

        return {
            type: "image",
            src: image ? `${datapath}assets/image/${image}` : "",
            width: holiday["ImageWidth"] || "410px",
            filter: holiday["filters"] || "",
            attributes: {},
        }
    }

    _pickImage(date, images) {
        let randomImage = ""

        if (images.length > 0) {
            const shownImages = ElainaData.has("Holiday-Shown-Images") ? ElainaData.get("Holiday-Shown-Images") : {}
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
        }

        return randomImage
    }

    _resolveAssetPath(path, source = "data") {
        if (!path) return ""
        if (source === "server") return `${serverDomain.domain}${path}`
        if (source === "absolute") return path

        return `${datapath}${path}`
    }

    _checkToday() {
        const newdate = this._getToday()

        if (ElainaData.has("Day") && newdate != ElainaData.get("Day")) {
            const holiday = this._getHoliday(newdate)

            if (holiday) {
                if (this._canShowHoliday(holiday)) {
                    this._addData(newdate)
                }
                else {
                    log(`NSFW content is disabled`)
                    ElainaData.set("Day", newdate)
                    ElainaData.set("Holiday", false)
                }
            }
            else {
                log(`Today doesn't have event`)
                ElainaData.set("Day", newdate)
                ElainaData.set("Holiday", false)
            }
        }
    }

    _runSkippedActions(today) {
        Object.entries(config).forEach(([date, holiday]) => {
            if (date === today || !holiday["DataKey"]) {
                return
            }

            this._runActions(holiday["Actions"]?.["skipped"] || [], {
                holiday: this._normalizeHoliday(date, holiday),
            })
        })
    }

    async _checkChristmas() {
        const newdate = this._getToday()

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

    async _createLoaderMenu(root, holiday) {
        const close = await getString('l.close')
        const { Component, jsx, render } = await import('//esm.run/nano-jsx')
        const modal = this

        class LoaderMenu extends Component {
            render() {
                return jsx/*html*/`
                    <div class="modal" style="position: absolute; inset: 0px; z-index: 8500;" id="Holiday">
                        <lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;"></lol-uikit-full-page-backdrop>
                        <div class="dialog-confirm" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;">
                            <lol-uikit-dialog-frame class="dialog-frame" orientation="bottom" close-button="false">
                                <div class="dialog-content">
                                    ${modal._renderContent(jsx, holiday)}
                                </div>
                                <lol-uikit-flat-button-group type="dialog-frame">
                                    <lol-uikit-flat-button tabindex="1" onClick=${() => modal._handleClose("button", holiday)}>${close}</lol-uikit-flat-button>
                                </lol-uikit-flat-button-group>
                            </lol-uikit-dialog-frame>
                        </div>
                    </div>
                `
            }
        }

        render(jsx`<${LoaderMenu} />`, root)
        this._applyMediaOptions(root, holiday)
    }

    _renderContent(jsx, holiday) {
        return jsx/*html*/`
            <lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-small" style="width: ${holiday.dialogWidth};">
                <h5>${holiday.title}</h5>
                <hr class="heading-spacer" />
                <p class="Elaina-Update" style="${holiday.messageStyle}">${holiday.message}</p>
                <hr class="heading-spacer" />
                <hr class="heading-spacer" />
                ${this._renderMedia(jsx, holiday)}
            </lol-uikit-content-block>
        `
    }

    _renderMedia(jsx, holiday) {
        const style = this._createMediaStyle(holiday)

        if (holiday.media.type === "video") {
            return jsx/*html*/`<video data-holiday-media style="${style}"></video>`
        }

        return jsx/*html*/`<img data-holiday-media style="${style}" />`
    }

    _createMediaStyle(holiday) {
        const { media } = holiday
        const baseStyle = `width: ${media.width}; border: 0px; border-radius: 10px;`

        if (media.type === "video") {
            return `${baseStyle} display: inline`
        }

        return `${baseStyle} filter: ${media.filter};`
    }

    _applyMediaOptions(root, holiday) {
        const media = root.querySelector("[data-holiday-media]")

        if (!media) {
            return
        }

        this._setAttributes(media, {
            src: holiday.media.src,
            ...holiday.media.attributes,
        })

        if (holiday.media.type === "video" && typeof holiday.media.volume === "number") {
            media.volume = holiday.media.volume
        }
    }

    _setAttributes(element, attributes) {
        Object.entries(attributes).forEach(([name, value]) => {
            if (value === false || value === null || value === undefined) {
                return
            }

            if (value === true) {
                element.setAttribute(name, "")
                return
            }

            element.setAttribute(name, String(value))
        })
    }

    _setupCloseButtonListener(holiday) {
        const intervalId = window.setInterval(() => {
            const closeButton = document.querySelector("#Holiday lol-uikit-dialog-frame")
                ?.shadowRoot?.querySelector("div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button")

            if (closeButton) {
                closeButton.addEventListener("click", () => this._handleClose("frame", holiday))
                window.clearInterval(intervalId)
            }
        }, 200)
    }

    _handleClose(type, holiday) {
        const actions = type === "frame"
            ? holiday.actions.frameClose
            : holiday.actions.buttonClose

        this._runActions(actions, this._createActionContext(holiday))
    }

    _createActionContext(holiday) {
        const modal = document.getElementById("Holiday")
        const media = modal?.querySelector("[data-holiday-media]")

        return {
            holiday,
            modal,
            media,
        }
    }

    _runActions(actions, context = {}) {
        actions.forEach(action => this._runAction(action, context))
    }

    _runAction(action, context) {
        const actionHandlers = {
            hideModal: () => {
                if (context.modal) context.modal.hidden = true
            },
            pauseVideo: () => {
                if (context.media?.tagName === "VIDEO") context.media.pause()
            },
            rickRoll: () => window.open(RICK_ROLL_URL, "_blank"),
            pauseAudioIfPlaying: () => {
                if (ElainaData.get('pause-audio') % 2 === 1) {
                    document.querySelector("#pause-audio")?.click()
                }
            },
            removeDataKey: () => {
                if (context.holiday?.dataKey) {
                    ElainaData.remove(context.holiday.dataKey)
                }
            },
        }

        actionHandlers[action]?.()
    }

    _runWhenReady(callback) {
        if (document.readyState === "loading") {
            window.addEventListener("load", callback, { once: true })
            return
        }

        callback()
    }

    showMessage = (force) => {
        if (force) {
            this._addData(ElainaData.get("Day"), { ignoreDataKey: true })
        }

        const holiday = this.currentHoliday

        if (!holiday) {
            return
        }

        this._runWhenReady(async () => {
            const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper')
            const root = document.createElement('div')

            while (!manager()) {
                await new Promise(r => setTimeout(r, 200))
            }

            this._runActions(holiday.actions.beforeShow, this._createActionContext(holiday))
            await this._createLoaderMenu(root, holiday)
            manager().prepend(root)
            this._setupCloseButtonListener(holiday)

            if (holiday.dataKey) {
                ElainaData.set(holiday.dataKey, true)
            }
        })

        ElainaData.set("Holiday", false)
    }
}

const holidayMessages = new HolidayMessages()

export function showMessage(force) {
    holidayMessages.showMessage(force)
}
