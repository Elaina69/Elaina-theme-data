import config from "../config/holiday.js"
import { log } from "../utils/themeLog.js";

if (!ElainaData.has("Day")) {
    ElainaData.set("Day", "0/0")
}

if (!ElainaData.has("Holiday-Shown-Images")) {
    ElainaData.set("Holiday-Shown-Images", {})
}

let datapath = new URL("..", import.meta.url).href

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let newdate = day+"/"+month

let pandoru = ""

let message,imageLink,filter

function addData(date) {
    message = config[date]["Text"]

    const images = config[date]["Image"]
    let randomImage = ""
    
    if (images.length > 0) {
        // Get the list of shown images for the current date
        let shownImages = ElainaData.has("Holiday-Shown-Images") ? ElainaData.get("Holiday-Shown-Images") : {}
        let shownForDate = shownImages[date] || []
        
        // Filter out images that have already been shown
        const unshownImages = images.filter(img => !shownForDate.includes(img))
        
        // If there are unshown images, prioritize showing them
        if (unshownImages.length > 0) {
            randomImage = unshownImages[Math.floor(Math.random() * unshownImages.length)]
        } 
        else {
            // If all images have been shown, reset and choose randomly
            log(`All images for ${date} have been shown. Resetting...`)
            shownForDate = []
            randomImage = images[Math.floor(Math.random() * images.length)]
        }
        
        // Save the selected image to the list of shown images
        shownForDate.push(randomImage)
        shownImages[date] = shownForDate
        ElainaData.set("Holiday-Shown-Images", shownImages)
        
        imageLink = `${datapath}assets/image/${randomImage}`
    } else {
        imageLink = ""
    }

    filter = config[date]["filters"]

    log(`${message}`)

    ElainaData.set("Day", date)
    ElainaData.set("Holiday", true)
}

if (ElainaData.has("Day") && newdate != ElainaData.get("Day")) {
    try {
        if (newdate == config[newdate]["Day"]) {
            if (!config[newdate]["nsfw"]) addData(newdate)
            else if (config[newdate]["nsfw"]) {
                if (ElainaData.get("NSFW-Content")) {
                    addData(newdate)
                    log(`NSFW content!!`)
                }
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

if (newdate == "25/12" && ElainaData.get("Merry-Christmas")){
    try {
        const response = await fetch(`${datapath}config/pandoru.txt`);
        if (!response.ok) {
            throw new Error(`Failed to fetch the file: ${response.statusText}`);
        }
        else pandoru = await response.text();
    } 
    catch (error) {
        console.error("Error:", error);
    }

    console.log(pandoru)
}

function showMessage(force) {
    if (force) addData(ElainaData.get("Day"))
        
    async function createLoaderMenu(root) {
        let close = await getString('l.close')
        const { Component, jsx, render } = await import('//esm.run/nano-jsx')
        
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
                </div>
                `
            }
        }
        render(jsx`<${LoaderMenu} />`, root)
    }
    
    window.addEventListener("load", async ()=> {
        const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper')
        const root    = document.createElement('div')
        while (!manager()) await new Promise(r => setTimeout(r, 200))
        await createLoaderMenu(root)
        manager().prepend(root)
        let close = window.setInterval(()=>{
            try {
                let closeButton = document.querySelector("#Holiday lol-uikit-dialog-frame").shadowRoot.querySelector("div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button")
                closeButton.addEventListener("click", ()=> {document.getElementById("Holiday").hidden = true})
            }
            catch {}
            window.clearInterval(close)
        })
    })
    ElainaData.set("Holiday", false)
}

if (ElainaData.get("Holiday") && ElainaData.get("holiday-message")) showMessage(false)

export { showMessage }

log(`${ElainaData.get("Day")}`)