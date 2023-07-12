///*
import update from './configs/Version'
if (!DataStore.has(`Update-${update}`)) {
	DataStore.set(`Update-${update}`, true)
}
if (DataStore.get(`Update-${update}`)) {
	window.alert(
		// Add this ""+"\n"+

		`ElainaV3 Update ${update}`+"\n"+
		"- Fix Custom status"+"\n"+
		"- Fix Custom rank (hover card)"+"\n"+
		"- Fix Custom font"+"\n"+
		"- Fix Random skin plugins"+"\n"+
		"- Fix Loot helper plugins"+"\n"+
		"- Fix Mute audio button"+"\n"+
		"- Update Old LL settings"+"\n"
	)
	DataStore.set(`Update-${update}`, false)
}
//*/