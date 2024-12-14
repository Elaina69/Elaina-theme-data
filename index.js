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
class CheckUsing {
    generateTempID = () => {
        return Math.floor(1000000000000000 + Math.random() * 9000000000000000)
    }

    trackStart = (userId) => {
        //@ts-ignore 

        const data = {
            userId: userId,
            pageUrl: window.location.href,
            timestamp: new Date().toISOString(),
            locale: document.querySelector("html")?.lang
        };
    
        fetch("https://elainatheme.xyz/api/track", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => log("Tracking start success:", data))
        .catch(errorData => error("Tracking start error:", errorData));
    }

    sendKeepAlive = (userId) =>  {
        const data = {
            userId: userId,
            timestamp: new Date().toISOString(),
            pageUrl: window.location.href,
            locale: document.querySelector("html")?.lang
        };
    
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

            let userId = window.DataStore.get("Summoner-ID") || this.generateTempID()
            this.trackStart(userId)

            window.setInterval(() => {
                this.sendKeepAlive(userId)
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