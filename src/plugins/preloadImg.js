//using this to load the image if low speed internet
import imageLinks from "../config/images.js"
import { log, error } from "../utils/themeLog.js"

const origin = document.createElement("div");
origin.hidden = true
origin.id = "preload_images"

imageLinks.forEach(link => {
    const img = document.createElement("img");
    img.setAttribute("src", link);
    origin.appendChild(img);
});

window.setTimeout(() => {
    try {
        log("Adding preload image css...")
        document.body.prepend(origin)
    } 
    catch (err) { 
        error("Can not add preload Image css.", err) 
    }
}, 10000)