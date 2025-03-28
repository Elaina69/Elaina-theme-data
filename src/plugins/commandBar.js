import { showMessage } from "../plugins/holidayMessages.js"
import { triggerDonateCommand } from "./donate.js"

let datapath = new URL("..", import.meta.url).href

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
        window.writeBackupData()
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
CommandBar.addAction({
    name: "Pandoru",
    legend: "Pandoru",
    tags: ["ElainaTheme","pandoru"],
    group: "ElainaTheme",
    hidden: false,
    perform: async () => {
        let pandoru = ""
        
        try {
            const response = await fetch(`${datapath}config/pandoru.txt`);
            if (!response.ok) {
                throw new Error(`Failed to fetch the file: ${response.statusText}`);
            }
            else pandoru = await response.text();
        } 
        catch (error) {
            console.error("Error:", error);
        }
    
        console.log(pandoru)
    }
})
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