let routines = []
function routineAddCallback(callback, target) {
	routines.push({ "callback": callback, "targets": target })
}

async function InviteAll () {
    let LCUfetch = await fetch('/lol-chat/v1/friends')
    let friendslist = await LCUfetch.json()
    let Invited = 0

    let fakerun = new Promise(async () => { //uhh....
        setTimeout(() => {if (true) {}})
    })
    Toast.promise(fakerun, {
        loading: 'Inviting all...',
        success: "",
        error: ""
    })

    for(let i = 0; i < friendslist.length ; i++) {
        let summonerID = friendslist[i]["summonerId"]
        let availability = friendslist[i]["availability"]

        if (DataStore.get("frGroupName") == friendslist[i]["groupName"]) {
            let invite = await fetch("/lol-lobby/v2/lobby/invitations",{
                method: 'POST',
                headers: {"content-type": "application/json"},
                body: JSON.stringify([{"toSummonerId": summonerID}])
            })
            if (invite.status == 200 && availability != "offline" && availability != "dnd" && availability != "mobile") {Invited++}
        }
    }

    Toast.success(`Invited ${Invited} friends`)
}

let addInviteAllButton = async () => {
	if (document.querySelector(".lobby-header-buttons-container") != null) {
        let LCUfetch = await fetch('/lol-chat/v1/friends')
        let friendslist = await LCUfetch.json()
        let origin = []

        for(let i = 0; i < friendslist.length ; i++) {
            origin.push(friendslist[i]["groupName"])
        }
        let groupList = [...new Set(origin)]

        const mainDiv = document.createElement("div")
        mainDiv.id = "inviteAllDiv"
        mainDiv.style.display = "flex"

        let button = document.createElement("lol-uikit-flat-button")
        button.textContent = "Invite all"
        button.onclick = async () => {InviteAll()}

        let div = document.createElement("div")
        div.classList.add("Dropdown-div")

        let dropdown = document.createElement("lol-uikit-framed-dropdown")
        dropdown.classList.add("lol-settings-general-dropdown")
        dropdown.style.marginRight = "10px"
        dropdown.style.width = "198px"

        div.append(dropdown)

        for (let i = 0; i < groupList.length; i++) {
            let opt = groupList[i]
            let el = document.createElement("lol-uikit-dropdown-option")
            el.setAttribute("slot", "lol-uikit-dropdown-option")
            el.innerText = opt
            el.onclick = () => {
                DataStore.set("frGroupName", opt)
            }
            if (DataStore.get("frGroupName") == opt) {
                el.setAttribute("selected", "true")
            }
            dropdown.appendChild(el)
        }

        mainDiv.append(div,button)

        let gameBar = document.querySelector(".lobby-header-buttons-container")
            if (!document.querySelector("#inviteAllDiv")) {
                gameBar.insertBefore(mainDiv, gameBar.children[1])
            }
	}
}

window.addEventListener('load', () => {
    window.setInterval(() => {
		routines.forEach(routine => {
			routine.callback()
		})
	}, 1000)
	routineAddCallback(addInviteAllButton, ["v2-header-component.ember-view"])
})