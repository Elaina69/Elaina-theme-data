import { serverDomain } from "./config/serverDomain.js"
import { log, warn } from "./utils/themeLog.js"

function baseUrl() {
    return serverDomain.domain
}

async function register(id, name) {
    const response = await fetch(`${baseUrl()}api/elainatheme/register`, {
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

async function login(id, name) {
    const response = await fetch(`${baseUrl()}api/elainatheme/login`, {
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

async function readBackup(token, id) {
    const response = await fetch(`${baseUrl()}api/elainatheme/data`, {
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

async function writeBackup(token, id, data) {
    if (ElainaData.get("backup-datastore")) {
        let backupDataToCloud = new Promise(async (resolve, reject) => {
            const response = await fetch(`${baseUrl()}api/elainatheme/data`, {
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

async function deleteBackup(token, id) {
    let deleteData = new Promise(async (resolve, reject) => {
        const response = await fetch(`${baseUrl()}api/elainatheme/data`, {
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

async function totalUsers() {
    return (await(await fetch(`${baseUrl()}api/elainatheme/totalUsers`)).json()).total
}

export async function getLatestRelease() {
    let response = await (await fetch(`${baseUrl()}api/elainatheme/latest-release`)).json()
    return response.tag_name
}

async function getImageHash(id, imageType) {
    try {
        const response = await fetch(`${baseUrl()}api/elainatheme/image/getImageHash`, {
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

async function getImage(id, imageType) {
    try {
        const response = await fetch(`${baseUrl()}api/elainatheme/image/getImage`, {
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

async function uploadImage(token, id, imageType, imageFile) {
    const formData = new FormData();
    formData.append("summonerID", id);
    formData.append("type", imageType);
    formData.append("image", imageFile);

    const response = await fetch(`${baseUrl()}api/elainatheme/image/uploadImage`, {
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

async function deleteImage(token, id, imageType) {
    const response = await fetch(`${baseUrl()}api/elainatheme/image/deleteImage`, {
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

async function getFriendsImage(friends) {
    const response = await fetch(`${baseUrl()}api/elainatheme/image/getFriendsImage`, {
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

const elainathemeApi = {
    register,
    login,
    readBackup,
    writeBackup,
    deleteBackup,
    totalUsers,
    getLatestRelease,
    getImage,
    getImageHash,
    uploadImage,
    deleteImage,
    getFriendsImage
}

window.elainathemeApi = elainathemeApi