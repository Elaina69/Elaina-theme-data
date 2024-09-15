import * as observer from "../utils/observer.js"
import list from "../config/champsBgList.js"

let datapath = new URL("..", import.meta.url).href
let bgInterval

window.setInterval(()=>{
	let thumbnail = document.getElementsByClassName("champion-thumbnail")
	for (let i = 0; i < thumbnail.length; i++) {
		let name = document.getElementsByClassName("champion-name")
        for(let j = 0; j < list.length; j++) {
            if (name[i].innerText == list[j]["default_name"]){
                thumbnail[i].querySelector(".champion-image").setAttribute("src", `${datapath}Assets/Champs/${list[j]["image_preview"]}`)
                name[i].innerText = list[j]["replace_name"]
            }
        }
	}
},200)

observer.subscribeToElementCreation(".lockup-champion-name",(element)=>{
	bgInterval = window.setInterval(()=>{
        for(let j = 0; j < list.length; j++) {
            if (element.textContent.replace(/\n\s*/g, '') == list[j]["default_name"]) {
                let a = document.querySelector("lol-uikit-section[section-id='cdp_overview'] .cdp-backdrop-img")
                let b = document.querySelector("lol-uikit-section[section-id='cdp_progression'] .cdp-backdrop-img")
                a.setAttribute("src", `${datapath}assets/champs/${list[j]["image"]}`)
                b.setAttribute("src", `${datapath}assets/champs/${list[j]["image"]}`)
                element.textContent = list[j]["replace_name"]
                a.textCss
            }
        }
	},100)
})
observer.subscribeToElementDeletion(".lockup-champion-name",(element)=>{window.clearInterval(bgInterval)})