///*
let update = "v1.8.1"
if (!DataStore.has(`Update-${update}`)) {
	DataStore.set(`Update-${update}`, true)
}
if (DataStore.get(`Update-${update}`)) {
	window.alert(
		// Add this ""+"\n"+

		`ElainaV2 Update ${update}`+"\n"+
		"- Add \"balance-buff-viewer\" by Nomi"+"\n"+
		"- Update css"+"\n"+
		"- Optimize plugins"+"\n"
	)
	DataStore.set(`Update-${update}`, false)
}
//*/