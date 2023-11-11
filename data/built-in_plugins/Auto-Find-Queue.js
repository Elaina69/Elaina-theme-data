import utils from "../_utils.js"

let LCUfetch = await fetch('/lol-game-queues/v1/queues')
let queue = await LCUfetch.json()
let queueList = {"Gamemode":[]}

for(let i = 0; i < queue.length ; i++) {
	let Availability = queue[i]["queueAvailability"]
	let queueID = queue[i]["id"]
	let invalidID = [700,720,1110,2010,2020,2000]

    if (Availability == "Available" && !invalidID.includes(queueID)) {
        let queueInfo = {"queueId":queueID,"description":queue[i]["name"]}
        queueList["Gamemode"].push(queueInfo)
    }
}
queueList["Gamemode"].sort((a, b) => {return a.queueId - b.queueId});

DataStore.set("queueList", queueList)

let AutoQueue = (node) => {
    let pagename = node.getAttribute("data-screen-name")

	if (pagename == "rcp-fe-lol-postgame") {
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