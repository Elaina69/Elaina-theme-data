import utils from "./utils/utils.js";
import { serverDomain } from "./config/serverDomain.js";

const DATA_PATH = new URL(".", import.meta.url).href;
const RICK_ROLL_URL = "https://www.youtube.com/watch?v=dQw4w9WgXcQ&pp=ygULcmljayBhc3RsZXk%3D";

const loadStylesheet = () => {
    utils.addStyle(`@import url("${DATA_PATH}assets/styles/importupdate.css")`);
};

const initializeDataStore = () => {
    if (!ElainaData.has("")) {
        ElainaData.set("", true);
    }
};

const isNSFWContentEnabled = () => ElainaData.get("NSFW-Content") ? "inline" : "none";

const createLoaderMenu = async (root) => {
    const { Component, jsx, render } = await import('//esm.run/nano-jsx');
    const close = await getString('l.close');

    class LoaderMenu extends Component {
        render() {
            return jsx/*html*/`
                <div class="modal" style="position: absolute; inset: 0px; z-index: 8500;" id="Holiday">
                    <lol-uikit-full-page-backdrop class="backdrop" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;"></lol-uikit-full-page-backdrop>
                    <div class="dialog-confirm" style="display: flex; align-items: center; justify-content: center; position: absolute; inset: 0px;">
                        <lol-uikit-dialog-frame class="dialog-frame" orientation="bottom" close-button="false">
                            <div class="dialog-content">
                                <lol-uikit-content-block class="app-controls-exit-dialog" type="dialog-small" style="width: 400px;">
                                    <h5>Elaina_V4</h5>
                                    <hr class="heading-spacer" />
                                    <p class="Elaina-Update" style="text-align: center">"Happy 1/4"</p>
                                    <hr class="heading-spacer" />
                                    <hr class="heading-spacer" />
                                    <video src="${serverDomain.domain}assets/1-4.webm" controls style="width: 250px; border: 0px; border-radius: 10px; display: ${isNSFWContentEnabled()}"></video>
                                </lol-uikit-content-block>
                            </div>
                            <lol-uikit-flat-button-group type="dialog-frame">
                                <lol-uikit-flat-button tabindex="1" onClick=${() => this.handleClose()}>${close}</lol-uikit-flat-button>
                            </lol-uikit-flat-button-group>
                        </lol-uikit-dialog-frame>
                    </div>
                </div>
            `;
        }

        handleClose() {
            document.getElementById("Holiday").hidden = true;
            window.open(RICK_ROLL_URL, "_blank");
        }
    }

    render(jsx`<${LoaderMenu} />`, root);
};

const setupCloseButtonListener = () => {
    const intervalId = setInterval(() => {
        try {
            const closeButton = document.querySelector("#Holiday lol-uikit-dialog-frame")
                .shadowRoot.querySelector("div.lol-uikit-dialog-frame-close-button > lol-uikit-close-button");
            closeButton.addEventListener("click", () => {
                document.getElementById("Holiday").hidden = true;
                window.open(RICK_ROLL_URL, "_blank");
            });
            clearInterval(intervalId);
        } 
        catch (error) {
            console.error("Failed to set up close button listener:", error);
        }
    }, 200);
};

const initializeAprilFools = async () => {
    const today = new Date();
    const newdate = `${today.getDate()}/${today.getMonth() + 1}`;

    if (newdate === "1/4" && !ElainaData.has("2nd-1/4")) {
        const manager = () => document.getElementById('lol-uikit-layer-manager-wrapper');
        const root = document.createElement('div');
        
        while (!manager()) {
            await new Promise(resolve => setTimeout(resolve, 200));
        }
        
        await createLoaderMenu(root);
        manager().prepend(root);
        setupCloseButtonListener();
        ElainaData.set("2nd-1/4", true);
    }
};

window.addEventListener("load", () => {
    loadStylesheet();
    initializeDataStore();
    initializeAprilFools();
});