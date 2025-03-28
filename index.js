import { log, warn, error } from "./src/utils/themeLog.js"
import { serverDomain } from "./src/config/serverDomain.js"

let currentTime = ElainaData.get("start-time", Date.now())

class CheckDomainExpiry {
    main = () => {
        let expiringTime = new Date(serverDomain.expiring);
        let timeDifference = expiringTime - currentTime;
        let daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    
        if (daysDifference < 30) {
            warn(`The server domain is expiring soon! (${daysDifference} days left)`)
        }
        else {
            log(`Server domain expiry in ${daysDifference} days`);
        }
    };
}
const checkDomainExpiry = new CheckDomainExpiry()

class CheckUsing {
    constructor () {
        this.generateTempID = Math.floor(100 + Math.random() * 900)
        this.tempID = `0000${currentTime}${this.generateTempID}`
    }

    trackStart = async (userId, name, tag) => {
        let data

        if (ElainaData.get("AllowTrackingData")) {
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
                userId: this.tempID,
                summonerName: "none",
                tagLine: "none",
                timestamp: new Date().toISOString(),
                locale: "none"
            };
        }
    
        fetch(`${serverDomain.domain}api/elainatheme/track`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        
        log(await (await window.elainathemeApi.register(userId, `${name}#${tag}`)).message)
    }

    sendKeepAlive = (userId, name, tag) =>  {
        let data
        
        if (ElainaData.get("AllowTrackingData")) {
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
                userId: this.tempID,
                summonerName: "none",
                tagLine: "none",
                timestamp: new Date().toISOString(),
                locale: "none"
            };
        }
    
        fetch(`${serverDomain.domain}api/elainatheme/keep-alive`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (ElainaData.get("Dev-mode")) log("Keep-alive success:", data)
        })
        .catch(errorData => error("Keep-alive error:", errorData));
    }

    main = async () => {
        log('Checking backup server availability');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 2000);

        try {
            const response = await fetch(`${serverDomain.domain}api/elainatheme/totalUsers`, { signal: controller.signal });
            const count = await response.json();
            log('Number of users:', count.total);
            ElainaData.set("User-Counter", count.total)
            const { default: serverModule } = await import(`${serverDomain.domain}index.js`);

            if (!ElainaData.has("AllowTrackingData")) {
                let text = "Hi!, I'm Elaina.\n\nWould you like to share your infomation so I can write it to my diary?\nIt will including:\n - Your username\n - Your time using this theme\n - Your current language\n\nClick \"Ok\" to allow me, \"Cancel\" to refuse\nYou can switch this option anytime inside theme settings.\n ༼ つ ◕_◕ ༽つ"
                if (window.confirm(text) == true) {
                    ElainaData.set("AllowTrackingData", true)
                }
                else ElainaData.set("AllowTrackingData", false)
            }

            let userId = ElainaData.get("Summoner-ID")
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

ElainaData.set("Elaina-domain-server", serverDomain.domain)

window.addEventListener("load", () => {
    checkUsing.main()
    window.setTimeout(() => {
        if (ElainaData.get("Dev-mode")) {
            checkDomainExpiry.main()
        }
    },10000)
})