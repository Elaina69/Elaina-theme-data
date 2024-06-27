let eConsole = "%c Elaina "
let eCss = "color: #ffffff; background-color: #f77fbe"
let autoQueue = false

async function getQueueList() {
	let queue = await (await fetch('/lol-game-queues/v1/queues')).json()
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
}
function createQueue(data) {
	window.setTimeout(async ()=>{
		await fetch('/lol-lobby/v2/lobby', {
			method: 'POST',
			body: JSON.stringify({ queueId: data }),
			headers: {
			'Content-Type': 'application/json'
			}
		})
	},DataStore.get("Create-Delay"))
}
function matchMaking() {
	window.setTimeout(async ()=>{
		await fetch('/lol-lobby/v2/lobby/matchmaking/search', {
			method: 'POST'
		})
	},DataStore.get("Find-Delay"))
}

export function AutoQueue(context) {
	context.socket.observe('/lol-gameflow/v1/gameflow-phase',async (data) => {
		if (DataStore.get("Auto-Find-Queue")) {
			if (data["data"]=="EndOfGame") {
				autoQueue = true
				console.log(`%c Elaina %c Auto Queue will start in ${DataStore.get("Create-Delay")/1000} seconds`,"color: #ffffff; background-color: #f77fbe","")
				if (!DataStore.get("aram-only")) createQueue(DataStore.get("Gamemode"))
				else createQueue(450)
			}
			if (data["data"]=="Lobby" && autoQueue) matchMaking()
			if (data["data"]=="Matchmaking") autoQueue = false
			if (data["data"]=="ChampSelect") autoQueue = true
			if (data["data"]=="None") {
				autoQueue = false
				console.log(eConsole+`%c Auto Queue stopped`,eCss,"")
			}
		}
	})
}

window.addEventListener("load",()=>{ 
	let getList = window.setInterval(()=> {
		getQueueList()
		window.setTimeout(()=> {
			window.clearInterval(getList)
		},5000)
	}, 1000) 
})