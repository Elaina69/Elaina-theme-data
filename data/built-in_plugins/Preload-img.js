import imageLinks from "../configs/images.js"

const origin = document.createElement("div");
origin.hidden = true

imageLinks.forEach(link => {
    const img = document.createElement("img");
    img.setAttribute("src", link);
    origin.appendChild(img);
});

const body = document.querySelector("body")
body.append(origin)