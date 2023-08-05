if ("Custom-profile-hover") {
    let queueOptions = ["RANKED_SOLO_5x5","RANKED_FLEX_SR","RANKED_FLEX_TT",
                        "RANKED_TFT","RANKED_TFT_TURBO","RANKED_TFT_DOUBLE_UP",
    ]
    let tierOptions = ["IRON","BRONZE","SILVER","GOLD","PLATINUM",
                    "DIAMOND","EMERALD","MASTER","GRANDMASTER","CHALLENGER"
    ]
    let divisionOptions = ["I", "II", "III", "IV"];

    let requestRank = {
        "lol": {
            "rankedLeagueQueue"    : queueOptions[DataStore.get("Ranked Queue ID")],
            "rankedLeagueTier"     : tierOptions[DataStore.get("Ranked Tier ID")],
            "rankedLeagueDivision" : divisionOptions[DataStore.get("Ranked Division ID")]
        }
    }

    let requestChallengeCrystal = {
        "lol": {
            "challengePoints"       : `${DataStore.get("Challenge-Points")}`,
            "challengeCrystalLevel" : `${tierOptions[DataStore.get("challengeCrystalLevel")]}`
        }
    }

    
    window.setInterval(async ()=>{
        if (DataStore.get("Custom-rank")) {
            await fetch("/lol-chat/v1/me", {
                method : "PUT",
                headers: {"content-type": "application/json"},
                body   : JSON.stringify(requestRank)
            })
        }

        if (DataStore.get("Custom-challenge-crystal")) {
            await fetch("/lol-chat/v1/me", {
                method : "PUT",
                headers: {"content-type": "application/json"},
                body   : JSON.stringify(requestChallengeCrystal)
            })
        }
    }, 180000)

    window.setInterval(async ()=> {
        if (DataStore.get("Custom-mastery-score")) {
            await fetch("/lol-chat/v1/me", {
                method : "PUT",
                headers: {"content-type": "application/json"},
                body   : JSON.stringify({"lol":{"masteryScore":`${DataStore.get("Mastery-Score")}`}})
            })
        }
    },10000)

    window.setInterval(async ()=>{
        if (DataStore.get("Custom-mastery-score")) {
            try {document.querySelector("div.style-profile-emblem-wrapper > div.style-profile-emblem-header > div.style-profile-champion-mastery-score").innerText = `${DataStore.get("Mastery-Score")}`}catch{}
            try {document.querySelector("div.collections-routes > div > div.control-panel > div.collection-details > div.collection-totals > div.total-owned.total-count.ember-view").innerText = `${DataStore.get("Mastery-Score")}`} catch{}
        }
    },300)
} 