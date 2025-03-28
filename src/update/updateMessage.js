import update from "./update.js"

let autoUpdate = update['auto-update']
let updateType

if (!ElainaData.has(`Update-${update.version}`)) {
	ElainaData.set(`Update-${update.version}`, true)
}

if (!autoUpdate) {updateType = "Manual"}
else if (autoUpdate && ElainaData.get(`Update-${update.version}`)){
	updateType = "Auto"
	let downloadUpdate = new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve()
		}, 3000)
	})
	  
	Toast.promise(downloadUpdate, {
		loading: 'Theme is automatically updating...',
		success: 'Auto update successfully!!',
		error: 'Can not update automatically'
	})
}

if (ElainaData.get(`Force-Update`) && !ElainaData.get("prevent-manual-update")) {
	async function createLoaderMenu(root) {
		const { Component, jsx, render } = await import('//esm.run/nano-jsx')
		let download = await getString('l.download')
		
		class LoaderMenu extends Component {
			render() {
				return jsx/*html*/`
					<div class="modal" style="position: absolute; inset: 0px; z-index: 8500;" id="Elaina-Update">
						<lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;"></lol-uikit-full-page-backdrop>
						<div class="dialog-confirm" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;">
							  <lol-uikit-dialog-frame class="dialog-frame" orientation="bottom" close-button="false">
								<div class="dialog-content">
									<lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-small" style="width: 500px;">
										<h5>Elaina_V4 - ${updateType} Update</h5>
										<hr class="heading-spacer" />
										<hr class="heading-spacer" />
										<p class="Elaina-Update" style="text-align: center">New theme updates are available</p>
										<p class="Elaina-Update" style="text-align: center">You have to update manually to continue using Elaina theme without problems</p>
										<hr class="heading-spacer" />
										<p class="Elaina-Update" style="text-align: center"> Meow ~~~</p>
	
									</lol-uikit-content-block>
								</div>
								<lol-uikit-flat-button-group type="dialog-frame">
									<lol-uikit-flat-button tabindex="1" onClick=${() => {window.open(`https://github.com/Elaina69/Elaina-V4/releases/tag/v${update.version}`,)}}>${download}</lol-uikit-flat-button>
								</lol-uikit-flat-button-group>
							  </lol-uikit-dialog-frame>
						</div>
					</div>
				`
			}
		}
		render(jsx`<${LoaderMenu} />`, root)
	}
	
	window.addEventListener("load", async ()=> {
		const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper')
		const root    = document.createElement('div')
		while (!manager()) await new Promise(r => setTimeout(r, 200))
		await createLoaderMenu(root)
		manager().prepend(root)
		let close = window.setInterval(()=>{
			try {
				let closeButton = document.querySelector("#Elaina-Update lol-uikit-dialog-frame").shadowRoot.querySelector("div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button")
				closeButton.addEventListener("click", ()=> {document.getElementById("Elaina-Update").hidden = true})
			}
			catch {}
			window.clearInterval(close)
		})
	})
}
else if (ElainaData.get(`Update-${update.version}`) && !ElainaData.get(`Force-Update`)) {
	async function createLoaderMenu(root) {
		const { Component, jsx, render } = await import('//esm.run/nano-jsx')
		let close = await getString('l.close')
		
		class LoaderMenu extends Component {
			render() {
				return jsx/*html*/`
					<div class="modal" style="position: absolute; inset: 0px; z-index: 8500;" id="Elaina-Update">
						<lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;"></lol-uikit-full-page-backdrop>
						<div class="dialog-confirm" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;">
							  <lol-uikit-dialog-frame class="dialog-frame" orientation="bottom" close-button="false">
								<div class="dialog-content">
									<lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-small" style="width: 500px;" id="elaina-update-text">
										<h5>Elaina_V4 - ${updateType} Update ${update.version}</h5>
										<hr class="heading-spacer" />
									</lol-uikit-content-block>
								</div>
								<lol-uikit-flat-button-group type="dialog-frame">
									<lol-uikit-flat-button tabindex="1" class="button-decline" onClick=${() => {document.getElementById("Elaina-Update").hidden = true}}>${close}</lol-uikit-flat-button>
								</lol-uikit-flat-button-group>
							  </lol-uikit-dialog-frame>
						</div>
					</div>
				`
			}
		}
		render(jsx`<${LoaderMenu} />`, root)
	}
	
	window.addEventListener("load", async ()=> {
		const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper')
		const root    = document.createElement('div')
		while (!manager()) await new Promise(r => setTimeout(r, 200))
		await createLoaderMenu(root)
		manager().prepend(root)
		let close = window.setInterval(()=>{
			try {
				let closeButton = document.querySelector("#Elaina-Update lol-uikit-dialog-frame").shadowRoot.querySelector("div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button")
				closeButton.addEventListener("click", ()=> {
					document.getElementById("Elaina-Update").hidden = true
				})

				let target = document.getElementById("elaina-update-text")
				if (target) {
					for (let i = 0; i < update["text"].length; i++) {
						let updateText = document.createElement("p")
						updateText.setAttribute("class", "Elaina-Update")
						updateText.textContent = update["text"][i]

						target.appendChild(updateText)
					}
					window.clearInterval(close)
				}
			}
			catch {}
		},1000)
	})

	ElainaData.set(`Update-${update.version}`, false)
}