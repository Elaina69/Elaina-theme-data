import utils from "./_utils"
let datapath = new URL(".", import.meta.url).href

// 2.0.2
if (!DataStore.has("Custom-rank")) {
	DataStore.set("Custom-rank", true)
}
if (!DataStore.has("Runes-BG")) {
	DataStore.set("Runes-BG", true)
}

window.addEventListener("load", ()=> {
    utils.addCss("","","",`${datapath}ImportUpdate.css`)
})
//