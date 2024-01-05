window.addEventListener("keydown", async (event)=>{
    let key = event.key
    if (event.ctrlKey && key=="p") {
        window.openPluginsFolder(`${DataStore.get("Plugin-folder-name")}`)
    }
    if (key=="F1") {
        CommandBar.show()
    }
    if (key=="F5") {
        window.restartClient()
    }
})