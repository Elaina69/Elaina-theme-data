//import pandoru from "../configs/pandoru.txt?raw"
import { showMessage } from "../plugins/holidayMessages.js"
import { triggerDonateCommand } from "./donate.js"

CommandBar.addAction({
    name: "Show Donate popup",
    legend: "",
    tags: ["ElainaTheme","donate","popup","show"],
    group: "ElainaTheme",
    hidden: false,
    perform: () => {
        triggerDonateCommand()
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