///*
import update from './configs/Version'
if (!DataStore.has(`Update-${update}`)) {
	DataStore.set(`Update-${update}`, true)
}
if (DataStore.get(`Update-${update}`)) {
	window.alert(
		// Add this ""+"\n"+

		`ElainaV3 Update ${update}`+"\n"+
		""+"\n"+
		""+"\n"+
		""+"\n"+
		""+"\n"+
		""+"\n"+
		"This update already installed"+"\n"+
		""+"\n"+
		"You don't have to do anything"+"\n"
		//"You must download update version from github to get newest function"+"\n"+
		//"If not, your theme still can run probably without new one"+"\n"+
		//""+"\n"+
		//"Sorry for this inconvenience"+"\n"
	)
	DataStore.set(`Update-${update}`, false)
}
//*/