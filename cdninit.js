import {Settings} from "./src/plugins/settings.js"
import {AutoQueue} from "./src/plugins/autoQueue.js"
import {skipHonor} from "./src/plugins/skipHonor.js"

export function Cdninit(context) {
    Settings(context)
	AutoQueue(context)
    skipHonor(context)
}