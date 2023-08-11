///*
import update from './configs/Version'
if (!DataStore.has(`Update-${update}`)) {
	DataStore.set(`Update-${update}`, true)
}
if (DataStore.get(`Update-${update}`)) {
	window.alert(
		// Add this ""+"\n"+

		`ElainaV3 Update ${update}`+"\n"+
		"- Add Open assets and configs folder buttons"+"\n"+
		"- Add Custom regalia banner"+"\n"+
		"- Add Custom mastery point"+"\n"+
		"- Separate custom avatar and custom hover card backdrop"+"\n"+
		"- Custom icon no more change friend's icons"+"\n"+
		"- Increase refresh time for custom rank"+"\n"+

		""+"\n"+

		/*
		"This update already installed"+"\n"+
		""+"\n"+
		"You don't have to do anything"+"\n"
		/**/

		//*
		"You must download update version from github to get newest function"+"\n"+
		"If not, your theme still can run probably without new one"+"\n"+
		""+"\n"+
		"Sorry for this inconvenience"+"\n"
		/**/
	)
	DataStore.set(`Update-${update}`, false)
}
//*/