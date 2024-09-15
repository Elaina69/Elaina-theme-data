const cdnModulesToImport = [
    "./src/importupdate.js",
    "./src/languages.js",
    "./src/plugins/watermark.js",
    "./src/plugins/donate.js",
    "./src/plugins/holidayMessages.js",
    "./src/plugins/commandBar.js",
    "./src/plugins/keyCombines.js",
    "./src/plugins/customChampsBg.js",
    "./src/plugins/preloadImg.js"
];

cdnModulesToImport.forEach(module => import(module));