import { serverDomain } from "./config/serverDomain.js"
import { log, warn } from "./utils/themeLog.js"

class ElainathemeApi {
    baseUrl() {
        return serverDomain.domain
    }

    async totalUsers() {
        return (await(await fetch(`${this.baseUrl()}api/elainatheme/totalUsers`)).json()).total
    }

    async getLatestRelease() {
        let response = await (await fetch(`${this.baseUrl()}api/elainatheme/latest-release`)).json()
        return response.tag_name
    }



    async register(id, name) {
        const response = await fetch(`${this.baseUrl()}api/elainatheme/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                summonerID: `${id}`,
                summonerName: name
            })
        })
        return await response.json()
    }

    async login(id, name) {
        const response = await fetch(`${this.baseUrl()}api/elainatheme/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
                summonerID: `${id}`,
                summonerName: name
            })
        })
        return await response.json()
    }



    async readBackup(token, id) {
        const response = await fetch(`${this.baseUrl()}api/elainatheme/data`, {
            method: 'POST',
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                summonerID: `${id}`,
                type: "GET",
            })
        })
        let result = await response.json()
        return result
    }

    async writeBackup(token, id, data) {
        if (ElainaData.get("backup-datastore")) {
            let backupDataToCloud = new Promise(async (resolve, reject) => {
                const response = await fetch(`${this.baseUrl()}api/elainatheme/data`, {
                    method: 'POST',
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        summonerID: `${id}`,
                        type: "BACKUP",
                        data: data
                    })
                })
                let result = await response.json()
    
                if (result.success) {
                    log("Backup successfully.")
                    resolve()
                }
                else {
                    log("Backup failed.")
                    reject()
                }
            })
          
            Toast.promise(backupDataToCloud, {
                loading: 'Backing up settings to cloud...',
                success: 'Backup successfully!!',
                error: 'Backup failed.'
            })
        }
        else Toast.error("You have to turn on cloud backup first!!")
    }

    async deleteBackup(token, id) {
        let deleteData = new Promise(async (resolve, reject) => {
            const response = await fetch(`${this.baseUrl()}api/elainatheme/data`, {
                method: 'POST',
                headers: {
                    "Authorization": token,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    summonerID: `${id}`,
                    type: "DELETE"
                })
            })
            let result = await response.json()

            if (result.success) {
                log("Delete backup successfully.")
                resolve()
            }
            else {
                warn("Delete backup failed.")
                reject()
            }
        })
      
        Toast.promise(deleteData, {
            loading: 'Deleting file...',
            success: 'Delete backup successfully!!',
            error: 'Delete backup failed.'
        })
    }



    async getImage(id, imageType) {
        try {
            const response = await fetch(`${this.baseUrl()}api/elainatheme/image/getImage`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    summonerID: `${id}`,
                    type: imageType
                })
            })
            if (!response.ok) {
                return null
            }

            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (err) {
            warn(`getImage failed: ${err.message}`)
            return null
        }
    }

    async getImageHash(id, imageType) {
        try {
            const response = await fetch(`${this.baseUrl()}api/elainatheme/image/getImageHash`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    summonerID: `${id}`,
                    type: imageType
                })
            })
            if (!response.ok) return null

            const result = await response.json()
            return result.hash || null
        } catch (err) {
            warn(`getImageHash failed: ${err.message}`)
            return null
        }
    }

    async getImageHashes(id, imageTypes) {
        try {
            const response = await fetch(`${this.baseUrl()}api/elainatheme/image/getImageHashes`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    summonerID: `${id}`,
                    types: imageTypes
                })
            })
            if (!response.ok) return null

            const result = await response.json()
            return result.hashes || null
        } catch (err) {
            warn(`getImageHashes failed: ${err.message}`)
            return null
        }
    }

    async getFriendsImage(friends) {
        const response = await fetch(`${this.baseUrl()}api/elainatheme/image/getFriendsImage`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                friendsList: friends
            })
        })

        if (!response.ok) {
            warn(`Failed to get friends image: ${response.status}`)
            return []
        }

        let result = await response.json()
        return Array.isArray(result) ? result : []
    }

    async syncFriendsIcons(friends, localHashes) {
        try {
            const response = await fetch(`${this.baseUrl()}api/elainatheme/image/syncFriendsIcons`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    friendsList: friends,
                    localHashes: localHashes || {}
                })
            })

            if (!response.ok) {
                warn(`Failed to sync friends icons: ${response.status}`)
                return null
            }

            const result = await response.json()
            return Array.isArray(result) ? result : []
        } catch (err) {
            warn(`syncFriendsIcons failed: ${err.message}`)
            return null
        }
    }



    async uploadImage(token, id, imageType, imageFile) {
        const formData = new FormData();
        formData.append("summonerID", id);
        formData.append("type", imageType);
        formData.append("image", imageFile);

        const response = await fetch(`${this.baseUrl()}api/elainatheme/image/uploadImage`, {
            method: 'POST',
            headers: {
                "Authorization": token
            },
            body: formData
        });

        const result = await response.json();

        if (result.success) {
            log("Image uploaded successfully");
        } else {
            warn("Image upload failed.");
        }
    }

    async deleteImage(token, id, imageType) {
        const response = await fetch(`${this.baseUrl()}api/elainatheme/image/deleteImage`, {
            method: 'POST',
            headers: {
                "Authorization": token,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                summonerID: `${id}`,
                type: imageType
            })
        })
        let result = await response.json()

        if (result.success) {
            log("Delete image successfully.")
        }
        else {
            warn("Delete image failed.")
        }
    }
}

const elainathemeApi = new ElainathemeApi()

window.elainathemeApi = elainathemeApi

export const getLatestRelease = elainathemeApi.getLatestRelease.bind(elainathemeApi)
