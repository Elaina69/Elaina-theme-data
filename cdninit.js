import { AutoQueue } from "./src/plugins/autoQueue.js"
import { skipHonor } from "./src/plugins/skipHonor.js"

class ImportCDNModules {
    constructor () {
        this.moduleList = [
            `./src/update/updateMessage.js`,
            `./src/importupdate.js`,
            `./src/languages.js`,
            `./src/plugins/watermark.js`,
            `./src/plugins/donate.js`,
            `./src/plugins/holidayMessages.js`,
            `./src/plugins/commandBar.js`,
            `./src/plugins/keyCombines.js`,
            `./src/plugins/customChampsBg.js`,
            `./src/plugins/preloadImg.js`
        ];
    }

    main () {
        this.moduleList.forEach(module => import(module));
    }
}
const importCDNModules = new ImportCDNModules()

export function Cdninit(context) {
    importCDNModules.main()
	AutoQueue(context)
    skipHonor(context)
}