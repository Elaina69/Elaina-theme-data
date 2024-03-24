import utils from '../Utilities/_utils.js'
import * as observer from "../Utilities/_observer.js"

let queueOptions = ["RANKED_SOLO_5x5","RANKED_FLEX_SR","RANKED_FLEX_TT",
                    "RANKED_TFT","RANKED_TFT_TURBO","RANKED_TFT_DOUBLE_UP",
]
let tierOptions = ["IRON","BRONZE","SILVER","GOLD","PLATINUM",
                "DIAMOND","EMERALD","MASTER","GRANDMASTER","CHALLENGER"
]
let divisionOptions = ["I", "II", "III", "IV"];

let requestChallengeCrystal = {
    "lol": {
        "challengePoints"       : `${DataStore.get("Challenge-Points")}`,
        "challengeCrystalLevel" : `${tierOptions[DataStore.get("challengeCrystalLevel")]}`
    }
}
let requestRank = {
    "lol": {
        "rankedLeagueQueue"    : queueOptions[DataStore.get("Ranked Queue ID")],
        "rankedLeagueTier"     : tierOptions[DataStore.get("Ranked Tier ID")],
        "rankedLeagueDivision" : divisionOptions[DataStore.get("Ranked Division ID")]
    }
}
let requestMasteryScore = {
    "lol": {
        "masteryScore":`${DataStore.get("Mastery-Score")}`
    }
}

async function request(method, endpoint, { headers = {}, body = {} } = {}) {
    const requestOptions = {
        method: method,
        headers: {
            ...headers,
            "accept": "application/json",
            "content-type": "application/json"
        }
    }
    if (method !== "GET" && method !== "HEAD") {
        requestOptions.body = JSON.stringify(body)
    }
    return await fetch(endpoint, requestOptions)
}
  
async function getPlayerPreferences() {
    const endpoint = "/lol-challenges/v1/summary-player-data/local-player"
    const response = await request("GET", endpoint)
    const responseData = await response.json()
    const playerPreferences = { challengeIds: [] }
  
    playerPreferences.challengeIds = responseData.topChallenges.map(badgeChallenge => badgeChallenge.id)
    if (responseData.title.itemId !== -1) { 
        playerPreferences.title = `${responseData.title.itemId}`
    }
    if (responseData.bannerId) { 
        playerPreferences.bannerAccent = responseData.bannerId 
    }
    return playerPreferences
}
  
async function updatePlayerPreferences(playerPreferences) {
    const endpoint = "/lol-challenges/v1/update-player-preferences"
    return await request("POST", endpoint, { body: playerPreferences })
}
  
async function setupInvisibleBanner() {
    const bannerContainer = document.querySelector("div > lol-regalia-profile-v2-element")?.shadowRoot.querySelector("div > lol-regalia-banner-v2-element").shadowRoot.querySelector("div")
    if (!bannerContainer || bannerContainer.hasAttribute("invisible-banner-setup")) { return }
  
    bannerContainer.setAttribute("invisible-banner-setup", "true")
    bannerContainer.addEventListener("mouseenter", () => { bannerContainer.style.opacity = "0.5" })
    bannerContainer.addEventListener("mouseleave", () => { bannerContainer.style.opacity = "1" })
    bannerContainer.addEventListener("click", async () => {
        const playerPreferences = await getPlayerPreferences()
        playerPreferences.bannerAccent = playerPreferences.bannerAccent === "2" ? "1" : "2"
        await updatePlayerPreferences(playerPreferences)
    })
}
  
