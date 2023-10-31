if (DataStore.get("Custom-profile-hover")) {
    let queueOptions = ["RANKED_SOLO_5x5","RANKED_FLEX_SR","RANKED_FLEX_TT",
                        "RANKED_TFT","RANKED_TFT_TURBO","RANKED_TFT_DOUBLE_UP",
    ]
    let tierOptions = ["IRON","BRONZE","SILVER","GOLD","PLATINUM",
                    "DIAMOND","EMERALD","MASTER","GRANDMASTER","CHALLENGER"
    ]
    let divisionOptions = ["I", "II", "III", "IV"];

    window.setInterval(async ()=>{
        try {
            if (document.querySelector("#lol-uikit-tooltip-root div.hover-card.right.has-regalia.regalia-loaded")) {
                if (DataStore.get("Custom-challenge-crystal")) {
                    try {
                        let requestChallengeCrystal = {
                            "lol": {
                                "challengePoints"       : `${DataStore.get("Challenge-Points")}`,
                                "challengeCrystalLevel" : `${tierOptions[DataStore.get("challengeCrystalLevel")]}`
                            }
                        }
                        let checkID = document.querySelector("#lol-uikit-tooltip-root lol-regalia-hovercard-v2-element").getAttribute("summoner-id")
                        let text = document.querySelector("#lol-uikit-tooltip-root div.hover-card-challenge-crystal").innerText
                        let check = text.includes(`${DataStore.get("Challenge-Points")}`)
                        if (!check && checkID == DataStore.get("Summoner-ID")) {
                            await fetch("/lol-chat/v1/me", {
                                method : "PUT",
                                headers: {"content-type": "application/json"},
                                body   : JSON.stringify(requestChallengeCrystal)
                            })
                        }
                    }catch{}
                }
            }
            if (DataStore.get("Custom-mastery-score")) {
                try {document.querySelector("div.style-profile-emblem-wrapper div.style-profile-champion-mastery-score").innerText = `${DataStore.get("Mastery-Score")}`}catch{}
                try {document.querySelector("div.collections-routes div.total-owned.total-count.ember-view").innerText = `${DataStore.get("Mastery-Score")}`} catch{}
                try {
                    let text = document.querySelector("#hover-card-header > div.hover-card-header-left > span.hover-card-mastery-score").innerText
                    let check = text.includes(`${DataStore.get("Mastery-Score")}`)
                    let checkID = document.querySelector("#lol-uikit-tooltip-root lol-regalia-hovercard-v2-element").getAttribute("summoner-id")
                    if (!check && checkID == DataStore.get("Summoner-ID")) {
                        await fetch("/lol-chat/v1/me", {
                            method : "PUT",
                            headers: {"content-type": "application/json"},
                            body   : JSON.stringify({"lol":{"masteryScore":`${DataStore.get("Mastery-Score")}`}})
                        })
                    }
                }catch{}
            }
        }
        catch {}
    },500)

    window.setInterval(async ()=>{
        if (DataStore.get("Custom-rank")) {
            let requestRank = {
                "lol": {
                    "rankedLeagueQueue"    : queueOptions[DataStore.get("Ranked Queue ID")],
                    "rankedLeagueTier"     : tierOptions[DataStore.get("Ranked Tier ID")],
                    "rankedLeagueDivision" : divisionOptions[DataStore.get("Ranked Division ID")]
                }
            }
            await fetch("/lol-chat/v1/me", {
                method : "PUT",
                headers: {"content-type": "application/json"},
                body   : JSON.stringify(requestRank)
            })
        }
        if (DataStore.get("Custom-mastery-score")) {
            await fetch("/lol-chat/v1/me", {
                method : "PUT",
                headers: {"content-type": "application/json"},
                body   : JSON.stringify({"lol":{"masteryScore":`${DataStore.get("Mastery-Score")}`}})
            })
        }
        if (DataStore.get("Custom-challenge-crystal")) {
            let requestChallengeCrystal = {
                "lol": {
                    "challengePoints"       : `${DataStore.get("Challenge-Points")}`,
                    "challengeCrystalLevel" : `${tierOptions[DataStore.get("challengeCrystalLevel")]}`
                }
            }
            await fetch("/lol-chat/v1/me", {
                method : "PUT",
                headers: {"content-type": "application/json"},
                body   : JSON.stringify(requestChallengeCrystal)
            })
        }
    }, 60000)
} 