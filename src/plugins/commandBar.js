//import pandoru from "../configs/pandoru.txt?raw"

CommandBar.addAction({
    name: "Show Donate popup",
    legend: "",
    tags: ["ElainaTheme","donate","popup","show"],
    group: "ElainaTheme",
    hidden: false,
    perform: () => {
        let a = DataStore.get("seconds1")
        let c = DataStore.get("minutes1")
        let e = DataStore.get("hours1")

        DataStore.set("seconds1",59)
		DataStore.set("minutes1",59)
		DataStore.set("hours1",0)

        window.setTimeout(()=>{
            DataStore.set("seconds1",a+1)
            DataStore.set("minutes1",c)
            DataStore.set("hours1",e)
        },1000)
    }
})
CommandBar.addAction({
    name: "Backup datastore",
    legend: "",
    tags: ["ElainaTheme","backup","datastore"],
    group: "ElainaTheme",
    hidden: false,
    perform: () => {
        writeBackupData()
    }
})
// CommandBar.addAction({
//     name: "Pandoru",
//     legend: "Pandoru",
//     tags: ["ElainaTheme","pandoru"],
//     group: "ElainaTheme",
//     hidden: false,
//     perform: () => {
//         console.log(pandoru)
//     }
// })
/*
CommandBar.addAction({
    name: "",
    legend: "",
    tags: ["ElainaTheme"],
    group: "ElainaTheme",
    hidden: false,
    perform: () => {}
})
*/