//using this to load the image if low speed internet
import imageLinks from "../config/images.js"
import { log, error } from "../utils/themeLog.js"

class PreloadImages {
    constructor() {
        this._container = this._createContainer();
        this._loadImages();
        this._scheduleAppend();
    }

    _createContainer() {
        const container = document.createElement("div");
        container.hidden = true;
        container.id = "preload_images";
        return container;
    }

    _loadImages() {
        imageLinks.forEach(link => {
            const img = document.createElement("img");
            img.setAttribute("src", link);
            this._container.appendChild(img);
        });
    }

    _scheduleAppend() {
        window.setTimeout(() => {
            try {
                log("Adding preload image css...");
                document.body.prepend(this._container);
            } 
            catch (err) { 
                error("Can not add preload Image css.", err);
            }
        }, 10000);
    }
}

new PreloadImages();