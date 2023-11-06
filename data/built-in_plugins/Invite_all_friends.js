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

    for(let i = 0; i < friendslist.length; i++) {
        let summonerID = friendslist[i]["summonerId"]
        let availability = friendslist[i]["availability"]

        let invite = await fetch("/lol-lobby/v2/lobby/invitations",{
            method: 'POST',
            headers: {"content-type": "application/json"},
            body: JSON.stringify([{"toSummonerId": summonerID}])
        })
        if (invite.status == 200 && availability != "offline" && availability != "dnd") {Invited++}
    }

    Toast.success(`Invited ${Invited} friends`)
}

let addInviteAllButton = () => {
	if (document.querySelector(".lobby-header-buttons-container") != null && document.getElementById("inviteAllButton") == null) {
        let button = document.createElement("lol-uikit-flat-button")
        button.id = "inviteAllButton"
        button.textContent = "Invite all"
        button.style.marginRight = "10px"
        button.onclick = async () => {InviteAll()}

        let gameBar = document.querySelector(".lobby-header-buttons-container")
            gameBar.insertBefore(button, gameBar.children[1])
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