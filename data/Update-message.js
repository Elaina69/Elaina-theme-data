///*
import update from './configs/Version'
if (!DataStore.has(`Update-${update}`)) {
	DataStore.set(`Update-${update}`, true)
}
if (DataStore.get(`Update-${update}`)) {
	window.alert(
		// Add this ""+"\n"+

		`ElainaV3 Update ${update}`+"\n"+
		"- Add 5vs5 practice room button"+"\n"+
		"- Delete unused settings"+"\n"+
		"- Add AI game mode for auto queue"+"\n"+
		"- Add new gamemode for auto queue"+"\n"+
		"- Add ban/pick delay for auto ban/pick"+"\n"+
		""+"\n"+
		"This update already installed"+"\n"+
		""+"\n"+
		"You don't have to do anything"+"\n"
		//"You must download update version from github to get newest function"+"\n"+
		//""+"\n"+
		//"Sorry for this inconvenience"+"\n"
	)
	DataStore.set(`Update-${update}`, false)
}
//*/