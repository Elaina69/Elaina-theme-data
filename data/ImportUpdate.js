import utils from "./_utils"
let datapath = new URL(".", import.meta.url).href

window.addEventListener("load", ()=> {
	utils.addCss("","","",`${datapath}ImportUpdate.css`)
})

if (!DataStore.has("")) {
	DataStore.set("", true)
}

if (!DataStore.has("Enable-Invite-Fr")) {
	DataStore.set("Enable-Invite-Fr", true)
}
if (!DataStore.has("Auto-Honor")) {
	DataStore.set("Auto-Honor", true)
}