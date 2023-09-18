///*
import update from './configs/Version.js'
import lang from "./configs/Language.js"

if (!DataStore.has(`Update-${update}`)) {
	DataStore.set(`Update-${update}`, true)
}
if (DataStore.get(`Update-${update}`)) {
	// window.alert(

	// 	"This update already installed"+"\n"+
	// 	"You don't have to do anything"+"\n"

	// 	"You must download update version from github to get newest function"+"\n"+
	// 	"If not, your theme still can run probably without new one"+"\n"+
	// 	"Sorry for this inconvenience"+"\n"

	async function createLoaderMenu(root) {
		const langCode = document.querySelector("html").lang;
		const langMap = lang.langlist
		const _t = lang[langMap[langCode] || "EN"];
		const { Component, jsx, render } = await import('//esm.run/nano-jsx')
		
		class LoaderMenu extends Component {
			render() {
				return jsx/*html*/`
					<div class="modal" style="position: absolute; inset: 0px; z-index: 8500;" id="Elaina-Update">
						<lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;"></lol-uikit-full-page-backdrop>
						<div class="dialog-confirm" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;">
							  <lol-uikit-dialog-frame class="dialog-frame" orientation="bottom" close-button="false">
								<div class="dialog-content">
									<lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-small" style="width: 500px;">
										<h5>Elaina_V3 - Update ${update}</h5>
										<hr class="heading-spacer" />
										<p class="Elaina-Update">- Add Open assets and configs folder buttons</p>
										<p class="Elaina-Update">- Add Custom regalia banner</p>
										<p class="Elaina-Update">- Add Custom mastery point</p>
										<p class="Elaina-Update">- Separate custom avatar and custom hover card backdrop</p>
										<p class="Elaina-Update">- Custom icon no more change friend's icons</p>
										<p class="Elaina-Update">- Increase refresh time for custom rank</p>
										<p class="Elaina-Update">- Update custom status</p>
										<p class="Elaina-Update">- Update old LeagueLoader settings</p>
										<p class="Elaina-Update">- New Update message tab</p>
										<p class="Elaina-Update">- New pure theme/plugins settings page </p>
										<p class="Elaina-Update">- Remove Custom cursor settings</p>
										<p class="Elaina-Update">- Remove Skin Randomize plugins (Thanks DmitryFisk fot let me using it in old version)</p>
										<p class="Elaina-Update">- Fix datastore problem when first time install Elaina-V3</p>
										<p class="Elaina-Update">- Fix Auto Q plugins</p>
										<p class="Elaina-Update">- Now auto q only work when after game</p>
										<p class="Elaina-Update">- Update Elaina V3 Console log color</p>
										<p class="Elaina-Update"></p>
	
									</lol-uikit-content-block>
								</div>
								<lol-uikit-flat-button-group type="dialog-frame">
									<lol-uikit-flat-button tabindex="1" class="button-decline" onClick=${() => {document.getElementById("Elaina-Update").hidden = true}}>${_t['l.close']}</lol-uikit-flat-button>
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
		window.setInterval(()=>{
			try {
				let closeButton = document.querySelector("#Elaina-Update > div > lol-uikit-dialog-frame").shadowRoot.querySelector("div > div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button")
				closeButton.addEventListener("click", ()=> {document.getElementById("Elaina-Update").hidden = true})
			}catch{}
		})
	})

	DataStore.set(`Update-${update}`, false)
}
//*/