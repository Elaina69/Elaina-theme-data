import getString from '../languages.js'

let datapath = new URL("..", import.meta.url).href

if (!DataStore.has("seconds1")) {
	DataStore.set("seconds1",0)
	DataStore.set("minutes1",0)
	DataStore.set("hours1",0)
}

let s = DataStore.get("seconds1")
let m = DataStore.get("minutes1")
let h = DataStore.get("hours1")

async function createMenu(root) {
	let close = await getString('l.close')
	let donate_line1 = await getString("donate-firstline")
	let donate_line2 = await getString("donate-secondline")
	let donate_line3 = await getString("donate-thirdline")
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
									<h5 class="Elaina-Update" style="text-align: center">${donate_line1}</p>
									<hr class="heading-spacer" />
									<hr class="heading-spacer" />
									<p class="Elaina-Update" style="text-align: center">${donate_line2}</p>
									<p class="Elaina-Update" style="text-align: center">${donate_line3}</p>
									<div id="donate">
										<a href="https://ko-fi.com/elainadacatto" target="_blank" id="kofi">
											<img src="${datapath}assets/icon/ko-fi.webp" class="donate"></img>
										</a>
										<a href="https://www.paypal.com/paypalme/ElainaDaCattoRiel" target="_blank" id="paypal">
											<img src="${datapath}assets/icon/paypal.png" class="donate"></img>
										</a>
										<a href="https://me.momo.vn/elainadacatto" target="_blank" id="momo">
											<img src="${datapath}assets/icon/momo.svg" class="donate"></img>
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

export function triggerDonateCommand() {
	let s_temp = DataStore.get("seconds1")
	let m_temp = DataStore.get("minutes1")
	let h_temp = DataStore.get("hours1")

    s = 59
	m = 59
	h = 0

	window.setTimeout (()=> {
		s = s_temp
		m = m_temp
		h = h_temp

		DataStore.set("hours1",h)
		DataStore.set("minutes1",m)
		DataStore.set("seconds1",s)
	},1000)
}

function onlineTime() {
	window.setInterval(()=>{
		try {
			s = s + 1

			if (s >= 60) {
				m = m + 1
				s = 0
				DataStore.set("minutes1",m)
				DataStore.set("seconds1",s)
			}

			if (m >= 60) {
				h = h + 1
				m = 0
				s = 0
				DataStore.set("hours1",h)
				DataStore.set("minutes1",m)
				DataStore.set("seconds1",s)
			}
			
			document.querySelector("span.friend-header").innerHTML = DataStore.get("hide-theme-usage-time")? "" : checkTime(h)+":"+checkTime(m)+":"+checkTime(s)

			if ((h == 1 && m == 0 && s == 0) || (h == 24 && m == 0 && s == 0)) {
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