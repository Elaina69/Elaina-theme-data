import utils from '../utils/utils.js'
import { serverDomain } from '../config/serverDomain.js'

let datapath = new URL("..", import.meta.url).href

function ElainaTrigger() {
    const container0  = document.createElement("div")
    const container2  = document.createElement("div")
	const container3  = document.createElement("div")
	const container4  = document.createElement("div")
	const container5  = document.createElement("div")
	const container6  = document.createElement("div")
	const container7  = document.createElement("div")
	const container8  = document.createElement("div")
	const container9  = document.createElement("div")
	const container10 = document.createElement("div")
	const container11 = document.createElement("div")
	const container12 = document.createElement("div")
	const Greeting    = document.createElement("p")
	const watermark   = document.createElement("div")
	const wtmark      = document.createElement("p")
	const Elaina1ImageDiv = document.createElement("div")
	const Elaina1Image    = document.createElement("img")
	const Elaina1TextDiv  = document.createElement("div")
	const Elaina1Text = document.createElement("p")
	const headpatdiv  = document.createElement("div")
	const headpat     = document.createElement("button")
	const boobsdiv    = document.createElement("div")
	const boobs       = document.createElement("button")
	const answer1     = document.createElement("p")
	const answer2     = document.createElement("p")
	const answer3     = document.createElement("a")
	const goOutSidediv= document.createElement("div")
	const goOutSide   = document.createElement("button")
	const answer4     = document.createElement("p")
	const answer5     = document.createElement("p")
	const mainDiv = document.createElement("div")

	mainDiv.id = "EasterEgg1Div"

	container0.classList.add ("watermark-text")
	container2.classList.add ("Elaina1ImageCon")
	container3.classList.add ("Elaina1TextCon")
    container4.classList.add ("Greeting-con")
	container5.classList.add ("Headpat-con")
	container6.classList.add ("Boobs-con")
	container7.classList.add ("answer1-con")
	container8.classList.add ("answer2-con")
	container9.classList.add ("answer3-con")
	container10.classList.add("goOutSide-con")
	container11.classList.add("answer4-con")
	container12.classList.add("answer5-con")

	function hide() {
		boobs.style.visibility = "hidden"
		headpat.style.visibility = "hidden"
		goOutSide.style.visibility = "hidden"
	}
	function show() {
		boobs.style.visibility = "visible"	
		headpat.style.visibility = "visible"
		goOutSide.style.visibility = "visible"
	}

	wtmark.classList.add("watermark")

	if (ElainaData.get("HideFriendList")) {
		wtmark.style.cssText = `transform: translateX(225px);`
	}
	else {
		wtmark.style.cssText = `transform: translateX(0px);`
	}
	
	const lang = document.querySelector("html").lang;
	const langs = ["ja-JP", "ko-KR", "zh-CN", "zh-TW"];

	wtmark.innerHTML = langs.includes(lang)? "" : wtmark.innerHTML = "By Elaina Da Catto";

	Greeting.classList.add ("Greeting")
	headpat.classList.add  ("Headpat")
	boobs.classList.add    ("Boobs")
	goOutSide.classList.add("GoOutSide")
			
	answer1.id = "answer1"
	answer2.id = "answer2"
	answer3.id = "answer3"
	answer4.id = "answer4"
	answer5.id = "answer5"

	let count = 0;
	let Headpatcount = 0;
	let answer2clicked = 0;
	let showcontainer = document.querySelector("#activity-center")
	showcontainer.appendChild(mainDiv)
	
	if (ElainaData.get("NSFW-Content")) {
		wtmark.addEventListener("click", () => {
			count += 1;
			if (count > 5) {
				wtmark.remove()
				Elaina1Text.classList.add ("Elaina1Text")
				Elaina1Image.classList.add("Elaina1Image")
				Elaina1Image.setAttribute ("src", `${datapath}assets/icon/plugins-icons/elainacb.png`)
				Elaina1Text.innerHTML =  "Huh ?";
	
				function generateGreeting(date) {
					const hour = date.getHours();
					Elaina1Text.innerHTML = " "
					switch (true) {
					  	case hour >= 5 && hour < 12:
							return 'Good morning.You shouldn\'t play game at this time';
					  	case hour >= 12 && hour < 18:
							return 'Good afternoon.It\'s nice time<br>to play game rights ?';
						case hour >= 18 && hour < 24:
							return 'Good evening.You should complete ur work before play game';
						default:
							return 'it\'s late, you should<br>go to bed now.';
					}
				}			  
				function updateCurrentTime() {
				const date = new Date();
				Greeting.innerHTML = generateGreeting(date);
					container4.style.cssText = "bottom: 256px; right: 225px; position: absolute; display: flex"
				}
				(() => {
					const interval = 1000;
					setTimeout(updateCurrentTime, interval);
				})();
				  
				
				mainDiv.append(container10)
				mainDiv.append(container4)
				mainDiv.append(container5)
				mainDiv.append(container6)
	
				container10.append(goOutSidediv)
				container4.append(Greeting)
				container5.append(headpatdiv)
				container6.append(boobsdiv)
				
				goOutSidediv.append(goOutSide)
				headpatdiv.append(headpat)
				boobsdiv.append(boobs)
	
				headpat.addEventListener("click", () => {
					Greeting.innerHTML = " "
					boobs.style.visibility = "visible"
					container3.style.bottom = "260px"
					Headpatcount += 1;
					if (Headpatcount < 15) {
						Elaina1Text.innerHTML = "Meow ~~ !!"
						container3.style.right = "280px"
					}
					if (Headpatcount >= 15) {
						Elaina1Text.innerHTML = "Mo... My hair is burning !!"
						container3.style.right = "225px"
					}
				}, false);
	
				goOutSide.addEventListener("click", () => {
					Greeting.innerHTML = " "
					Elaina1Text.innerHTML = "You should go outside<br>and touch grass"
					container3.style.cssText = "bottom: 250px; right: 241px"
					hide()
	
					mainDiv.append(container11)
					mainDiv.append(container12)
	
					container11.append(answer4)
					container12.append(answer5)
	
					answer4.innerHTML = "\"I still want to play game tho\""
					answer5.innerHTML = "\"I want to go outside with you\""
	
					answer4.addEventListener("click", () => {
						Greeting.innerHTML = " "
						Elaina1Text.innerHTML = "Do what ever you want.<br>I don't care"
						container3.style.cssText = "bottom: 249px; right: 235px"
						show()

						container11.remove()
						container12.remove()
					}, false);
	
					answer5.addEventListener("click", () => {
						Greeting.innerHTML = " "
						Elaina1Text.innerHTML = "I'm so proud of you.You <br>should turn off the client now<br> and hangout with me (≧▽≦)"
						container3.style.cssText = "bottom: 238px; right: 214px"
	
						container11.remove()
						container12.remove()
					}, false);
				}, false);
	
				boobs.addEventListener("click", () => {
					Greeting.innerHTML = " "
					Elaina1Text.innerHTML = "Ehh...where did you<br>just touch !?"
	
					container3.style.cssText = "bottom: 250px; right: 250px"
	
					answer1.innerHTML = "\"N...Nothing !!\""
					answer2.innerHTML = "\"I...I wanna see your boobs\""
					hide()

					answer1.addEventListener("click", () => {
						Greeting.innerHTML = " "
						Elaina1Text.innerHTML = "... You should be careful<br>next time"
						container3.style.cssText = "bottom: 248px; right: 239px"
	
						container7.remove()
						container8.remove()
	
						show()
					}, false);
	
					answer2.addEventListener("click", () => {
						answer2clicked += 1;
						Greeting.innerHTML = " "
						Elaina1Text.innerHTML = "As you wish, my darling ~~"
						container3.style.cssText = "bottom: 260px; right: 219px"
	
						container7.remove()
						container8.remove()
		
						if (answer2clicked > 0) {
							mainDiv.append(container9)
							container9.append(answer3)
	
							Greeting.innerHTML = " "
							answer3.innerHTML = "Take off her clothes"
							answer3.setAttribute("href", `${serverDomain.domain}assets/104731724_p0.png`)
							answer3.setAttribute("target", "_blank")
							answer3.addEventListener("click", () => {
								Elaina1Text.innerHTML = "..."
								container3.style.cssText = "bottom: 260px; right: 325px"
								show()
	
								container9.remove()
							}, false);
						}
					}, false);
	
					mainDiv.append(container7)
					mainDiv.append(container8)
	
					container7.append(answer1)
					container8.append(answer2)
					container9.append(answer3)
	
					
				}, false);
			}
		}, false);
	}

	mainDiv.append(container2)
	mainDiv.append(container0)
	mainDiv.append(container3)

	container0.append(watermark)
	container2.append(Elaina1ImageDiv)
	container3.append(Elaina1TextDiv)

	watermark.append(wtmark)
	Elaina1ImageDiv.append(Elaina1Image)
	Elaina1TextDiv.append(Elaina1Text)
}

function DelElainaTrigger() {
    try {
        document.getElementById("EasterEgg1Div").remove()
    }
    catch {}
}

let addWatermark = async (node) => {      
	const pagename = node.getAttribute("data-screen-name");
	const isOtherPage = !["rcp-fe-lol-navigation-screen", "window-controls", "social", "rcp-fe-lol-activity-center-main"].includes(pagename);
	
	if (pagename === "rcp-fe-lol-home-main" || pagename === "rcp-fe-lol-activity-center-main") {
		if (!document.getElementById("EasterEgg1Div")) {
			DelElainaTrigger()
			ElainaTrigger()
		}
	} 
	else if (isOtherPage && document.getElementById("EasterEgg1Div") && pagename != "rcp-fe-lol-info-hub") {
		DelElainaTrigger()
	}
};

window.addEventListener('load', async ()=> {
	utils.mutationObserverAddCallback(addWatermark, ["screen-root"])
})