//import pandoru from "../configs/pandoru.txt?raw"
import { showMessage } from "../plugins/holidayMessages.js"

CommandBar.addAction({
    name: "Show Donate popup",
    legend: "",
    tags: ["ElainaTheme","donate","popup","show"],
    group: "ElainaTheme",
    hidden: false,
    perform: () => {
        let s = DataStore.get("seconds1")
        let m = DataStore.get("minutes1")
        let h = DataStore.get("hours1")

        DataStore.set("seconds1",59)
		DataStore.set("minutes1",59)
		DataStore.set("hours1",0)

        window.setTimeout(()=>{
            DataStore.set("seconds1",s+1)
            DataStore.set("minutes1",m)
            DataStore.set("hours1",h)
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
CommandBar.addAction({
    name: "Show today's message",
    legend: "",
    tags: ["ElainaTheme"],
    group: "ElainaTheme",
    hidden: false,
    perform: () => {
        showMessage(true)
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