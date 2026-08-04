import { log, warn, error } from "./src/utils/themeLog.js"
import { serverDomain } from "./src/config/serverDomain.js"

let currentTime = ElainaData.get("start-time", Date.now())
let elainaThemeDataStarted = false

class ImportModules {
    constructor() {
        this.moduleList = [
            `./src/importupdate.js`,
            `./src/plugins/watermark.js`,
            `./src/plugins/donate.js`,
            `./src/plugins/holidayMessages.js`,
            `./src/plugins/commandBar.js`,
            `./src/plugins/keyCombines.js`,
            `./src/plugins/preloadImg.js`
        ];
    }

    main() {
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
    constructor() {
        this.generateTempID = Math.floor(100 + Math.random() * 900)
        this.tempID = `0000${currentTime}${this.generateTempID}`
    }

    getOnlineToken = async (userId, userName) => {
        let getToken = await window.elainathemeApi.login(userId, userName)
        if (!getToken?.token) throw new Error("Login response did not include a token")

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

    sendKeepAlive = async (userId, name, tag) => {
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

    fetchJsonWithTimeout = async (url, options = {}, timeout = 10000) => {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`)
            }

            return await response.json();
        }
        finally {
            clearTimeout(timeoutId);
        }
    }

    main = async () => {
        await import(`./src/apiWrapper.js`);

        // Check if the server is reachable
        log('Checking backup server availability');

        try {
            const count = await this.fetchJsonWithTimeout(`${serverDomain.domain}api/elainatheme/totalUsers`);
            log('Number of users:', count.total);
            ElainaData.set("User-Counter", count.total)
        }
        catch (err) {
            warn("Cannot reach Elaina theme backend totalUsers endpoint yet:", err)
        }

        // Check if the user has allowed tracking data
        if (!ElainaData.has("AllowTrackingData")) {
            let text = "Hi!, I'm Elaina.\n\nWould you like to share your infomation so I can write it to my diary?\nIt will including:\n - Your username\n - Your time using this theme\n - Your current language\n\nClick \"Ok\" to allow me, \"Cancel\" to refuse\nYou can switch this option anytime inside theme settings.\n ༼ つ ◕_◕ ༽つ"
            if (window.confirm(text) == true) {
                ElainaData.set("AllowTrackingData", true)
            }
            else ElainaData.set("AllowTrackingData", false)
        }

        // Get the current summoner ID and data
        let userId = ElainaData.get("Summoner-ID")
        let playerData
        try {
            playerData = await (await fetch(`./lol-summoner/v1/summoners/${userId}`)).json()
        }
        catch (err) {
            warn("Cannot load current summoner data for backend init:", err)
            return
        }

        // Send tracking/register request
        try {
            await this.trackStart(userId, playerData["gameName"], playerData["tagLine"])
        }
        catch (err) {
            warn("Failed to send tracking/register request:", err)
        }

        // Get online token
        try {
            await this.getOnlineToken(userId, `${playerData["gameName"]}#${playerData["tagLine"]}`)
        }
        catch (err) {
            warn("Failed to login to Elaina theme backend:", err)
        }

        // Sync user icons
        try {
            await window.syncUserIcons.main()
        }
        catch (err) {
            warn("Failed to run sync user icons after backend init:", err)
        }

        // Set up keep-alive interval
        window.setInterval(() => {
            this.sendKeepAlive(userId, playerData["gameName"], playerData["tagLine"])
        }, 60000);
    }
}
const checkUsing = new CheckUsing()

class StartElainaThemeData {
    main = () => {
        if (elainaThemeDataStarted) return
        elainaThemeDataStarted = true

        importModules.main()
        checkUsing.main().catch(err => {
            error("Failed to initialize Elaina theme backend API:", err)
        })
        window.setTimeout(() => {
            if (ElainaData.get("Dev-mode")) {
                checkDomainExpiry.main()
            }
        }, 10000)
    }
}
const startElainaThemeData = new StartElainaThemeData().main

// Set the server domain in DataStore for use in other parts
ElainaData.set("Elaina-domain-server", serverDomain.domain)

// Start CDN initialization
if (document.readyState === "loading") {
    window.addEventListener("load", startElainaThemeData, { once: true })
}
else {
    startElainaThemeData()
}
