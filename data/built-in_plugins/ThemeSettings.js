let datapath = new URL("..", import.meta.url).href

import ChampsP from "../configs/ChampionsPrices.js"
import lang from "../configs/Language.js"
import QueueID from "../configs/QueueID.js"

const UI = {
   Row: (id, childs) => {
      const row = document.createElement('div')
      row.classList.add('lol-settings-general-row')
      row.id = id
      if (Array.isArray(childs)) childs.forEach((el) => row.appendChild(el))
      return row
   },
   Label: (text, id) => {
      const label = document.createElement('p')
      label.classList.add('lol-settings-window-size-text')
      label.innerText = text
      label.id = id
      return label
   },
   Image: (image, cls) => {
      const img = document.createElement('img')
      img.setAttribute("src", `${datapath}assets/Icon/${image}`)
      img.classList.add(cls)
      return img
   },
   Link: (text, href, onClick) => {
      const link = document.createElement('p')
      link.classList.add('lol-settings-code-of-conduct-link')
      link.classList.add('lol-settings-window-size-text')

      const a = document.createElement('a')
      a.innerText = text
      a.target = '_blank'
      a.href = href
      a.onclick = onClick || null

      link.append(a)
      return link
   },
   Button: (text, cls, onClk) => {
      const btn = document.createElement('lol-uikit-flat-button-secondary')
      btn.innerText = text
      btn.onclick = onClk
      btn.style.display = 'flex'
      btn.setAttribute('class', cls)
      return btn
   },
   Input: (target) => {
      const origIn = document.createElement('lol-uikit-flat-input')
      const searchbox = document.createElement('input')

      origIn.classList.add(target)
      origIn.style.marginBottom = '12px'

      searchbox.type = 'url'
      searchbox.placeholder = DataStore.get(target)
      searchbox.style.width = '190px'
      searchbox.name = 'name'
      searchbox.oninput = ()=>{
         let input = {
            get value() {
               return searchbox.value
            },
         }
         DataStore.set(target, input.value)
      }
      origIn.appendChild(searchbox)
      return origIn
   },
   CheckBox: (text, ID, boxID, check) => {
      const origin = document.createElement("lol-uikit-flat-checkbox")
      const checkbox = document.createElement("input")
      const label = document.createElement("label")

      origin.setAttribute("class",'')
      origin.id = ID

      checkbox.type = "checkbox"
      checkbox.id = boxID
      checkbox.onclick = check
      checkbox.setAttribute("slot", "input")

      label.innerHTML = text
      label.setAttribute("slot", "label")

      origin.appendChild(checkbox)
      origin.appendChild(label)

      return origin
   },
   Slider: (text, value, target, setValue) => {
      const div        = document.createElement("div")
      const title      = document.createElement("div")
      const row        = document.createElement('div')
      const origin     = document.createElement("lol-uikit-slider")
      const slider     = document.createElement("div")
      const sliderbase = document.createElement("div")

      let audio = document.getElementById(`${target}`)

      row.setAttribute("class", "lol-settings-sound-row-slider")
      title.setAttribute("class", "lol-settings-sound-title")

      origin.setAttribute("class", "lol-settings-slider")
      origin.setAttribute("value", `${value}`* 100)
      origin.setAttribute("percentage", "")
      origin.addEventListener("change", ()=>{
         audio.volume = origin.value / 100;
         DataStore.set(`${setValue}`, origin.value / 100)
         title.innerHTML = `${text}: ${origin.value}`
      })

      title.innerHTML = `${text}: ${value * 100}`

      slider.setAttribute("class", "lol-uikit-slider-wrapper horizontal")
      sliderbase.setAttribute("class", "lol-uikit-slider-base")

      div.appendChild(title)
      div.appendChild(row)
      row.appendChild(origin)
      origin.appendChild(slider)
      slider.appendChild(sliderbase)

      return div
   },
   Dropdown: (list,target,text,name,id) => {
      const origin = document.createElement("div")
      const title  = document.createElement("div")
      const dropdown = document.createElement("lol-uikit-framed-dropdown")

      origin.classList.add("Dropdown-div")
      title.classList.add("lol-settings-window-size-text")
      title.innerHTML = text
      dropdown.classList.add("lol-settings-general-dropdown")
      origin.append(title,dropdown)
      for (let i = 0; i < list[target].length; i++) {
			const opt = list[target][i]
			const el = document.createElement("lol-uikit-dropdown-option")
			el.setAttribute("slot", "lol-uikit-dropdown-option")
			el.innerText = opt[name]
			el.id = opt[id]
			el.onclick = () => {
				DataStore.set(target, opt[id])
			}
			if (DataStore.get(target) == opt[id]) {
				el.setAttribute("selected", "true")
			}
			dropdown.appendChild(el)
		}
      return origin
   },
}

