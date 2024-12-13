import * as observe from "../utils/observer.js"
import { log } from "../utils/themeLog.js";

let autoQueue = false

async function getQueueList() {
    // Get queue id list from server
    const queueData = await (await fetch('/lol-game-queues/v1/queues')).json();

    // Invalid queue id
    const invalidIds = [700, 720, 1110, 2010, 2020, 2000];

    // Filtering queue list and sorting it
    const queueList = queueData
        .filter(queue => queue.queueAvailability === 'Available' && !invalidIds.includes(queue.id))
        .map(queue => ({ queueId: queue.id, description: queue.name }))
        .sort((a, b) => a.queueId - b.queueId);

    // Save queue list to Datastore
    DataStore.set('queueList', { Gamemode: queueList });
}

async function createQueue(data) {
    await fetch('/lol-lobby/v2/lobby', {
        method: 'POST',
        body: JSON.stringify({ queueId: data }),
        headers: {
        'Content-Type': 'application/json'
        }
    })
}

async function matchMaking() {
    await fetch('/lol-lobby/v2/lobby/matchmaking/search', {
        method: 'POST'
    })
}

export function AutoQueue(context) {
    context.socket.observe('/lol-gameflow/v1/gameflow-phase', async (data) => {
        const gamePhase = data.data;
  
        if (DataStore.get("Auto-Find-Queue")) {
            switch (gamePhase) {
                case "EndOfGame": {
                    autoQueue = true
                    let delay = DataStore.get("Create-Delay")/1000

                    log(`Auto Queue will start in %c${delay}%c seconds`,"color: #blue;","")
                    let countDown = new Promise((resolve, reject) => {
                        setTimeout(async () => {
                            resolve()
                            if (!DataStore.get("aram-only")) await createQueue(DataStore.get("Gamemode"));
                            else await createQueue(450);
                        }, delay*1000)
                    })
                    Toast.promise(countDown, {
                        loading: `Auto Queue will start in ${delay} seconds`,
                        success: 'Queue created!!',
                        error: ''
                    })
                    break;
                }
                case "Lobby": {
                    if (autoQueue) {
                        let delay = DataStore.get("Find-Delay")/1000

                        let countDown = new Promise((resolve, reject) => {
                            setTimeout(async () => {
                                resolve()
                                await matchMaking()
                            }, delay*1000)
                        })
                        Toast.promise(countDown, {
                            loading: `Matching game will start in ${delay} seconds`,
                            success: '',
                            error: ''
                        })
                    }
                    break;
                }
                case "Matchmaking": {
                    autoQueue = false
                    break;
                }
                case "ChampSelect": {
                    autoQueue = true
                    break;
                }
                case "None": {
                    autoQueue = false
                    log("Auto Queue stopped");
                    break;
                }
                default: log(`Unexpected game phase: %c${gamePhase}`, "color: #e4c2b3;");
            }
        }
    });
}

// Refrest queue list everytime go to homepage
observe.subscribeToElementCreation(".rcp-fe-lol-home", (element) => {
    if (element) {
        getQueueList()
        log("Queue list refreshed.")
    }
})