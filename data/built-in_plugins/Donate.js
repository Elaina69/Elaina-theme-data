let datapath = new URL("..", import.meta.url).href
import lang from "../configs/Language.js"

async function createMenu(root) {
	let langCode = document.querySelector("html").lang;
	let langMap = lang.langlist
	let _t = lang[langMap[langCode] || "EN"];
	const { Component, jsx, render } = await import('//esm.run/nano-jsx')
	
	class LoaderMenu extends Component {
		render() {
			return jsx/*html*/`
				<div class="modal" style="position: absolute; inset: 0px; z-index: 8500;" id="oneHour">
					<lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;"></lol-uikit-full-page-backdrop>
					<div class="dialog-confirm" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;">
						<lol-uikit-dialog-frame class="dialog-frame" orientation="bottom" close-button="false">
							<div class="dialog-content">
								<lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-small" style="width: 500px;">
									<h5 class="Elaina-Update" style="text-align: center">Thanks for using Elaina_V3 !!</p>
									<hr class="heading-spacer" />
									<hr class="heading-spacer" />
									<p class="Elaina-Update" style="text-align: center">If you love ElainaV3, you can support me by sharing this theme to your friend</p>
									<p class="Elaina-Update" style="text-align: center">or donating me</p>
									<div id="donate"></div>
									<p class="Elaina-Update" style="text-align: center">Meow ~~~</p>
								</lol-uikit-content-block>
							</div>
							<lol-uikit-flat-button-group type="dialog-frame">
								<lol-uikit-flat-button tabindex="1" class="button-decline" onClick=${() => {document.getElementById("oneHour").hidden = true}}>${_t['l.close']}</lol-uikit-flat-button>
							</lol-uikit-flat-button-group>
						</lol-uikit-dialog-frame>
					</div>
				</div>
			`
		}
	}
	render(jsx`<${LoaderMenu} />`, root)
}

function onlineTime() {
	if (!DataStore.has("seconds1")) {
		DataStore.set("seconds1",0)
		DataStore.set("seconds2",0)
		DataStore.set("minutes2",0)
		DataStore.set("minutes1",0)
		DataStore.set("hours1",0)
		DataStore.set("hours2",0)
	}

	window.setInterval(()=>{
		try {
			DataStore.set("seconds1",DataStore.get("seconds1")+1)
			if (DataStore.get("seconds1") >= 10) {DataStore.set("seconds2",DataStore.get("seconds2")+1), DataStore.set("seconds1",0)}
			if (DataStore.get("seconds2") >= 6) {DataStore.set("minutes1",DataStore.get("minutes1")+1);DataStore.set("seconds1",0),DataStore.set("seconds2",0)}
			if (DataStore.get("minutes1") >= 10) {DataStore.set("minutes2",DataStore.get("minutes2")+1);DataStore.set("minutes1",0);DataStore.set("seconds1",0),DataStore.set("seconds2",0)}
			if (DataStore.get("minutes2") >= 6) {DataStore.set("hours1",DataStore.get("hours1")+1);DataStore.set("minutes2",0);DataStore.set("minutes1",0);DataStore.set("seconds2",0);DataStore.set("seconds1",0)}
			if (DataStore.get("hours1") >= 10) {DataStore.set("hours2",DataStore.get("hours2")+1);DataStore.set("hours1",0);DataStore.set("minutes2",0);DataStore.set("minutes1",0);DataStore.set("seconds2",0);DataStore.set("seconds1",0)}
			if (DataStore.get("hide-theme-usage-time")) {document.querySelector("span.friend-header").innerHTML = ""}
			else {document.querySelector("span.friend-header").innerHTML = `${DataStore.get("hours2")}${DataStore.get("hours1")}:${DataStore.get("minutes2")}${DataStore.get("minutes1")}:${DataStore.get("seconds2")}${DataStore.get("seconds1")}`}

			if (DataStore.get("hours2") == 0 && DataStore.get("hours1") == 1 && DataStore.get("minutes2") == 0 && DataStore.get("minutes1") == 0 && DataStore.get("seconds2") == 0 && DataStore.get("seconds1") == 0) {
				window.addEventListener("load", async ()=> {
					const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper')
					const root    = document.createElement('div')
					while (!manager()) await new Promise(r => setTimeout(r, 200))
					await createMenu(root)
					manager().prepend(root)
					window.setInterval(()=>{
						try {
							let closeButton = document.querySelector("#oneHour lol-uikit-dialog-frame").shadowRoot.querySelector("div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button")
							closeButton.addEventListener("click", ()=> {document.getElementById("oneHour").hidden = true})

							//Don't ask me why am I doing this .-.
							let donate = document.getElementById("donate")
							let link1 = document.createElement("a")
							let link2 = document.createElement("a")

							let img1 = document.createElement("img")
							let img2 = document.createElement("img")

							link1.setAttribute("href", "https://ko-fi.com/elainadacatto")
							link1.setAttribute("target", "_blank")
							link2.setAttribute("href", "https://me.momo.vn/elainadacatto")
							link2.setAttribute("target", "_blank")
							link2.id = "momo"

							img1.setAttribute("src", `${datapath}assets/Icon/ko-fi.webp`)
							img2.setAttribute("src", `${datapath}assets/Icon/momo.svg`)
							img1.setAttribute("class","donate")
							img2.setAttribute("class","donate")

							if (!document.getElementById("momo")) {
								donate.append(link1)
								donate.append(link2)
								link1.append(img1)
								link2.append(img2)
							}
						}catch{}
					})
				})
			}
		}
		catch {}
	},1000)	
}

window.addEventListener("load",()=> {onlineTime()})