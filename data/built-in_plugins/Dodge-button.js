import lang from "../configs/Language.js"

async function exitClient(){
    await fetch("/process-control/v1/process/quit",
        {method:"POST"}
    )
}

async function dodgeQueue(){
    await fetch('/lol-login/v1/session/invoke?destination=lcdsServiceProxy&method=call&args=["","teambuilder-draft","quitV2",""]',
        {body:'["","teambuilder-draft","quitV2",""]',method:"POST"}
    )
}

function generateDodgeAndExitButton(t){
    const e=document.createElement("div"),
          o=document.createElement("div")
    
        o.setAttribute("class","dodge-button-container"),
        o.setAttribute("style","position: absolute;right: 0px;bottom: 57px;display: flex;align-items: flex-end;"),

        e.setAttribute("class","quit-button ember-view"),
        e.setAttribute("onclick","window.dodgeQueue()"),
        e.setAttribute("id","dodgeButton")

    const d=document.createElement("lol-uikit-flat-button");


//___________________________________________________________________________//
        const langCode = document.querySelector("html").lang;
        const langMap = lang.langlist
        const selectedLang = lang[langMap[langCode] || "EN"];

        d.innerHTML = selectedLang["dodge"];
//___________________________________________________________________________//
        
        
        e.appendChild(d),
        o.appendChild(e),

    t.parentNode.insertBefore(o,t)
}

import utils from '../_utils.js';

window.exitClient=exitClient,
window.dodgeQueue=dodgeQueue;

let addDodgeAndExitButtonObserver=t=>{
    "ChampSelect"==utils.phase&&document.querySelector(".bottom-right-buttons")&&!document.querySelector(".dodge-button-container")&&generateDodgeAndExitButton(
        document.querySelector(".bottom-right-buttons")
    )
};

window.addEventListener("load",()=>{
    utils.routineAddCallback(addDodgeAndExitButtonObserver,["bottom-right-buttons"])
});