let datapath = new URL("..", import.meta.url).href
let eConsole = "%c ElainaV3 "
let eCss = "color: #ffffff; background-color: #f77fbe"

import ChampsP from "../configs/ChampionsPrices.js"
import lang from "../configs/Language.js"

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
   CheckBox: (text, ID, boxID, check, confirm) => {
      const container = document.createElement("div")
      const origin = document.createElement("lol-uikit-flat-checkbox")
      const checkbox = document.createElement("input")
      const label = document.createElement("label")
      const none = document.createElement("div")

      origin.setAttribute("class",'')
      origin.id = ID

      checkbox.type = "checkbox"
      checkbox.id = boxID
      checkbox.onclick = check
      checkbox.setAttribute("slot", "input")

      label.innerHTML = text
      label.setAttribute("slot", "label")

      if (confirm) {
         container.appendChild(origin)
         origin.appendChild(checkbox)
         origin.appendChild(label)

         return container
      }
      else {
         container.appendChild(none)
         return container
      }
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
            UI.Image("Logo.png", "plugins-settings-logo")
         ]),
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
            },true
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
               },true
            )
         ]),
         UI.CheckBox(
            `${selectedLang["auto_accept_button"]}`,'autoacceptbutton','autoacceptbuttonbox',
            ()=>{
               let autoacceptbuttonel = document.getElementById("autoacceptbutton")
               let autoacceptbuttonbox = document.getElementById("autoacceptbuttonbox")
         
               if (DataStore.get("auto_accept_button")) {
                  autoacceptbuttonel.removeAttribute("class")
                  autoacceptbuttonbox.checked = false
                  DataStore.set("auto_accept_button", false)
               }
               else {
                  autoacceptbuttonel.setAttribute("class", "checked")
                  autoacceptbuttonbox.checked = true
                  DataStore.set("auto_accept_button", true)
               }
            },true
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["Enable-Invite-Fr"]}`,'invfr','invfrbox',
            ()=>{
               let invfrel = document.getElementById("invfr")
               let invfrbox = document.getElementById("invfrbox")
         
               if (DataStore.get("Enable-Invite-Fr")) {
                  invfrel.removeAttribute("class")
                  invfrbox.checked = false
                  DataStore.set("Enable-Invite-Fr", false)
               }
               else {
                  invfrel.setAttribute("class", "checked")
                  invfrbox.checked = true
                  DataStore.set("Enable-Invite-Fr", true)
               }
            },true
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["Auto-Honor"]}`,'autoHonor','autoHonorbox',
            ()=>{
               let autoHonorel = document.getElementById("autoHonor")
               let autoHonorbox = document.getElementById("autoHonorbox")
         
               if (DataStore.get("Auto-Honor")) {
                  autoHonorel.removeAttribute("class")
                  autoHonorbox.checked = false
                  DataStore.set("Auto-Honor", false)
               }
               else {
                  autoHonorel.setAttribute("class", "checked")
                  autoHonorbox.checked = true
                  DataStore.set("Auto-Honor", true)
               }
            },true
         ),
         document.createElement('br'),
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
            },true
         ),
         document.createElement('br'),
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
               },true
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
               },true
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
               },true
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
            },true
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
         UI.Dropdown(DataStore.get("queueList"), "Gamemode", `${selectedLang["Gamemode"]}`, "description", "queueId"),
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
            },true
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
               },true
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
               },true
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
               },true
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
               },true
            ),
            UI.Label(`${selectedLang["status-delay"]}`),
            UI.Input("status-delay"),
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
               },true
            ),
            document.createElement('br'),
            UI.Input("Spoof-name"),
         ]),
         UI.CheckBox(
            `${selectedLang["Debug-mode"]}`,'debug','debugbox',
            ()=>{
               let debugel = document.getElementById("debug")
               let debugbox = document.getElementById("debugbox")
         
               if (DataStore.get("Debug-mode")) {
                  debugel.removeAttribute("class")
                  debugbox.checked = false
                  DataStore.set("Debug-mode", false)
               }
               else {
                  debugel.setAttribute("class", "checked")
                  debugbox.checked = true
                  DataStore.set("Debug-mode", true)
               }
            },true
         ),
         document.createElement('br'),
         UI.CheckBox(
            `${selectedLang["Developer-Mode"]}`,'devbutton','devbuttonbox',
            ()=>{
               let devbuttonel = document.getElementById("devbutton")
               let devbuttonbox = document.getElementById("devbuttonbox")
         
               if (DataStore.get("Dev-mode")) {
                  devbuttonel.removeAttribute("class")
                  devbuttonbox.checked = false
                  DataStore.set("Dev-mode", false)
               }
               else {
                  devbuttonel.setAttribute("class", "checked")
                  devbuttonbox.checked = true
                  DataStore.set("Dev-mode", true)
                  window.alert(
                     "You just turned on developer mode \nIf you are not a developer, please turn it off right now \nOtherwise the whole theme will not work properly"
                  )
               }
            },DataStore.get("Dev-button")
         ),
         document.createElement('br'),
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
   },true
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
   function tickcheck (Data, el, checkbox) {
      let element = document.getElementById(el)
      let box = document.getElementById(checkbox)
      if (Data && element.getAttribute("class") == "") {
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
            const panel = document.querySelector('div.lol-settings-options > lol-uikit-scrollable.plugins_settings')
            if (panel && mutations.some((record) => Array.from(record.addedNodes).includes(panel))) {
               injectSettings(panel)
               const check = setInterval (()=>{
                  if (document.getElementById("Info")) {
                     clearInterval(check)
                     try {
                        let origin = document.querySelector(".plugins-settings-logo")
                        origin.addEventListener("click", ()=> {
                           DataStore.set(`${"Active-dev-button"}`, DataStore.get(`${"Active-dev-button"}`) + 1)
                           if (DataStore.get(`${"Active-dev-button"}`) == 20) {
                              DataStore.set(`${"Dev-button"}`, true)
                              console.log(eConsole+"%c Developer mode button has appeared !",eCss,"")
                           }
                           else if (DataStore.get(`${"Active-dev-button"}`) > 20) {
                              console.log(eConsole+"%c You already become developer !",eCss,"")
                           }
                        })
                     }
                     catch{}
                     if (DataStore.get("Dev-button")) {
                        tickcheck(DataStore.get("Dev-mode"), "devbutton", "devbuttonbox")
                     }
                     //tickcheck(DataStore.get(""), el, box)
                     tickcheck(DataStore.get("Enable-Invite-Fr"), 'invfr', "invfrbox")
                     tickcheck(DataStore.get("Auto-Honor"), "autoHonor", "autoHonorbox")
                     tickcheck(DataStore.get("Debug-mode"), "debug", "debugbox")
                     tickcheck(DataStore.get("Custom-profile-hover"), "cusprf", "cusprfbox")
                     tickcheck(DataStore.get("Custom-mastery-score"), "cusmastery", "cusmasterybox")
                     tickcheck(DataStore.get("Custom-challenge-crystal"), "cuschalcry", "cuschalcrybox")
                     tickcheck(DataStore.get("Name-Spoofer"), "namespf", "namespfbox")
                     tickcheck(DataStore.get("aram-only"), "Aram only", "Aram only checkbox")
                     tickcheck(DataStore.get("Old-League-Loader-Settings"), "oldll", "oldllbox")
                     tickcheck(DataStore.get("Auto-Find-Queue"), "autoq", "autoqbox")
                     tickcheck(DataStore.get("Custom-Status"), "cussta", "cusstabox")
                     tickcheck(DataStore.get("April fool` joke"), "_1_4", "_1_4box")
                     //tickcheck(DataStore.get("Merry-Christmas"), "MC", "MCbox")
                     tickcheck(DataStore.get("loot-helper"), "lh", "lhbox")
                     tickcheck(DataStore.get("buy-all-champs"), "byc", "bycbox")
                     tickcheck(DataStore.get("Custom-rank"), "cusrankhover", "cusrankhoverbox")
                     tickcheck(DataStore.get("auto_accept_button"), "autoacceptbutton", "autoacceptbuttonbox")
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