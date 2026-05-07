import { log } from "../utils/themeLog.js";

class KeyCombines {
    constructor() {
        this._init();
    }

    _init() {
        window.addEventListener("keydown", async (event) => {
            const key = event.key;

            if (event.ctrlKey && key == "p") {
                window.openPluginsFolder(`${ElainaData.get("Plugin-folder-name")}`)
            }
            if (key == "F1") {
                CommandBar.show()
            }
            if ((event.ctrlKey && key == "s") || (event.altKey && key == "F4")) {
                window.writeBackupData()
            }
            if (event.key === 'Tab') {
                event.preventDefault()
                log("Tab key is disable!");
            }
        })
    }
}

new KeyCombines();