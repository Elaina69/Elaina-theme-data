class ImportCDNModules {
    constructor () {
        this.moduleList = [
            `./src/update/updateMessage.js`,
            `./src/importupdate.js`,
            `./src/plugins/watermark.js`,
            `./src/plugins/donate.js`,
            `./src/plugins/holidayMessages.js`,
            `./src/plugins/commandBar.js`,
            `./src/plugins/keyCombines.js`,
            `./src/plugins/preloadImg.js`
        ];
    }

    main () {
        this.moduleList.forEach(module => import(module));
    }
}

new ImportCDNModules().main()