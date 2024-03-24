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