const cdnModulesToImport = [
    "./src/update/updateMessage.js",
    "./src/importupdate.js",
    "./src/languages.js",
    "./src/plugins/watermark.js",
    "./src/plugins/donate.js",
    "./src/plugins/holidayMessages.js",
    "./src/plugins/commandBar.js",
    "./src/plugins/keyCombines.js",
    "./src/plugins/customChampsBg.js",
    "./src/plugins/preloadImg.js"
];

cdnModulesToImport.forEach(module => import(module));

import { log, error } from './src/utils/themeLog.js';

// this will be remove in v4.3.0
let generateTempID = Math.floor(100 + Math.random() * 900)
let tempID = `0000${Date.now()}${generateTempID}`
class CheckUsing {
    trackStart = (userId, name, tag) => {
        let data

        if (window.DataStore.get("AllowTrackingData")) {
            data = {
                userId: userId,
                summonerName: name,
                tagLine: tag,
                timestamp: new Date().toISOString(),
                locale: document.querySelector("html")?.lang
            };
        }
        else {
            data = {
                userId: tempID,
                summonerName: "none",
                tagLine: "none",
                timestamp: new Date().toISOString(),
                locale: "none"
            };
        }
    
        fetch("https://elainatheme.xyz/api/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
    }

    sendKeepAlive = (userId, name, tag) =>  {
        let data
        
        if (window.DataStore.get("AllowTrackingData")) {
            data = {
                userId: userId,
                summonerName: name,
                tagLine: tag,
                timestamp: new Date().toISOString(),
                locale: document.querySelector("html")?.lang
            };
        }
        else {
            data = {
                userId: tempID,
                summonerName: "none",
                tagLine: "none",
                timestamp: new Date().toISOString(),
                locale: "none"
            };
        }
    
        fetch("https://elainatheme.xyz/api/keep-alive", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (window.DataStore.get("Dev-mode")) log("Keep-alive success:", data)
        })
        .catch(errorData => error("Keep-alive error:", errorData));
    }

    main = async () => {
        log('Checking backup server availability');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        try {
            const response = await fetch('https://elainatheme.xyz/numberOfUsers', { signal: controller.signal });
            const { count } = await response.json();
            log('Number of users:', count);
            const { default: serverModule } = await import('https://elainatheme.xyz/index.js');

            if (!window.DataStore.has("AllowTrackingData")) {
                let text = "Hi!, I'm Elaina.\n\nWould you like to share your infomation so I can write it to my diary?\nIt will including:\n - Your username\n - Your time using this theme\n - Your current language\n\nClick \"Ok\" to allow me, \"Cancel\" to refuse\nYou can switch this option anytime inside theme settings.\n ༼ つ ◕_◕ ༽つ"
                if (window.confirm(text) == true) {
                    window.DataStore.set("AllowTrackingData", true)
                }
                else window.DataStore.set("AllowTrackingData", false)
            }

            let userId = window.DataStore.get("Summoner-ID")
            let playerData = await (await fetch(`./lol-summoner/v1/summoners/${userId}`)).json()

            this.trackStart(userId, playerData["gameName"], playerData["tagLine"])

            window.setInterval(() => {
                this.sendKeepAlive(userId, playerData["gameName"], playerData["tagLine"])
            }, 60000);
        } 
        catch (err) {
            clearTimeout(timeoutId);
            throw err;
        }
    }
}

const checkUsing = new CheckUsing()
checkUsing.main()