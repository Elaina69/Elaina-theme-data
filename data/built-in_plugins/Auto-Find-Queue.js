import utils from "../_utils.js"

let eConsole = "%c ElainaV3 "
let eCss = "color: #ffffff; background-color: #f77fbe"
let AutoQueue = (node) => {
    let pagename = node.getAttribute("data-screen-name")

	if (pagename == "rcp-fe-lol-postgame") {
		console.log(eConsole+` %cAuto Queue will start after %c${DataStore.get("Create-Delay")/1000} %cseconds...`,eCss,"","color: #0070ff","")
		window.setTimeout(async () => {
			if (DataStore.get("Auto-Find-Queue") && !DataStore.get("aram-only")) {
				await fetch('/lol-lobby/v2/lobby', {
					method: 'POST',
					body: JSON.stringify({ queueId: DataStore.get("Gamemode") }),
					headers: {
					'Content-Type': 'application/json'
					}
				})
				window.setTimeout(async () => {
					await fetch('/lol-lobby/v2/lobby/matchmaking/search', {
						method: 'POST'
					})
				},DataStore.get("Find-Delay"))
			}
			else if (DataStore.get("Auto-Find-Queue") && DataStore.get("aram-only")) {
				await fetch('/lol-lobby/v2/lobby', {
					method: 'POST',
					body: JSON.stringify({ queueId: 450 }),
					headers: {
					'Content-Type': 'application/json'
					}
				})
				window.setTimeout(async () => {
					await fetch('/lol-lobby/v2/lobby/matchmaking/search', {
						method: 'POST'
					})
				},DataStore.get("Find-Delay"))
			}
		},DataStore.get("Create-Delay"))
	}
}

window.addEventListener('load', ()=> {
    utils.mutationObserverAddCallback(AutoQueue, ["screen-root"])
})