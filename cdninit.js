import {Settings} from "./data/Plugins/Settings.js"
import {AutoQueue} from "./data/Plugins/Auto-Find-Queue.js"

export function Cdninit(context) {
    Settings(context)
	AutoQueue(context)
}