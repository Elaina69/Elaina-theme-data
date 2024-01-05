import pandoru from "../configs/pandoru.txt?raw"

CommandBar.addAction({
    name: "Show Donate popup",
    legend: "",
    tags: ["ElainaV3","donate","popup","show"],
    group: "ElainaV3",
    hidden: false,
    perform: () => {
        let a = DataStore.get("seconds1")
        let b = DataStore.get("seconds2")
        let c = DataStore.get("minutes1")
        let d = DataStore.get("minutes2")
        let e = DataStore.get("hours1")
        let f = DataStore.get("hours2")

        DataStore.set("seconds1",9)
		DataStore.set("seconds2",5)
		DataStore.set("minutes1",9)
        DataStore.set("minutes2",5)
		DataStore.set("hours1",0)
		DataStore.set("hours2",0)

        window.setTimeout(()=>{
            DataStore.set("seconds1",a+1)
            DataStore.set("seconds2",b)
            DataStore.set("minutes1",c)
            DataStore.set("minutes2",d)
            DataStore.set("hours1",e)
            DataStore.set("hours2",f)
        },1000)
    }
})
CommandBar.addAction({
    name: "Pandoru",
    legend: "Pandoru",
    tags: ["ElainaV3","pandoru"],
    group: "ElainaV3",
    hidden: false,
    perform: () => {
        console.log(pandoru)
    }
})
/*
CommandBar.addAction({
    name: "",
    legend: "",
    tags: ["ElainaV3"],
    group: "ElainaV3",
    hidden: false,
    perform: () => {}
})
*/