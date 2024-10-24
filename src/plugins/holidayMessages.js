import config from "../config/holiday.js"
//import pandoru from "../configs/pandoru.txt?raw"

if (!DataStore.has("Day")) {
    DataStore.set("Day", "0/0")
}

let datapath = new URL("..", import.meta.url).href

let eConsole = "%c Elaina "
let eCss = "color: #ffffff; background-color: #f77fbe"

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let newdate = day+"/"+month

let message,imageLink,filter

function addData() {
    message = config[newdate]["Text"]
    imageLink = `${datapath}assets/image/${config[newdate]["Image"]}`
    filter = config[newdate]["filters"]
    console.log(eConsole+`%c ${message}`,eCss,"")
    DataStore.set("Day", newdate)
    DataStore.set("Holiday", true)
}

if (DataStore.has("Day") && newdate != DataStore.get("Day")) {
    try {
        if (newdate == config[newdate]["Day"]) {
            if (!config[newdate]["nsfw"]) addData()
            else if (config[newdate]["nsfw"]) {
                if (DataStore.get("NSFW-Content")) {
                    addData()
                    console.log(eConsole+`%c NSFW content!!`,eCss,"")
                }
            }
        }
        else {
            console.log(eConsole+`%c Today doesn't have event`,eCss,"")
            DataStore.set("Day", newdate)
        }
    }
    catch {
        console.log(eConsole+`%c Today doesn't have event`,eCss,"")
        DataStore.set("Day", newdate)
    }
}

if (newdate == "25/12" && DataStore.get("Merry-Christmas")){
    //console.log(pandoru)
}

function showMessage(force) {
    if (force) addData()
        
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
            }catch{}
            window.clearInterval(close)
        })
    })
    DataStore.set("Holiday", false)
}

if (DataStore.get("Holiday")) showMessage(false)

export { showMessage }

console.log(eConsole+`%c ${DataStore.get("Day")}`,eCss,"")