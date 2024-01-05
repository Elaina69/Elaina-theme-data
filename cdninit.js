import {Settings} from "./data/built-in_plugins/Settings.js"
import {AutoQueue} from "./data/built-in_plugins/Auto-Find-Queue.js"

export function Cdninit(context) {
    Settings(context)
	AutoQueue(context)
}