const injectSettings = (panel) => {
   const langCode = document.querySelector("html").lang;
   const langMap = lang.langlist
   const selectedLang = lang[langMap[langCode] || "EN"];
   const rank = {
      "Ranked Queue ID": [
          {"id" : 0, "name": `${selectedLang["Ranked Solo 5vs5"]}`},
          {"id" : 1, "name": `${selectedLang["Ranked Flex Summoner's Rift"]}`},
          {"id" : 2, "name": `${selectedLang["Ranked Flex TT"]}`},
          {"id" : 3, "name": `${selectedLang["Ranked TFT"]}`},
          {"id" : 4, "name": `${selectedLang["Ranked TFT TURBO"]}`},
          {"id" : 5, "name": `${selectedLang["Ranked TFT DOUBLE UP"]}`}
      ],
  
      "Ranked Tier ID": [
          {"id" : 0, "name": `${selectedLang["Iron"]}`},
          {"id" : 1, "name": `${selectedLang["Bronze"]}`},
          {"id" : 2, "name": `${selectedLang["Silver"]}`},
          {"id" : 3, "name": `${selectedLang["Gold"]}`},
          {"id" : 4, "name": `${selectedLang["Platinum"]}`},
          {"id" : 5, "name": `${selectedLang["Diamond"]}`},
          {"id" : 6, "name": `${selectedLang["Emerald"]}`},
          {"id" : 7, "name": `${selectedLang["Master"]}`},
          {"id" : 8, "name": `${selectedLang["Grand-Master"]}`},
          {"id" : 9, "name": `${selectedLang["Challenger"]}`}
      ],
  
      "Ranked Division ID": [
          {"id" : 0, "name": "I"},
          {"id" : 1, "name": "II"},
          {"id" : 2, "name": "III"},
          {"id" : 3, "name": "IV"}
      ]
   }
   const Challengerank = {
      "challengeCrystalLevel": [
         {"id" : 0, "name": `${selectedLang["Iron"]}`},
         {"id" : 1, "name": `${selectedLang["Bronze"]}`},
         {"id" : 2, "name": `${selectedLang["Silver"]}`},
         {"id" : 3, "name": `${selectedLang["Gold"]}`},
         {"id" : 4, "name": `${selectedLang["Platinum"]}`},
         {"id" : 5, "name": `${selectedLang["Diamond"]}`},
         {"id" : 6, "name": `${selectedLang["Emerald"]}`},
         {"id" : 7, "name": `${selectedLang["Master"]}`},
         {"id" : 8, "name": `${selectedLang["Grand-Master"]}`},
         {"id" : 9, "name": `${selectedLang["Challenger"]}`}
     ],
   }
   panel.prepend(
      UI.Row("",[
         UI.Row("Info",[
            UI.Row("Info-div",[
               UI.Link(
                  'ElainaV3',
                  'https://github.com/Elaina69/Elaina-V3'
               ),
               UI.Label(
                  `*${selectedLang["note"]}: ${selectedLang["note-1"]}`
               ),
               UI.Button (`${selectedLang["reload-client"]}`,'reload', ()=>{window.restartClient()}),
            ]),
            UI.Image("Logo.png", "settings-logo")
         ]),
//________________________________________________________________________________________//



//________________________________________________________________________________________//
// Theme Settings
         UI.Label(
            `${selectedLang["theme-settings"]}:`
         ),
         document.createElement('br'),
         UI.Slider(
            selectedLang["wallpaper-volume"],DataStore.get("wallpaper-volume"),"elaina-bg","wallpaper-volume"
         ),
         UI.Slider(
            selectedLang["music-volume"],DataStore.get("audio-volume"),"bg-audio","audio-volume"
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["old-prev/next-button"]}`,"oldpnb","oldpnbbox",
            ()=>{
               let oldpnbel = document.getElementById("oldpnb")
               let oldpnbbox = document.getElementById("oldpnbbox")

               if (DataStore.get("old-prev/next-button")) {
                  oldpnbbox.checked = false
                  DataStore.set("old-prev/next-button", false)
                  oldpnbel.removeAttribute("class")
               }
               else {
                  oldpnbbox.checked = true
                  DataStore.set("old-prev/next-button", true)
                  oldpnbel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["sidebar-transparent"]}`,'sbt','sbtbox',
            ()=>{
               let sbtel = document.getElementById("sbt")
               let sbtbox = document.getElementById("sbtbox")

               if (DataStore.get("Sidebar-Transparent")) {
                  sbtbox.checked = false
                  DataStore.set("Sidebar-Transparent", false)
                  sbtel.removeAttribute("class")
               }
               else {
                  sbtbox.checked = true
                  DataStore.set("Sidebar-Transparent", true)
                  sbtel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["settings-dialogs-transparent"]}`,'stdiat','stdiatbox',
            ()=>{
               let stdiatel = document.getElementById("stdiat")
               let stdiatbox = document.getElementById("stdiatbox")

               if (DataStore.get("settings-dialogs-transparent")) {
                  stdiatbox.checked = false
                  DataStore.set("settings-dialogs-transparent", false)
                  stdiatel.removeAttribute("class")
               }
               else {
                  stdiatbox.checked = true
                  DataStore.set("settings-dialogs-transparent", true)
                  stdiatel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["hide-champions-splash-art"]}`,'hidechampart','hidechampartbox',
            ()=>{
               let hidechampartel = document.getElementById("hidechampart")
               let hidechampartbox = document.getElementById("hidechampartbox")

               if (DataStore.get("Hide-Champions-Splash-Art")) {
                  hidechampartbox.checked = false
                  DataStore.set("Hide-Champions-Splash-Art", false)
                  hidechampartel.removeAttribute("class")
               }
               else {
                  hidechampartbox.checked = true
                  DataStore.set("Hide-Champions-Splash-Art", true)
                  hidechampartel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["hide-vertical-lines"]}`,"hidevl","hidevlbox",
            ()=>{
               let hidevlel = document.getElementById("hidevl")
               let hidevlbox = document.getElementById("hidevlbox")

               if (DataStore.get("hide-vertical-lines")) {
                  hidevlbox.checked = false
                  DataStore.set("hide-vertical-lines", false)
                  hidevlel.removeAttribute("class")
               }
               else {
                  hidevlbox.checked = true
                  DataStore.set("hide-vertical-lines", true)
                  hidevlel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["custom-font"]}`,'cusfont','cusfontbox',
            ()=>{
               let cusfontel = document.getElementById("cusfont")
               let cusfontbox = document.getElementById("cusfontbox")

               if (DataStore.get("Custom-Font")) {
                  cusfontbox.checked = false
                  DataStore.set("Custom-Font", false)
                  cusfontel.removeAttribute("class")
               }
               else {
                  cusfontbox.checked = true
                  DataStore.set("Custom-Font", true)
                  cusfontel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.Row("Custom-Curency",[
            UI.Row("custom-rp",[
               UI.CheckBox(
                  `${selectedLang["custom-rp"]}`,'cusrp','cusrpbox',
                  ()=>{
                     let cusrpel = document.getElementById("cusrp")
                     let cusrpbox = document.getElementById("cusrpbox")
      
                     if (DataStore.get("Custom_RP")) {
                        cusrpbox.checked = false
                        DataStore.set("Custom_RP", false)
                        cusrpel.removeAttribute("class")
                     }
                     else {
                        cusrpbox.checked = true
                        DataStore.set("Custom_RP", true)
                        cusrpel.setAttribute("class", "checked")
                     }
                  }
               ),
               document.createElement('br'),
               UI.Input("RP-data")
            ]),
            UI.Row("custom-be",[
               UI.CheckBox(
                  `${selectedLang["custom-be"]}`,'cusbe','cusbebox',
                  ()=>{
                     let cusbeel = document.getElementById("cusbe")
                     let cusbebox = document.getElementById("cusbebox")
      
                     if (DataStore.get("Custom_BE")) {
                        cusbebox.checked = false
                        DataStore.set("Custom_BE", false)
                        cusbeel.removeAttribute("class")
                     }
                     else {
                        cusbebox.checked = true
                        DataStore.set("Custom_BE", true)
                        cusbeel.setAttribute("class", "checked")
                     }
                  }
               ),
               document.createElement('br'),
               UI.Input("BE")
            ])
         ]),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["custom-rank-name"]}`,'cusrankname','cusranknamebox',
            ()=>{
               let cusranknameel = document.getElementById("cusrankname")
               let cusranknamebox = document.getElementById("cusranknamebox")

               if (DataStore.get("Custom-Rank-Name")) {
                  cusranknamebox.checked = false
                  DataStore.set("Custom-Rank-Name", false)
                  cusranknameel.removeAttribute("class")
               }
               else {
                  cusranknamebox.checked = true
                  DataStore.set("Custom-Rank-Name", true)
                  cusranknameel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.Input("Rank-line1"),
         UI.Input("Rank-line2"),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["animate-loading"]}`,'aniload','aniloadbox',
            ()=>{
               let aniloadel = document.getElementById("aniload")
               let aniloadbox = document.getElementById("aniloadbox")

               if (DataStore.get("Animate-Loading")) {
                  aniloadbox.checked = false
                  DataStore.set("Animate-Loading", false)
                  aniloadel.removeAttribute("class")
               }
               else {
                  aniloadbox.checked = true
                  DataStore.set("Animate-Loading", true)
                  aniloadel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["custom-icon"]}`,'cusicon','cusiconbox',
            ()=>{
               let cusiconel = document.getElementById("cusicon")
               let cusiconbox = document.getElementById("cusiconbox")

               if (DataStore.get("Custom-Icon")) {
                  cusiconbox.checked = false
                  DataStore.set("Custom-Icon", false)
                  cusiconel.removeAttribute("class")
               }
               else {
                  cusiconbox.checked = true
                  DataStore.set("Custom-Icon", true)
                  cusiconel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.Row("Custom-icon-list",[
            UI.CheckBox(
               `${selectedLang["custom-avatar"]}`,'cusav','cusavbox',
               ()=>{
                  let cusavel = document.getElementById("cusav")
                  let cusavbox = document.getElementById("cusavbox")
   
                  if (DataStore.get("Custom-Avatar")) {
                     cusavbox.checked = false
                     DataStore.set("Custom-Avatar", false)
                     cusavel.removeAttribute("class")
                  }
                  else {
                     cusavbox.checked = true
                     DataStore.set("Custom-Avatar", true)
                     cusavel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-Border"]}`,'cusbor','cusborbox',
               ()=>{
                  let cusborel = document.getElementById("cusbor")
                  let cusborbox = document.getElementById("cusborbox")
   
                  if (DataStore.get("Custom-Border")) {
                     cusborbox.checked = false
                     DataStore.set("Custom-Border", false)
                     cusborel.removeAttribute("class")
                  }
                  else {
                     cusborbox.checked = true
                     DataStore.set("Custom-Border", true)
                     cusborel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-Regalia-Banner"]}`,'cusregabnr','cusregabnrbox',
               ()=>{
                  let cusregabnrel = document.getElementById("cusregabnr")
                  let cusregabnrbox = document.getElementById("cusregabnrbox")
   
                  if (DataStore.get("Custom-Regalia-Banner")) {
                     cusregabnrbox.checked = false
                     DataStore.set("Custom-Regalia-Banner", false)
                     cusregabnrel.removeAttribute("class")
                  }
                  else {
                     cusregabnrbox.checked = true
                     DataStore.set("Custom-Regalia-Banner", true)
                     cusregabnrel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-Hover-card-backdrop"]}`,'cushvbdrop','cushvbdropbox',
               ()=>{
                  let cushvbdropel = document.getElementById("cushvbdrop")
                  let cushvbdropbox = document.getElementById("cushvbdropbox")
   
                  if (DataStore.get("Custom-Hover-card-backdrop")) {
                     cushvbdropbox.checked = false
                     DataStore.set("Custom-Hover-card-backdrop", false)
                     cushvbdropel.removeAttribute("class")
                  }
                  else {
                     cushvbdropbox.checked = true
                     DataStore.set("Custom-Hover-card-backdrop", true)
                     cushvbdropel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-RP-Icon"]}`,'cusrpi','cusrpibox',
               ()=>{
                  let cusrpiel = document.getElementById("cusrpi")
                  let cusrpibox = document.getElementById("cusrpibox")
   
                  if (DataStore.get("Custom-RP-Icon")) {
                     cusrpibox.checked = false
                     DataStore.set("Custom-RP-Icon", false)
                     cusrpiel.removeAttribute("class")
                  }
                  else {
                     cusrpibox.checked = true
                     DataStore.set("Custom-RP-Icon", true)
                     cusrpiel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-BE-Icon"]}`,'cusbei','cusbeibox',
               ()=>{
                  let cusbeiel = document.getElementById("cusbei")
                  let cusbeibox = document.getElementById("cusbeibox")
   
                  if (DataStore.get("Custom-BE-Icon")) {
                     cusbeibox.checked = false
                     DataStore.set("Custom-BE-Icon", false)
                     cusbeiel.removeAttribute("class")
                  }
                  else {
                     cusbeibox.checked = true
                     DataStore.set("Custom-BE-Icon", true)
                     cusbeiel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-Rank-Icon"]}`,'cusranki','cusrankibox',
               ()=>{
                  let cusrankiel = document.getElementById("cusranki")
                  let cusrankibox = document.getElementById("cusrankibox")
   
                  if (DataStore.get("Custom-Rank-Icon")) {
                     cusrankibox.checked = false
                     DataStore.set("Custom-Rank-Icon", false)
                     cusrankiel.removeAttribute("class")
                  }
                  else {
                     cusrankibox.checked = true
                     DataStore.set("Custom-Rank-Icon", true)
                     cusrankiel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-Emblem"]}`,'cusemi','cusemibox',
               ()=>{
                  let cusemiel = document.getElementById("cusemi")
                  let cusemibox = document.getElementById("cusemibox")
   
                  if (DataStore.get("Custom-Emblem")) {
                     cusemibox.checked = false
                     DataStore.set("Custom-Emblem", false)
                     cusemiel.removeAttribute("class")
                  }
                  else {
                     cusemibox.checked = true
                     DataStore.set("Custom-Emblem", true)
                     cusemiel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-Clash-banner"]}`,'cusclassb','cusclassbbox',
               ()=>{
                  let cusclassbel = document.getElementById("cusclassb")
                  let cusclassbbox = document.getElementById("cusclassbbox")
   
                  if (DataStore.get("Custom-Clash-banner")) {
                     cusclassbbox.checked = false
                     DataStore.set("Custom-Clash-banner", false)
                     cusclassbel.removeAttribute("class")
                  }
                  else {
                     cusclassbbox.checked = true
                     DataStore.set("Custom-Clash-banner", true)
                     cusclassbel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-Trophy"]}`,'custrophy','custrophybox',
               ()=>{
                  let custrophyel = document.getElementById("custrophy")
                  let custrophybox = document.getElementById("custrophybox")
   
                  if (DataStore.get("Custom-Trophy")) {
                     custrophybox.checked = false
                     DataStore.set("Custom-Trophy", false)
                     custrophyel.removeAttribute("class")
                  }
                  else {
                     custrophybox.checked = true
                     DataStore.set("Custom-Trophy", true)
                     custrophyel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-Ticker"]}`,'custick','custickbox',
               ()=>{
                  let custickel = document.getElementById("custick")
                  let custickbox = document.getElementById("custickbox")
   
                  if (DataStore.get("Custom-Ticker")) {
                     custickbox.checked = false
                     DataStore.set("Custom-Ticker", false)
                     custickel.removeAttribute("class")
                  }
                  else {
                     custickbox.checked = true
                     DataStore.set("Custom-Ticker", true)
                     custickel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br')
         ]),
         UI.CheckBox(
            `${selectedLang["custom-runes-bg"]}`,'rsbg','rsbgbox',
            ()=>{
               let rsbgel = document.getElementById("rsbg")
               let rsbgbox = document.getElementById("rsbgbox")

               if (DataStore.get("Runes-BG")) {
                  rsbgbox.checked = false
                  DataStore.set("Runes-BG", false)
                  rsbgel.removeAttribute("class")
               }
               else {
                  rsbgbox.checked = true
                  DataStore.set("Runes-BG", true)
                  rsbgel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["custom-cursor"]}`,'cuscursor','cuscursorbox',
            ()=>{
               let cuscursorel = document.getElementById("cuscursor")
               let cuscursorbox = document.getElementById("cuscursorbox")

               if (DataStore.get("Custom-Cursor")) {
                  cuscursorbox.checked = false
                  DataStore.set("Custom-Cursor", false)
                  cuscursorel.removeAttribute("class")
               }
               else {
                  cuscursorbox.checked = true
                  DataStore.set("Custom-Cursor", true)
                  cuscursorel.setAttribute("class", "checked")
               }
            }
         ),
         UI.Label(
            `*${selectedLang["note"]}: ${selectedLang["note-2"]}`
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["Hide-linking-settings"]}`,'hidelinkset','hidelinksetbox',
            ()=>{
               let hidelinksetel = document.getElementById("hidelinkset")
               let hidelinksetbox = document.getElementById("hidelinksetbox")

               if (DataStore.get("Hide-linking-settings")) {
                  hidelinksetbox.checked = false
                  DataStore.set("Hide-linking-settings", false)
                  hidelinksetel.removeAttribute("class")
               }
               else {
                  hidelinksetbox.checked = true
                  DataStore.set("Hide-linking-settings", true)
                  hidelinksetel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["Hide-verify-acc"]}`,'hideveriacc','hideveriaccbox',
            ()=>{
               let hideveriaccel = document.getElementById("hideveriacc")
               let hideveriaccbox = document.getElementById("hideveriaccbox")

               if (DataStore.get("Hide-verify-acc")) {
                  hideveriaccbox.checked = false
                  DataStore.set("Hide-verify-acc", false)
                  hideveriaccel.removeAttribute("class")
               }
               else {
                  hideveriaccbox.checked = true
                  DataStore.set("Hide-verify-acc", true)
                  hideveriaccel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["hide-overview"]}`,'hideovertab','hideovertabbox',
            ()=>{
               let hideovertabel = document.getElementById("hideovertab")
               let hideovertabbox = document.getElementById("hideovertabbox")

               if (DataStore.get("hide-overview")) {
                  hideovertabbox.checked = false
                  DataStore.set("hide-overview", false)
                  hideovertabel.removeAttribute("class")
               }
               else {
                  hideovertabbox.checked = true
                  DataStore.set("hide-overview", true)
                  hideovertabel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["hide-merch"]}`,'hidemerchtab','hidemerchtabbox',
            ()=>{
               let hidemerchtabel = document.getElementById("hidemerchtab")
               let hidemerchtabbox = document.getElementById("hidemerchtabbox")

               if (DataStore.get("hide-merch")) {
                  hidemerchtabbox.checked = false
                  DataStore.set("hide-merch", false)
                  hidemerchtabel.removeAttribute("class")
               }
               else {
                  hidemerchtabbox.checked = true
                  DataStore.set("hide-merch", true)
                  hidemerchtabel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["hide-patch-note"]}`,'hidepn','hidepnbox',
            ()=>{
               let hidepnel = document.getElementById("hidepn")
               let hidepnbox = document.getElementById("hidepnbox")

               if (DataStore.get("hide-patch-note")) {
                  hidepnbox.checked = false
                  DataStore.set("hide-patch-note", false)
                  hidepnel.removeAttribute("class")
               }
               else {
                  hidepnbox.checked = true
                  DataStore.set("hide-patch-note", true)
                  hidepnel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["hide-esport"]}`,'hideesptab','hideesptabbox',
            ()=>{
               let hideesptabel = document.getElementById("hideesptab")
               let hideesptabbox = document.getElementById("hideesptabbox")

               if (DataStore.get("hide-esport")) {
                  hideesptabbox.checked = false
                  DataStore.set("hide-esport", false)
                  hideesptabel.removeAttribute("class")
               }
               else {
                  hideesptabbox.checked = true
                  DataStore.set("hide-esport", true)
                  hideesptabel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         document.createElement('br'),
//________________________________________________________________________________________//
         


//________________________________________________________________________________________//
//Plugins Settings
         UI.Label(
            `${selectedLang["plugins-settings"]}`
         ),
         UI.CheckBox(
            `${selectedLang["old-ll-settings"]}`,'oldll','oldllbox',
            ()=>{
               let oldllel = document.getElementById("oldll")
               let oldllbox = document.getElementById("oldllbox")

               if (DataStore.get("Old-League-Loader-Settings")) {
                  oldllbox.checked = false
                  DataStore.set("Old-League-Loader-Settings", false)
                  oldllel.removeAttribute("class")
               }
               else {
                  oldllbox.checked = true
                  DataStore.set("Old-League-Loader-Settings", true)
                  oldllel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.Row("loothelp",[
            UI.CheckBox(
               `${selectedLang["loot-helper"]}`,'lh','lhbox',
               ()=>{
                  let lhel = document.getElementById("lh")
                  let lhbox = document.getElementById("lhbox")

                  if (DataStore.get("loot-helper")) {
                     lhbox.checked = false
                     DataStore.set("loot-helper", false)
                     lhel.removeAttribute("class")
                  }
                  else {
                     lhbox.checked = true
                     DataStore.set("loot-helper", true)
                     lhel.setAttribute("class", "checked")
                  }
               }
            )
         ]),
         UI.CheckBox(
            `${selectedLang["aram-only"]}`, "Aram only", "Aram only checkbox",
            () => {
               let Aramel = document.getElementById("Aram only")
               let Arambox = document.getElementById("Aram only checkbox")

               if (DataStore.get("aram-only")) {
                  Arambox.checked = false
                  DataStore.set("aram-only", false)
                  Aramel.removeAttribute("class")
               }
               else {
                  Arambox.checked = true
                  DataStore.set("aram-only", true)
                  Aramel.setAttribute("class", "checked")
               }
            }
         ),
         document.createElement('br'),
         UI.Row("rdskin",[
            UI.CheckBox(
               `${selectedLang["random-skin"]}`,'rds','rdsbox',
               ()=>{
                  let rdsel = document.getElementById("rds")
                  let rdsbox = document.getElementById("rdsbox")
   
                  if (DataStore.get("random-skin")) {
                     rdsbox.checked = false
                     DataStore.set("random-skin", false)
                     rdsel.removeAttribute("class")
                  }
                  else {
                     rdsbox.checked = true
                     DataStore.set("random-skin", true)
                     rdsel.setAttribute("class", "checked")
                  }
               }
            )
         ]),
         UI.Row("j1_4",[
            UI.CheckBox(
               `${selectedLang["1/4-joke"]}`,'_1_4','_1_4box',
               ()=>{
                  let _1_4el = document.getElementById("_1_4")
                  let _1_4box = document.getElementById("_1_4box")

                  if (DataStore.get("April fool` joke")) {
                     _1_4box.checked = false
                     DataStore.set("April fool` joke", false)
                     _1_4el.removeAttribute("class")
                  }
                  else {
                     _1_4box.checked = true
                     DataStore.set("April fool` joke", true)
                     _1_4el.setAttribute("class", "checked")
                  }
               }
            )
         ]),
         /*UI.Row("pandoru",[
            UI.CheckBox(
               `${selectedLang["Santa"]}`,'MC','MCbox',
               ()=>{
                  let MCel = document.getElementById("MC")
                  let MCbox = document.getElementById("MCbox")
   
                  if (DataStore.get("Merry-Christmas")) {
                     MCbox.checked = false
                     DataStore.set("Merry-Christmas", false)
                     MCel.removeAttribute("class")
                  }
                  else {
                     MCbox.checked = true
                     DataStore.set("Merry-Christmas", true)
                     MCel.setAttribute("class", "checked")
                  }
               }
            )
         ]),*/
         UI.Row("buyallchamp",[
            UI.CheckBox(
               `${selectedLang["buy-all-champs"]}`,'byc','bycbox',
               ()=>{
                  let bycel = document.getElementById("byc")
                  let bycbox = document.getElementById("bycbox")

                  if (DataStore.get("buy-all-champs")) {
                     bycbox.checked = false
                     DataStore.set("buy-all-champs", false)
                     bycel.removeAttribute("class")
                  }
                  else {
                     bycbox.checked = true
                     DataStore.set("buy-all-champs", true)
                     bycel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.Dropdown(ChampsP, "ChampsPrice", `${selectedLang["prices"]}`, "description", "Cost"),
            document.createElement('br')
         ]),
         UI.CheckBox(
            `${selectedLang["auto-find-queue"]}`,'autoq','autoqbox',
            ()=>{
               let autoqel = document.getElementById("autoq")
               let autoqbox = document.getElementById("autoqbox")

               if (DataStore.get("Auto-Find-Queue")) {
                  autoqbox.checked = false
                  DataStore.set("Auto-Find-Queue", false)
                  autoqel.removeAttribute("class")
               }
               else {
                  autoqbox.checked = true
                  DataStore.set("Auto-Find-Queue", true)
                  autoqel.setAttribute("class", "checked")
               }
            }
         ),
         UI.Row("Q-Delay",[
            UI.Row("Create-Delay",[
               UI.Label(`${selectedLang["Create-Delay"]}`, "Create-Delay-Text"),
               UI.Input("Create-Delay"),
            ]),
            UI.Row("Find-Delay",[
               UI.Label(`${selectedLang["Find-Delay"]}`, "Find-Delay-Text"),
               UI.Input("Find-Delay")
            ])
         ]),
         UI.Dropdown(QueueID, "Gamemode", `${selectedLang["Gamemode"]}`, "description", "queueId"),
         document.createElement('br'),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["Custom-profile-hover"]}`,'cusprf','cusprfbox',
            ()=>{
               let cusprfel = document.getElementById("cusprf")
               let cusprfbox = document.getElementById("cusprfbox")
         
               if (DataStore.get("Custom-profile-hover")) {
                  cusprfel.removeAttribute("class")
                  cusprfbox.checked = false
                  DataStore.set("Custom-profile-hover", false)
               }
               else {
                  cusprfel.setAttribute("class", "checked")
                  cusprfbox.checked = true
                  DataStore.set("Custom-profile-hover", true)
               }
            }
         ),
         document.createElement('br'),
         UI.Row("customprf", [
            UI.CheckBox(
               `${selectedLang["Custom-mastery-score"]}`,'cusmastery','cusmasterybox',
               ()=>{
                  let cusmasteryel = document.getElementById("cusmastery")
                  let cusmasterybox = document.getElementById("cusmasterybox")
            
                  if (DataStore.get("Custom-mastery-score")) {
                     cusmasteryel.removeAttribute("class")
                     cusmasterybox.checked = false
                     DataStore.set("Custom-mastery-score", false)
                  }
                  else {
                     cusmasteryel.setAttribute("class", "checked")
                     cusmasterybox.checked = true
                     DataStore.set("Custom-mastery-score", true)
                  }
               }
            ),
            document.createElement('br'),
            UI.Input("Mastery-Score"),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["custom-rank-hover"]}`,'cusrankhover','cusrankhoverbox',
               ()=>{
                  let cusrankhoverel = document.getElementById("cusrankhover")
                  let cusrankhoverbox = document.getElementById("cusrankhoverbox")

                  if (DataStore.get("Custom-rank")) {
                     cusrankhoverbox.checked = false
                     DataStore.set("Custom-rank", false)
                     cusrankhoverel.removeAttribute("class")
                  }
                  else {
                     cusrankhoverbox.checked = true
                     DataStore.set("Custom-rank", true)
                     cusrankhoverel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.Dropdown(rank, "Ranked Queue ID", `${selectedLang["Ranked Queue"]}`, "name", "id"),
            document.createElement('br'),
            UI.Dropdown(rank, "Ranked Tier ID", `${selectedLang["Ranked Tier"]}`, "name", "id"),
            document.createElement('br'),
            UI.Dropdown(rank, "Ranked Division ID", `${selectedLang["Ranked Division"]}`, "name", "id"),
            document.createElement('br'),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["Custom-challenge-crystal"]}`,'cuschalcry','cuschalcrybox',
               ()=>{
                  let cuschalcryel = document.getElementById("cuschalcry")
                  let cuschalcrybox = document.getElementById("cuschalcrybox")
            
                  if (DataStore.get("Custom-challenge-crystal")) {
                     cuschalcryel.removeAttribute("class")
                     cuschalcrybox.checked = false
                     DataStore.set("Custom-challenge-crystal", false)
                  }
                  else {
                     cuschalcryel.setAttribute("class", "checked")
                     cuschalcrybox.checked = true
                     DataStore.set("Custom-challenge-crystal", true)
                  }
               }
            ),
            document.createElement('br'),
            UI.Dropdown(Challengerank, "challengeCrystalLevel", `${selectedLang["challenge-rank"]}`, "name", "id"),
            UI.Label(`${selectedLang["challenge-point"]}`, "challenge-point-Text"),
            UI.Input("Challenge-Points"),
            document.createElement('br'),
            UI.CheckBox(
               `${selectedLang["custom-status"]}`,'cussta','cusstabox',
               ()=>{
                  let cusstael = document.getElementById("cussta")
                  let cusstabox = document.getElementById("cusstabox")

                  if (DataStore.get("Custom-Status")) {
                     cusstabox.checked = false
                     DataStore.set("Custom-Status", false)
                     cusstael.removeAttribute("class")
                  }
                  else {
                     cusstabox.checked = true
                     DataStore.set("Custom-Status", true)
                     cusstael.setAttribute("class", "checked")
                  }
               }
            ),
            UI.Label(`${selectedLang["status-delay"]}`),
            UI.Input("status-delay"),
            UI.Link(
               `${selectedLang["note-3"]} ?`,
               'https://github.com/KebsCS/KBotExt'
            ),
         ]),
         UI.Row("namespoof",[
            UI.CheckBox(
               `${selectedLang["name-spoofer"]}`,'namespf','namespfbox',
               ()=>{
                  let namespfel = document.getElementById("namespf")
                  let namespfbox = document.getElementById("namespfbox")

                  if (DataStore.get("Name-Spoofer")) {
                     namespfbox.checked = false
                     DataStore.set("Name-Spoofer", false)
                     namespfel.removeAttribute("class")
                  }
                  else {
                     namespfbox.checked = true
                     DataStore.set("Name-Spoofer", true)
                     namespfel.setAttribute("class", "checked")
                  }
               }
            ),
            document.createElement('br'),
            UI.Input("Spoof-name"),
            document.createElement('br'),
         ])
      ])
   )
}

/*
UI.CheckBox(
   `${selectedLang[""]}`,'','box',
   ()=>{
      let el = document.getElementById("")
      let box = document.getElementById("box")

      if (DataStore.get("")) {
         el.removeAttribute("class")
         box.checked = false
         DataStore.set("", false)
      }
      else {
         el.setAttribute("class", "checked")
         box.checked = true
         DataStore.set("", true)
      }
   }
),
document.createElement('br'),
*/


window.addEventListener('load', async () => {
   function DeleteEl (target, confirm) {
      try {
         let origin = document.querySelector(target)
         if (confirm) {origin.remove()}
      }
      catch{}
   }
   function tickcheck (Data, el, box) {
      if (Data && el.getAttribute("class") == "") {
         box.checked = true
      }
   }
   const interval = setInterval(() => {
      const manager = document.getElementById(
         'lol-uikit-layer-manager-wrapper'
      )
      if (manager) {
         clearInterval(interval)
         new MutationObserver((mutations) => {
            const panel = document.querySelector('div.lol-settings-options > lol-uikit-scrollable')
            if (panel && mutations.some((record) => Array.from(record.addedNodes).includes(panel))) {
               injectSettings(panel)
               const check = setInterval (()=>{
                  let sbtel = document.getElementById("sbt");
                  let hidechampartel = document.getElementById("hidechampart");
                  let cusfontel = document.getElementById("cusfont");
                  let cusrpel = document.getElementById("cusrp");
                  let cusbeel = document.getElementById("cusbe");
                  let cusranknameel = document.getElementById("cusrankname");
                  let aniloadel = document.getElementById("aniload");
                  let cusavel = document.getElementById("cusav");
                  let cusiconel = document.getElementById("cusicon");
                  let cuscursorel = document.getElementById("cuscursor");
                  let oldllel = document.getElementById("oldll");
                  let Aramel = document.getElementById("Aram only");
                  let autoqel = document.getElementById("autoq");
                  let cusrankhoverel = document.getElementById("cusrankhover");
                  let cusstael = document.getElementById("cussta");
                  let _1_4el = document.getElementById("_1_4");
                  //let MCel = document.getElementById("MC");
                  let lhel = document.getElementById("lh");
                  let stdiatel = document.getElementById("stdiat");
                  let oldpnbel = document.getElementById("oldpnb");
                  let hideveriaccel = document.getElementById("hideveriacc");
                  let hidelinksetel = document.getElementById("hidelinkset");
                  let Arambox = document.getElementById("Aram only checkbox");
                  let sbtbox = document.getElementById("sbtbox");
                  let cusrpbox = document.getElementById("cusrpbox");
                  let hidechampartbox = document.getElementById("hidechampartbox");
                  let cusfontbox = document.getElementById("cusfontbox");
                  let cusbebox = document.getElementById("cusbebox");
                  let cusranknamebox = document.getElementById("cusranknamebox");
                  let aniloadbox = document.getElementById("aniloadbox");
                  let cuscursorbox = document.getElementById("cuscursorbox");
                  let cusavbox = document.getElementById("cusavbox");
                  let cusiconbox = document.getElementById("cusiconbox");
                  let oldllbox = document.getElementById("oldllbox");
                  let cusrankhoverbox = document.getElementById("cusrankhoverbox");
                  let autoqbox = document.getElementById("autoqbox");
                  let cusstabox = document.getElementById("cusstabox");
                  //let MCbox = document.getElementById("MCbox");
                  let _1_4box = document.getElementById("_1_4box");
                  let lhbox = document.getElementById("lhbox");
                  let stdiatbox = document.getElementById("stdiatbox");
                  let oldpnbbox = document.getElementById("oldpnbbox");
                  let hidelinksetbox = document.getElementById("hidelinksetbox");
                  let hideveriaccbox = document.getElementById("hideveriaccbox");
                  let rdsel = document.getElementById("rds");
                  let rdsbox = document.getElementById("rdsbox");
                  let bycel = document.getElementById("byc");
                  let bycbox = document.getElementById("bycbox");
                  let namespfel = document.getElementById("namespf");
                  let namespfbox = document.getElementById("namespfbox");
                  let hidevlel = document.getElementById("hidevl");
                  let hidevlbox = document.getElementById("hidevlbox");
                  let rsbgel = document.getElementById("rsbg")
                  let rsbgbox = document.getElementById("rsbgbox")
                  let cusborel = document.getElementById("cusbor")
                  let cusborbox = document.getElementById("cusborbox")
                  let cusrpiel = document.getElementById("cusrpi")
                  let cusrpibox = document.getElementById("cusrpibox")
                  let cusbeiel = document.getElementById("cusbei")
                  let cusbeibox = document.getElementById("cusbeibox")
                  let cusrankiel = document.getElementById("cusranki")
                  let cusrankibox = document.getElementById("cusrankibox")
                  let cusemiel = document.getElementById("cusemi")
                  let cusemibox = document.getElementById("cusemibox")
                  let cusclassbel = document.getElementById("cusclassb")
                  let cusclassbbox = document.getElementById("cusclassbbox")
                  let custickel = document.getElementById("custick")
                  let custickbox = document.getElementById("custickbox")
                  let custrophyel = document.getElementById("custrophy")
                  let custrophybox = document.getElementById("custrophybox")
                  let hideovertabel = document.getElementById("hideovertab")
                  let hideovertabbox = document.getElementById("hideovertabbox")
                  let hidemerchtabel = document.getElementById("hidemerchtab")
                  let hidemerchtabbox = document.getElementById("hidemerchtabbox")
                  let hideesptabel = document.getElementById("hideesptab")
                  let hideesptabbox = document.getElementById("hideesptabbox")
                  let hidepnel = document.getElementById("hidepn")
                  let hidepnbox = document.getElementById("hidepnbox")
                  let cusregabnrel = document.getElementById("cusregabnr")
                  let cusregabnrbox = document.getElementById("cusregabnrbox")
                  let cushvbdropel = document.getElementById("cushvbdrop")
                  let cushvbdropbox = document.getElementById("cushvbdropbox")
                  let cusprfel = document.getElementById("cusprf")
                  let cusprfbox = document.getElementById("cusprfbox")
                  let cusmasteryel = document.getElementById("cusmastery")
                  let cusmasterybox = document.getElementById("cusmasterybox")
                  let cuschalcryel = document.getElementById("cuschalcry")
                  let cuschalcrybox = document.getElementById("cuschalcrybox")

                  if (document.getElementById("Aram only")) {
                     clearInterval(check)

                     DeleteEl(".lol-settings-account-verification-row.ember-view", DataStore.get("Hide-verify-acc"))
                     DeleteEl(".linking-settings.ember-view", DataStore.get("Hide-linking-settings"))
                     DeleteEl(".vng-publisher-settings.ember-view", DataStore.get("Hide-linking-settings"))

                     //tickcheck(DataStore.get(""), el, box)
                     tickcheck(DataStore.get("Custom-profile-hover"), cusprfel, cusprfbox)
                     tickcheck(DataStore.get("Custom-mastery-score"), cusmasteryel, cusmasterybox)
                     tickcheck(DataStore.get("Custom-challenge-crystal"), cuschalcryel, cuschalcrybox)
                     tickcheck(DataStore.get("Custom-Regalia-Banner"), cusregabnrel, cusregabnrbox)
                     tickcheck(DataStore.get("Custom-Hover-card-backdrop"), cushvbdropel, cushvbdropbox)
                     tickcheck(DataStore.get("hide-overview"), hideovertabel, hideovertabbox)
                     tickcheck(DataStore.get("hide-merch"), hidemerchtabel, hidemerchtabbox)
                     tickcheck(DataStore.get("hide-patch-note"), hidepnel, hidepnbox)
                     tickcheck(DataStore.get("hide-esport"), hideesptabel, hideesptabbox)
                     tickcheck(DataStore.get("Custom-Border"), cusborel, cusborbox)
                     tickcheck(DataStore.get("Custom-RP-Icon"), cusrpiel, cusrpibox)
                     tickcheck(DataStore.get("Custom-BE-Icon"), cusbeiel, cusbeibox)
                     tickcheck(DataStore.get("Custom-Rank-Icon"), cusrankiel, cusrankibox)
                     tickcheck(DataStore.get("Custom-Emblem"), cusemiel, cusemibox)
                     tickcheck(DataStore.get("Custom-Clash-banner"), cusclassbel, cusclassbbox)
                     tickcheck(DataStore.get("Custom-Ticker"), custickel, custickbox)
                     tickcheck(DataStore.get("Custom-Trophy"), custrophyel, custrophybox)
                     tickcheck(DataStore.get("Runes-BG"), rsbgel, rsbgbox)
                     tickcheck(DataStore.get("Name-Spoofer"), namespfel, namespfbox)
                     tickcheck(DataStore.get("hide-vertical-lines"), hidevlel, hidevlbox)
                     tickcheck(DataStore.get("aram-only"), Aramel, Arambox)
                     tickcheck(DataStore.get("Sidebar-Transparent"), sbtel, sbtbox)
                     tickcheck(DataStore.get("Hide-Champions-Splash-Art"), hidechampartel, hidechampartbox)
                     tickcheck(DataStore.get("Custom-Font"), cusfontel, cusfontbox)
                     tickcheck(DataStore.get("Custom_RP"), cusrpel, cusrpbox)
                     tickcheck(DataStore.get("Custom_BE"), cusbeel, cusbebox)
                     tickcheck(DataStore.get("Custom-Rank-Name"), cusranknameel, cusranknamebox)
                     tickcheck(DataStore.get("Animate-Loading"), aniloadel,aniloadbox)
                     tickcheck(DataStore.get("Custom-Avatar"), cusavel, cusavbox)
                     tickcheck(DataStore.get("Custom-Icon"), cusiconel, cusiconbox)
                     tickcheck(DataStore.get("Custom-Cursor"), cuscursorel, cuscursorbox)
                     tickcheck(DataStore.get("Old-League-Loader-Settings"), oldllel, oldllbox)
                     tickcheck(DataStore.get("Auto-Find-Queue"), autoqel, autoqbox)
                     tickcheck(DataStore.get("Custom-Status"), cusstael, cusstabox)
                     tickcheck(DataStore.get("April fool` joke"), _1_4el, _1_4box)
                     //tickcheck(DataStore.get("Merry-Christmas"), MCel, MCbox)
                     tickcheck(DataStore.get("loot-helper"), lhel, lhbox)
                     tickcheck(DataStore.get("settings-dialogs-transparent"), stdiatel, stdiatbox)
                     tickcheck(DataStore.get("old-prev/next-button"), oldpnbel, oldpnbbox)
                     tickcheck(DataStore.get("Hide-linking-settings"), hidelinksetel, hidelinksetbox)
                     tickcheck(DataStore.get("Hide-verify-acc"), hideveriaccel, hideveriaccbox)
                     tickcheck(DataStore.get("random-skin"), rdsel, rdsbox)
                     tickcheck(DataStore.get("buy-all-champs"), bycel, bycbox)
                     tickcheck(DataStore.get("Custom-rank"), cusrankhoverel, cusrankhoverbox)
                  }
               },100)
            }
         }).observe(manager, {
            childList: true,
            subtree: true
         })
      }
   },500)
})