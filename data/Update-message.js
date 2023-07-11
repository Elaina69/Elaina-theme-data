///*
import update from './configs/Version'
if (!DataStore.has(`Update-${update}`)) {
	DataStore.set(`Update-${update}`, true)
}
if (DataStore.get(`Update-${update}`)) {
	window.alert(
		// Add this ""+"\n"+

		`ElainaV3 Update ${update}`+"\n"+
		"- Update to V3"+"\n"+
		"- Using npm unpkg instead raw.githack (more stable than V2)"+"\n"+
		"- Separate data folder"+"\n"+
		"- Now you can change css file by ur self again"+"\n"+
		"- Add zh-CN"+"\n"
	)
	DataStore.set(`Update-${update}`, false)
}
//*/