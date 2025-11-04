import { log, warn, error } from "./src/utils/themeLog.js"
import { serverDomain } from "./src/config/serverDomain.js"

let currentTime = ElainaData.get("start-time", Date.now())

class ImportModules {
    constructor () {
        this.moduleList = [
            `./src/update/updateMessage.js`,
            `./src/importupdate.js`,
            `./src/plugins/watermark.js`,
            `./src/plugins/donate.js`,
            `./src/plugins/holidayMessages.js`,
            `./src/plugins/commandBar.js`,
            `./src/plugins/keyCombines.js`,
            `./src/plugins/preloadImg.js`
        ];
    }

    main () {
        this.moduleList.forEach(module => import(module));
    }
}
const importModules = new ImportModules();

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

    getOnlineToken = async (userId, userName) => {
        let getToken = await window.elainathemeApi.login(userId, userName)

        ElainaData.set("ElainaTheme-Token", getToken.token)

        if (ElainaData.get("Dev-mode")) log("Online token retrieved:", getToken.token)
    }

    dataToSend = async (userId, name, tag) => {
        let data

        if (ElainaData.get("AllowTrackingData")) {
            data = {
                userId: userId,
                summonerName: name,
                tagLine: tag,
                timestamp: new Date().toISOString(),
                locale: (await (await fetch("/riotclient/region-locale")).json()).region
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

        return data
    }

    trackStart = async (userId, name, tag) => {
        let data = await this.dataToSend(userId, name, tag);

        const response = await fetch(`${serverDomain.domain}api/elainatheme/track`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        await response.json();

        log(await (await window.elainathemeApi.register(userId, `${name}#${tag}`)).message)
    }

    sendKeepAlive = async (userId, name, tag) =>  {
        let data = await this.dataToSend(userId, name, tag);

        try {
            const response = await fetch(`${serverDomain.domain}api/elainatheme/keep-alive`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });
            const result = await response.json();
            if (ElainaData.get("Dev-mode")) log("Keep-alive success:", result)
        } catch (errorData) {
            error("Keep-alive error:", errorData);
        }
    }

    main = async () => {
        log('Checking backup server availability');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000);

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

            await this.trackStart(userId, playerData["gameName"], playerData["tagLine"])
            await this.getOnlineToken(userId, `${playerData["gameName"]}#${playerData["tagLine"]}`)

            await window.syncUserIcons.main()

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
    importModules.main()
    checkUsing.main()
    window.setTimeout(() => {
        if (ElainaData.get("Dev-mode")) {
            checkDomainExpiry.main()
        }
    },10000)
})