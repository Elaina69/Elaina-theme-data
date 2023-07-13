///*
import update from './configs/Version'
if (!DataStore.has(`Update-${update}`)) {
	DataStore.set(`Update-${update}`, true)
}
if (DataStore.get(`Update-${update}`)) {
	window.alert(
		// Add this ""+"\n"+

		`ElainaV3 Update ${update}`+"\n"+
		"- Fix Custom rank (again)"+"\n"+
		"- Add custom runes page backgrounds"+"\n"+
		"- Update Auto queue list"+"\n"+
		"- Update Css"+"\n"+
		"- Add Dev mode (turn on; DataStore.set(\"Dev-mode\", true) )"+"\n"+
		""+"\n"+
		"You must download update version from github to get newest function"+"\n"+
		""+"\n"+
		"Sorry for this inconvenience"+"\n"
	)
	DataStore.set(`Update-${update}`, false)
}
//*/