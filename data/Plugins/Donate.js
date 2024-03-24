let datapath = new URL("..", import.meta.url).href

async function createMenu(root) {
	let close = await getString('l.close')
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
									<h5 class="Elaina-Update" style="text-align: center">Thanks for using Elaina theme !!</p>
									<hr class="heading-spacer" />
									<hr class="heading-spacer" />
									<p class="Elaina-Update" style="text-align: center">If you love Elaina theme, you can support me by sharing this theme to your friend</p>
									<p class="Elaina-Update" style="text-align: center">or donating me</p>
									<div id="donate">
										<a href="https://ko-fi.com/elainadacatto" target="_blank" id="kofi">
											<img src="${datapath}Assets/Icon/ko-fi.webp" class="donate"></img>
										</a>
										<a href="https://me.momo.vn/elainadacatto" target="_blank" id="momo">
											<img src="${datapath}Assets/Icon/momo.svg" class="donate"></img>
										</a>
									</div>
									<p class="Elaina-Update" style="text-align: center">Meow ~~~</p>
								</lol-uikit-content-block>
							</div>
							<lol-uikit-flat-button-group type="dialog-frame">
								<lol-uikit-flat-button tabindex="1" class="button-decline" onClick=${() => {document.getElementById("oneHour").hidden = true}}>${close}</lol-uikit-flat-button>
							</lol-uikit-flat-button-group>
						</lol-uikit-dialog-frame>
					</div>
				</div>
			`
		}
	}
	render(jsx`<${LoaderMenu} />`, root)
}

function checkTime(i) {
	if (i < 10) {i = "0" + i}
	return i
}

function onlineTime() {
	if (!DataStore.has("seconds1")) {
		DataStore.set("seconds1",0)
		DataStore.set("minutes1",0)
		DataStore.set("hours1",0)
	}

	window.setInterval(()=>{
		try {
			DataStore.set("seconds1",DataStore.get("seconds1")+1)

			if (DataStore.get("seconds1") >= 60) {
				DataStore.set("minutes1",DataStore.get("minutes1")+1)
				DataStore.set("seconds1",0)
			}
			if (DataStore.get("minutes1") >= 60) {
				DataStore.set("hours1",DataStore.get("hours1")+1)
				DataStore.set("minutes1",0)
				DataStore.set("seconds1",0)
			}
			
			if (DataStore.get("hide-theme-usage-time")) {document.querySelector("span.friend-header").innerHTML = ""}
			else {
				document.querySelector("span.friend-header").innerHTML = checkTime(DataStore.get("hours1"))+":"+checkTime(DataStore.get("minutes1"))+":"+checkTime(DataStore.get("seconds1"))
			}

			if (DataStore.get("hours1") == 1 && DataStore.get("minutes1") == 0 && DataStore.get("seconds1") == 0) {
				window.addEventListener("load", async ()=> {
					const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper')
					const root    = document.createElement('div')
					while (!manager()) await new Promise(r => setTimeout(r, 200))
					await createMenu(root)
					manager().prepend(root)
					let closeButton = document.querySelector("#oneHour lol-uikit-dialog-frame").shadowRoot.querySelector("div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button")
					closeButton.addEventListener("click", ()=> {
						document.getElementById("oneHour").hidden = true
					})
				})
			}
		}
		catch {}
	},1000)	
}

window.addEventListener("load",()=> {onlineTime()})