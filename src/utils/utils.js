/**
 * @author Teisseire117
 * @modifier Elaina Da Catto
 * @version 2.0.0
 * @description Utility class for League of Legends client customization
 */

class Utils {
    constructor() {
        this.pvp_net_id = null;
        this.summoner_id = null;
        this.phase = null;

        this._routines = [];
        this._mutationCallbacks = [];

        this._init();
    }

    addStyle(style) {
        const styleElement = document.createElement('style');
        styleElement.appendChild(document.createTextNode(style));
        document.body.appendChild(styleElement);
    }

    addStyleWithID(id, style) {
        const styleElement = document.createElement('style');
        styleElement.id = id;
        styleElement.appendChild(document.createTextNode(style));
        document.body.appendChild(styleElement);
    }

    addFont(folder, font_id, font_family) {
        const fontStyle = document.createElement('style');
        fontStyle.id = font_id;
        fontStyle.appendChild(document.createTextNode(
            `@font-face {font-family: ${font_family}; src: url(${folder})}`
        ));
        document.body.appendChild(fontStyle);
    }

    CustomCursor(folder, css) {
        const cursor = document.createElement("div");
        cursor.classList.add("cursor");
        cursor.style.background = folder;

        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate3d(calc(${e.clientX}px - 40%), calc(${e.clientY}px - 40%), 0)`;
        });

        document.querySelector("html").appendChild(cursor);
        this.addStyle(css);
    }

    async getSummonerID() {
        const response = await fetch("/lol-summoner/v1/current-summoner");
        const data = await response.json();
        return JSON.parse(data.summonerId);
    }

    async subscribe_endpoint(endpoint, callback) {
        const uri = document.querySelector('link[rel="riot:plugins:websocket"]').href;
        const ws = new WebSocket(uri, 'wamp');

        ws.onopen = () => ws.send(JSON.stringify([5, 'OnJsonApiEvent' + endpoint.replace(/\//g, '_')]));
        ws.onmessage = callback;
    }

    routineAddCallback(callback, target) {
        this._routines.push({ callback, targets: target });
    }

    mutationObserverAddCallback(callback, target) {
        this._mutationCallbacks.push({ callback, targets: target });
    }

    _updateUserPvpNetInfos = async (message) => {
        const data = JSON.parse(message.data)[2].data;
        if (data) {
            this.pvp_net_id = data.id;
            this.summoner_id = data.summonerId;
        }
    }

    _updatePhaseCallback = async (message) => {
        this.phase = JSON.parse(message.data)[2].data;
    }

    _init() {
        window.addEventListener('load', () => {
            this.subscribe_endpoint("/lol-gameflow/v1/gameflow-phase", this._updatePhaseCallback);
            this.subscribe_endpoint("/lol-chat/v1/me", this._updateUserPvpNetInfos);

            setInterval(() => {
                this._routines.forEach(routine => routine.callback());
            }, 1000);

            const observer = new MutationObserver((mutationsList) => {
                for (const mutation of mutationsList) {
                    for (const addedNode of mutation.addedNodes) {
                        if (addedNode.nodeType === Node.ELEMENT_NODE && addedNode.classList) {
                            for (const addedNodeClass of addedNode.classList) {
                                for (const obj of this._mutationCallbacks) {
                                    if (obj.targets.indexOf(addedNodeClass) !== -1 || obj.targets.indexOf("*") !== -1) {
                                        obj.callback(addedNode);
                                    }
                                }
                            }
                        }
                    }
                }
            });

            observer.observe(document, { attributes: true, childList: true, subtree: true });
        });
    }
}

const utils = new Utils();
export default utils;