async function setupBadgesFunctions() {
    const badgesContainer = document.querySelector("div > div.challenge-banner-token-container")
    if (!badgesContainer || badgesContainer.hasAttribute("copy-badges-setup")) { return }
  
    badgesContainer.setAttribute("copy-badges-setup", "true")
    badgesContainer.addEventListener("mouseenter", () => { badgesContainer.style.opacity = "0.5" })
    badgesContainer.addEventListener("mouseleave", () => { badgesContainer.style.opacity = "1" })
    badgesContainer.addEventListener("click", async () => {
        const playerPreferences = await getPlayerPreferences()
  
        if (!playerPreferences.challengeIds.length) {
            console.debug(`The player does not have a defined badge.`)
            return
        }
  
        const firstBadge = playerPreferences.challengeIds[0]
        playerPreferences.challengeIds = Array(3).fill(firstBadge)
        await updatePlayerPreferences(playerPreferences)
    })
    badgesContainer.addEventListener("contextmenu", async () => {
        const playerPreferences = await getPlayerPreferences()
  
        if (!playerPreferences.challengeIds.length) {
            console.debug(`The player badges are already empty.`)
            return
        }
  
        playerPreferences.challengeIds = []
        await updatePlayerPreferences(playerPreferences)
    })
}
  
async function onMutation() {
    const toSetup = [
        //setupInvisibleBanner(),
        setupBadgesFunctions()
    ]
    await Promise.all(toSetup)
}

function freezeProperties(object, properties) {
	for (const type in object) {
		if ((properties && properties.length && properties.includes(type)) || (!properties || !properties.length)) {
			let value = object[type]
			try {
				Object.defineProperty(object, type, {
					configurable: false,
					get: () => value,
					set: (v) => v,
				})
			}catch {}
		}
	}
}

if (DataStore.get("Custom-profile-hover")) {
    observer.subscribeToElementCreation("#lol-uikit-tooltip-root",async (element)=>{
        try{
            let checkID = element.querySelector(`lol-regalia-hovercard-v2-element`).getAttribute("summoner-id")
            if (checkID == DataStore.get("Summoner-ID")) {
                let MStext = document.querySelector("#hover-card-header > div.hover-card-header-left > span.hover-card-mastery-score").innerText
                let checkMS = MStext.includes(`${DataStore.get("Mastery-Score")}`)
                if (!checkMS && DataStore.get("Custom-mastery-score")) {
                    await request("PUT","/lol-chat/v1/me",{body: requestMasteryScore})
                }
                let fix = window.setInterval(async ()=>{
                    let CPtext = element.querySelector(".hover-card-challenge-crystal").innerText
                    let checkCP = CPtext.includes(`${DataStore.get("Challenge-Points")}`)
                    if (!checkCP && DataStore.get("Custom-challenge-crystal")) {
                        await request("PUT","/lol-chat/v1/me",{body: requestChallengeCrystal})
                    }
                },100)
                window.setTimeout(()=>{
                    window.clearInterval(fix)
                },3000)
            }
        }catch{}
    })
    if (DataStore.get("Custom-mastery-score")) {
        observer.subscribeToElementCreation(".collection-totals",(element)=>{
            let a = element.querySelector(".total-owned.total-count.ember-view")
            a.innerText = `${DataStore.get("Mastery-Score")}`
            freezeProperties(a,["innerText"])
        })
        observer.subscribeToElementCreation(".style-profile-champion-mastery-score",(element)=>{
            element.innerText = `${DataStore.get("Mastery-Score")}`
            freezeProperties(element,["innerText"])
        })
    }

    window.setTimeout(async ()=>{
        if (DataStore.get("Custom-rank")) {
            await request("PUT","/lol-chat/v1/me",{body: requestRank})
        }
        if (DataStore.get("Custom-mastery-score")) {
            await request("PUT","/lol-chat/v1/me",{body: requestMasteryScore})
        }
        if (DataStore.get("Custom-challenge-crystal")) {
            await request("PUT","/lol-chat/v1/me",{body: requestChallengeCrystal})

            observer.subscribeToElementCreation(".crystal-wrapper",(element)=>{
                let a = element.querySelector(".contents > div:nth-child(1)")
                let b = element.querySelector(".total-points")

                a.setAttribute("class", `crystal-image ${tierOptions[DataStore.get("challengeCrystalLevel")]}`)
                b.innerText = `${DataStore.get("Challenge-Points")}`
                element.querySelector(".level").innerText = tierOptions[DataStore.get("challengeCrystalLevel")].toLowerCase()
            })
        }
    }, 10000)
}

window.addEventListener("load", ()=> {
    utils.routineAddCallback(onMutation, [".rcp-fe-lol-profiles-main"])
})