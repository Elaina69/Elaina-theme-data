import utils from "./_utils"
let datapath = new URL(".", import.meta.url).href

let updateV204 = async (node) => {
    let pagename, previous_page
    pagename = node.getAttribute("data-screen-name")

    if (pagename == "rcp-fe-lol-home-main") {
		const delnavtab = window.setInterval(()=> {
			if (document.querySelector('#rcp-fe-viewport-root > section.rcp-fe-viewport-persistent > div > div > lol-uikit-navigation-bar > lol-uikit-navigation-item[item-id="overview"]')) {
				window.clearInterval(delnavtab)
				if (DataStore.get("hide-overview")) {
					document.querySelector('#rcp-fe-viewport-root > section.rcp-fe-viewport-persistent > div > div > lol-uikit-navigation-bar > lol-uikit-navigation-item[item-id="overview"]').style.display = "none"
				}
				if (DataStore.get("hide-merch")) {
					try {document.querySelector('#rcp-fe-viewport-root > section.rcp-fe-viewport-persistent > div > div > lol-uikit-navigation-bar > lol-uikit-navigation-item[item-id="merch"]').style.display = "none"}
					catch {console.warn("Merch tab doesn't exist")}
				}
				if (DataStore.get("hide-patch-note")) {
					try {document.querySelector('#rcp-fe-viewport-root > section.rcp-fe-viewport-persistent > div > div > lol-uikit-navigation-bar > lol-uikit-navigation-item[item-id="latest_patch_notes"]').style.display = "none"}
					catch {console.warn("Patch note tab doesn't exist")}
				}
				if (DataStore.get("hide-esport")) {
					try {document.querySelector('#rcp-fe-viewport-root > section.rcp-fe-viewport-persistent > div > div > lol-uikit-navigation-bar > lol-uikit-navigation-item[item-id="news"]').style.display = "none"}
					catch {console.warn("Esport tab doesn't exist")}
				}
			}
		},1000)
	}
	if (previous_page != pagename) {previous_page = pagename}
}

window.addEventListener("load", ()=> {
	utils.addCss("","","",`${datapath}ImportUpdate.css`)
	utils.mutationObserverAddCallback(updateV204, ["screen-root"])
})

if (!DataStore.has("hide-theme-usage-time")) {
	DataStore.set("hide-theme-usage-time", false)
}
if (!DataStore.has("auto_accept_button")) {
	DataStore.set("auto_accept_button", true)
}
if (!DataStore.has("")) {
	DataStore.set("", true)
}