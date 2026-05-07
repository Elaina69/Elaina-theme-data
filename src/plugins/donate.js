const datapath = new URL("..", import.meta.url).href;

class DonatePopup {
	constructor() {
		this.s = 0;
		this.m = 0;
		this.h = 0;
	}

	/**
	 * Loads persisted timer values from ElainaData.
	 * Must be called after ElainaData is fully initialized (after window.load).
	 */
	_loadTime() {
		if (!ElainaData.has("seconds1")) {
			ElainaData.set("seconds1", 0);
			ElainaData.set("minutes1", 0);
			ElainaData.set("hours1", 0);
		}

		this.s = ElainaData.get("seconds1");
		this.m = ElainaData.get("minutes1");
		this.h = ElainaData.get("hours1");
	}

	async _createMenu(root) {
		const close = await getString("l.close");
		const donate_line1 = await getString("donate-firstline");
		const donate_line2 = await getString("donate-secondline");
		const donate_line3 = await getString("donate-thirdline");
		const { Component, jsx, render } = await import("//esm.run/nano-jsx");

		class LoaderMenu extends Component {
			render() {
				return jsx /*html*/ `
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
									<lol-uikit-flat-button tabindex="1" class="button-decline" onClick=${() => {
						document.getElementById("oneHour").hidden = true;
					}}>${close}</lol-uikit-flat-button>
								</lol-uikit-flat-button-group>
							</lol-uikit-dialog-frame>
						</div>
					</div>
				`;
			}
		}
		render(jsx`<${LoaderMenu} />`, root);
	}

	_checkTime(i) {
		return i < 10 ? "0" + i : i;
	}

	triggerDonateCommand = () => {
		const s_temp = ElainaData.get("seconds1");
		const m_temp = ElainaData.get("minutes1");
		const h_temp = ElainaData.get("hours1");

		this.s = 59;
		this.m = 59;
		this.h = 0;

		window.setTimeout(() => {
			this.s = s_temp;
			this.m = m_temp;
			this.h = h_temp;

			ElainaData.set("hours1", this.h);
			ElainaData.set("minutes1", this.m);
			ElainaData.set("seconds1", this.s);
		}, 1000);
	};

	_onlineTime() {
		window.setInterval(() => {
			try {
				this.s += 1;

				if (this.s >= 60) {
					this.m += 1;
					this.s = 0;
				}

				if (this.m >= 60) {
					this.h += 1;
					this.m = 0;
					this.s = 0;
				}

				// Persist timer every 30 seconds to reduce I/O while minimizing data loss
				if (this.s % 30 === 0) {
					ElainaData.set("hours1", this.h);
					ElainaData.set("minutes1", this.m);
					ElainaData.set("seconds1", this.s);
				}

				document.querySelector("span.friend-header").textContent =
					ElainaData.get("hide-theme-usage-time")
						? ""
						: this._checkTime(this.h) +
						":" +
						this._checkTime(this.m) +
						":" +
						this._checkTime(this.s);

				if (
					(this.h == 1 && this.m == 0 && this.s == 0) ||
					(this.h == 24 && this.m == 0 && this.s == 0)
				) {
					window.addEventListener("load", async () => {
						const manager = () =>
							document.getElementById("lol-uikit-layer-manager-wrapper");
						const root = document.createElement("div");
						while (!manager()) await new Promise((r) => setTimeout(r, 200));
						await this._createMenu(root);
						manager().prepend(root);
						let closeButton = document
							.querySelector("#oneHour lol-uikit-dialog-frame")
							.shadowRoot.querySelector(
								"div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button",
							);
						closeButton.addEventListener("click", () => {
							document.getElementById("oneHour").hidden = true;
						});
					});
				}
			} catch { }
		}, 1000);
	}

	main() {
		this._loadTime();
		this._onlineTime();
	}
}

const donatePopup = new DonatePopup();

export function triggerDonateCommand() {
	donatePopup.triggerDonateCommand();
}

window.addEventListener("load", () => {
	donatePopup.main();
});
