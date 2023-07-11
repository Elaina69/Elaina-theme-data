/**
 * @name ElainaV3
 * @author Elaina Da Catto
 * @description Elaina theme 3rd Generation for Pengu Loader
 * @link https://github.com/Elaina69
 * @Nyan Meow~~~
 */

let datapath = new URL(".", import.meta.url).href+"data"
async function ImportPlugins(link, name) {
	try  {let res = await fetch(link);if (res.status == 200) {(await (() => import(link))()).default}}
	catch{console.log(`File doesn't exist, can't load ${name}`)}
}
ImportPlugins(`${datapath}/ImportUpdate.js`, "ImportUpdate")
ImportPlugins(`${datapath}/Update-message.js`, "Update-message")
ImportPlugins(`${datapath}/built-in_plugins/Auto-accept.js`, "Auto-accept")
ImportPlugins(`${datapath}/built-in_plugins/Auto-Ban-Pick.js`, "Auto-Ban-Pick")
ImportPlugins(`${datapath}/built-in_plugins/Auto-Find-Queue.js`, "Auto-Find-Queue")
ImportPlugins(`${datapath}/built-in_plugins/Buy-all-champs.js`, "Buy-all-champs")
ImportPlugins(`${datapath}/built-in_plugins/Custom-BE_RP.js`, "Custom-BE_RP")
ImportPlugins(`${datapath}/built-in_plugins/Custom-Rank.js`, "Custom-Rank")
ImportPlugins(`${datapath}/built-in_plugins/Custom-Status.js`, "Custom-Status")
ImportPlugins(`${datapath}/built-in_plugins/Dodge-button.js`, "Dodge-button")
ImportPlugins(`${datapath}/built-in_plugins/FakeIP.js`, "FakeIP")
ImportPlugins(`${datapath}/built-in_plugins/Hide-friendlist.js`, "Hide-friendlist")
ImportPlugins(`${datapath}/built-in_plugins/LootHelper.js`, "LootHelper")
ImportPlugins(`${datapath}/built-in_plugins/NameSpoofer.js`, "NameSpoofer")
ImportPlugins(`${datapath}/built-in_plugins/Offline-mode.js`, "Offline-mode")
ImportPlugins(`${datapath}/built-in_plugins/Old-LL-Settings.js`, "Old-LL-Settings")
ImportPlugins(`${datapath}/built-in_plugins/Pandoru.js`, "Pandoru")
ImportPlugins(`${datapath}/built-in_plugins/profile-utils-master.js`, "profile-utils-master")
ImportPlugins(`${datapath}/built-in_plugins/RandomSkin.js`, "RandomSkin")
ImportPlugins(`${datapath}/built-in_plugins/ThemeSettings.js`, "ThemeSettings")
ImportPlugins(`${datapath}/built-in_plugins/Watermark.js`, "Watermark")