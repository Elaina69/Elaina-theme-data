import utils from "./_utils"
let datapath = new URL(".", import.meta.url).href

window.addEventListener("load", ()=> {
	utils.addStyle(`
		@import url("${datapath}ImportUpdate.css")
	`)
})

if (!DataStore.has("")) {
	DataStore.set("", true)
}