export function autoHonor(context) {
    if (DataStore.get("Auto-Honor")) {
        context.socket.observe('/lol-gameflow/v1/gameflow-phase',async (data) => {
            console.log(data)
            if(data["data"]=="PreEndOfGame") {
                let LCUfetch = await fetch('/lol-honor-v2/v1/ballot')
                let honorList = await LCUfetch.json()
                let i = Math.floor(Math.random() * honorList["eligiblePlayers"].length)
                await fetch('/lol-honor-v2/v1/honor-player', {
                    method: 'POST',
                    body: JSON.stringify({
                        "gameId": honorList["gameId"],
                        "honorCategory": "HEART",
                        "summonerId": honorList["eligiblePlayers"][i]["summonerId"]
                    }),
                    headers: {'Content-Type': 'application/json'}
                })
                Toast.success(`Honored player: ${honorList["eligiblePlayers"][i]["summonerName"]}`)
            }
        })
    }
}