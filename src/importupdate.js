import utils from "./utils/utils.js";

const DATA_PATH = new URL(".", import.meta.url).href;

class Main {
    constructor() {
        this._runWhenReady(() => {
            this._loadStylesheet();
            this._initializeDataStore();
        });
    }

    _runWhenReady(callback) {
        if (document.readyState === "loading") {
            window.addEventListener("load", callback, { once: true });
            return;
        }

        callback();
    }

    _loadStylesheet() {
        utils.addStyle(`@import url("${DATA_PATH}assets/styles/importupdate.css")`);
    }

    _initializeDataStore() {
        if (!ElainaData.has("")) {
            ElainaData.set("", true);
        }
    }
}

new Main();
