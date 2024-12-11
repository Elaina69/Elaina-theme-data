//using this to load the image if low speed internet
import imageLinks from "../config/images.js"

const origin = document.createElement("div");
origin.hidden = true
origin.id = "preload_images"

imageLinks.forEach(link => {
    const img = document.createElement("img");
    img.setAttribute("src", link);
    origin.appendChild(img);
});

const body = document.querySelector("body")

try {
    body.append(origin)
} catch { console.log("Can not add preload Image css.")}