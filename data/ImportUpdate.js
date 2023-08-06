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
// if (!DataStore.has("pick-delay")) {
// 	DataStore.set("pick-delay", 500)
// }
// if (!DataStore.has("ban-delay")) {
// 	DataStore.set("ban-delay", 500)
// }

//2.0.4
if (!DataStore.has("hide-overview")) {
	DataStore.set("hide-overview", true)
}
if (!DataStore.has("hide-merch")) {
	DataStore.set("hide-merch", true)
}
if (!DataStore.has("hide-patch-note")) {
	DataStore.set("hide-patch-note", true)
}
if (!DataStore.has("hide-esport")) {
	DataStore.set("hide-esport", true)
}
if (!DataStore.has("Custom-Border")) {
	DataStore.set("Custom-Border", true)
}
if (!DataStore.has("Custom-RP-Icon")) {
	DataStore.set("Custom-RP-Icon", true)
}
if (!DataStore.has("Custom-BE-Icon")) {
	DataStore.set("Custom-BE-Icon", true)
}
if (!DataStore.has("Custom-Rank-Icon")) {
	DataStore.set("Custom-Rank-Icon", true)
}
if (!DataStore.has("Custom-Emblem")) {
	DataStore.set("Custom-Emblem", true)
}
if (!DataStore.has("Custom-Clash-banner")) {
	DataStore.set("Custom-Clash-banner", true)
}
if (!DataStore.has("Custom-Ticker")) {
	DataStore.set("Custom-Ticker", true)
}
if (!DataStore.has("Custom-Trophy")) {
	DataStore.set("Custom-Trophy", true)
}
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
	utils.mutationObserverAddCallback(updateV204, ["screen-root"])
})

//2.0.5
if (!DataStore.has("Custom-Regalia-Banner")) {
	DataStore.set("Custom-Regalia-Banner", true)
}
if (!DataStore.has("Custom-Hover-card-backdrop")) {
	DataStore.set("Custom-Hover-card-backdrop", true)
}
if (!DataStore.has("Debug-mode")) {
	DataStore.set("Debug-mode", false)
}