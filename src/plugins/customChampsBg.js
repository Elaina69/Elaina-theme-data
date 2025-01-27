import * as observer from "../utils/observer.js"
import list from "../config/champsBgList.js"
import { log } from "../utils/themeLog.js";

let datapath = new URL("..", import.meta.url).href
let bgInterval

function updateDefaultSkinThumbnails(selector, img) {
    const elements = document.querySelectorAll(selector);
    elements.forEach(element => {
        const defaultSkinThumbnail = element.querySelector("div");
        if (defaultSkinThumbnail && defaultSkinThumbnail.style.backgroundImage.includes("tile_0")) {
            defaultSkinThumbnail.style.backgroundImage = img;
        }
    });
}

window.setInterval(()=>{
	let thumbnail = document.getElementsByClassName("champion-thumbnail")
    let champSetRow = document.querySelectorAll(".champion-set-row .champion-border")
    let champSelectList = document.querySelectorAll(".champion-grid-champion-thumbnail")

	if (!thumbnail) return
    else {
        for (let i = 0; i < thumbnail.length; i++) {
            let name = document.getElementsByClassName("champion-name")
            for(let j = 0; j < list.length; j++) {
                if (name[i].innerText == list[j]["default_name"]){
                    thumbnail[i].querySelector(".champion-image").setAttribute("src", `${datapath}assets/champs/${list[j]["image_preview"]}`)
                    name[i].innerText = list[j]["replace_name"]
                }
            }
        }
    }

    if (!champSetRow) return
    else {
        for (let i = 0; i < champSetRow.length; i++) {
            for (let j = 0; j < list.length; j++) {
                let img = champSetRow[i].querySelector("img")
                if (img.getAttribute("src").includes(list[j]["default_icon_id"])) {
                    img.setAttribute("src", `${datapath}assets/champs/${list[j]["image_thumbnail"]}`)
                }
            }
        }
    }

    if (!champSelectList) return
    else {
        for (let i = 0; i < champSelectList.length; i++) {
            for (let j = 0; j < list.length; j++) {
                let img = champSelectList[i].querySelector("img")
                if (img.getAttribute("src").includes(list[j]["default_icon_id"])) {
                    img.setAttribute("src", `${datapath}assets/champs/${list[j]["image_thumbnail"]}`)
                }
            }
        }
    }
},200)

observer.subscribeToElementCreation(".lockup-champion-name",(element)=>{
	bgInterval = window.setInterval(()=>{
        for(let j = 0; j < list.length; j++) {
            if (element.textContent.replace(/\n\s*/g, '') == list[j]["default_name"] || element.textContent.replace(/\n\s*/g, '') == list[j]["replace_name"]){
                element.textContent = list[j]["replace_name"]
                element.parentNode.querySelector(".lockup-champion-title").textContent = list[j]["replace_sub_name"]

                let a = document.querySelector("lol-uikit-section[section-id='cdp_overview'] .cdp-backdrop-img")
                let b = document.querySelector("lol-uikit-section[section-id='cdp_progression'] .cdp-backdrop-img")

                a.setAttribute("src", `${datapath}assets/champs/${list[j]["image"]}`)
                a.style.cssText = `left: ${list[j]["css-left"]}`
                b.setAttribute("src", `${datapath}assets/champs/${list[j]["image"]}`)
                b.style.cssText = `left: ${list[j]["css-left"]}`

                let defaultSkin = document.querySelector(".uikit-background-switcher.ember-view > img")
                let skinName = document.querySelector(".champion-skin-name.skin-name")
                if (document.querySelector(".cdp-skins-section.ember-view > lol-uikit-section-controller[selected-item='skin_0']")) {
                    defaultSkin.setAttribute("src", `${datapath}assets/champs/${list[j]["image"]}`)
                    skinName.textContent = list[j]["replace_name"]
                }

                let bio = document.querySelector(".cdp-overview-short-bio")
                if (list[j]["lore"] != "") {
                    bio.innerHTML = list[j]["lore"]
                }

                updateDefaultSkinThumbnails(".carousel-track-container .buffer-wrapper", `url(${datapath}assets/champs/${list[j]["image_thumbnail"]})`);
                updateDefaultSkinThumbnails(".carousel-track-container .thumbnail-wrapper", `url(${datapath}assets/champs/${list[j]["image_thumbnail"]})`);
            }
        }
	}, 100)
})

observer.subscribeToElementDeletion(".lockup-champion-name",(element)=>{
    window.clearInterval(bgInterval)
    log("cleared Interval!")
})