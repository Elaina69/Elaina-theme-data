import utils from "./Utilities/_utils.js"
let datapath = new URL(".", import.meta.url).href

window.addEventListener("load", ()=> {
	utils.addStyle(`
		@import url("${datapath}ImportUpdate.css")
	`)
})

if (!DataStore.has("")) {
	DataStore.set("", true)
}



//uhmm i think i will use this for 1/4

let RickRoll = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygULcmljayBhc3RsZXk%3D"

let month = new Date().getMonth() + 1;
let day = new Date().getDate();
let newdate = day+"/"+month

function isNSFWon() {
	if (DataStore.get("NSFW-Content")) return "inline"
	else return "none"
}

if (newdate == "1/4" && !DataStore.has("2nd-1/4")) {
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
                                    <lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-small" style="width: 400px;">
                                        <h5>Elaina_V4</h5>
                                        <hr class="heading-spacer" />
                                        <p class="Elaina-Update" style="text-align: center">"Happy 1/4"</p>
                                        <hr class="heading-spacer" />
                                        <hr class="heading-spacer" />
                                        <video src="https://elainatheme.xyz/Assets/1-4.webm" controls style="width: 250px; border: 0px; border-radius: 10px; display: ${isNSFWon()}"></video>
    
                                    </lol-uikit-content-block>
                                </div>
                                <lol-uikit-flat-button-group type="dialog-frame">
                                    <lol-uikit-flat-button tabindex="1" onClick=${() => {document.getElementById("Holiday").hidden = true; window.open(RickRoll, "_blank")}}>${close}</lol-uikit-flat-button>
                                </lol-uikit-flat-button-group>
                            </lol-uikit-dialog-frame>
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
                closeButton.addEventListener("click", ()=> {document.getElementById("Holiday").hidden = true; window.open(RickRoll, "_blank")})
            }catch{}
            window.clearInterval(close)
        })
    })
    DataStore.set("2nd-1/4", true)
}