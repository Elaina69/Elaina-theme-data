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

// 2.0.3
if (!DataStore.has("pick-delay")) {
	DataStore.set("pick-delay", 500)
}
if (!DataStore.has("ban-delay")) {
	DataStore.set("ban-delay", 500)
}