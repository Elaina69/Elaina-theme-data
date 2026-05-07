import { log, warn, error } from "../utils/themeLog.js"

class SyncIcons {
    async _computeFileHash(url) {
        try {
            const response = await fetch(url)
            if (!response.ok) return null

            const buffer = await response.arrayBuffer()
            const hashBuffer = await crypto.subtle.digest('SHA-256', buffer)
            const hashArray = Array.from(new Uint8Array(hashBuffer))
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
        } 
        catch (err) {
            error("Failed to compute file hash:", err)
            return null
        }
    }

    async _shouldUpload(summonerID, iconUrl, iconType) {
        try {
            if (typeof window.elainathemeApi.getImageHash !== 'function') {
                warn("getImageHash function is not available, uploading anyway")
                return true
            }

            const [localHash, serverHash] = await Promise.all([
                this._computeFileHash(iconUrl),
                window.elainathemeApi.getImageHash(summonerID, iconType)
            ])

            if (!localHash) return true
            if (!serverHash) return true

            return localHash !== serverHash
        }
        catch (err) {
            error("Hash comparison failed, uploading anyway:", err)
            return true
        }
    }

    async syncIconsWithHashCheck() {
        if (!ElainaData.get("sync-user-icons")) return

        const summonerID = ElainaData.get("Summoner-ID")
        const token = ElainaData.get("ElainaTheme-Token")

        if (!summonerID || !token) {
            error("Missing summonerID or token, skipping icon sync")
            return
        }

        // Sync friends icons
        await window.Toast.promise(window.syncUserIcons.getFriendsIcons(), {
            loading: 'Syncing friends icons...',
            success: 'Sync complete!',
            error: 'Error while syncing friends icons, check console for more info!'
        })

        // Upload your icons with hash comparison
        const iconFolder = window.syncUserIcons.getIconFolder()
        const icdata = window.syncUserIcons.getIconData()
        const currentBanner = ElainaData.get("CurrentBanner")

        const iconMap = [
            { 
                url: `${iconFolder}${icdata["Avatar"]}`,
                type: "avatar" 
            },
            { 
                url: `${iconFolder}${icdata["Border"]}`,
                type: "border" 
            },
            { 
                url: `${iconFolder}Regalia-Banners/${currentBanner}`,
                type: "banner" 
            },
            { 
                url: `${iconFolder}${icdata["Hover-card"]}`,
                type: "hoverCardBackdrop" 
            },
            { 
                url: `${iconFolder}${icdata["Honor"]}`,
                type: "emblem" 
            }
        ]

        const uploadPromises = iconMap.map(async ({ url, type }) => {
            const needsUpload = await this._shouldUpload(summonerID, url, type)
            if (needsUpload) {
                log(`Icon "${type}" changed, uploading...`)
                await window.syncUserIcons.uploadIcon(url, type)
            }
            else {
                log(`Icon "${type}" unchanged, skipping upload`)
            }
        })

        await Promise.all(uploadPromises)
    }
}

const syncIcons = new SyncIcons();
export const syncIconsWithHashCheck = () => syncIcons.syncIconsWithHashCheck();
