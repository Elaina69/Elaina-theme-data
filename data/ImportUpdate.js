import utils from "./_utils"
let datapath = new URL(".", import.meta.url).href

// 2.0.2
if (!DataStore.has("Custom-rank")) {
	DataStore.set("Custom-rank", true)
}

window.addEventListener("load", ()=> {
    utils.addCss("","","",`${datapath}ImportUpdate.css`)
})
//