import { warn, log } from "./utils/themeLog.js";

const BASE_PATH = new URL(".", import.meta.url).href;
let knownLocale = false
let getStringTime = 0
/**
 * Imports a locale module based on the given language code.
 * @param {string} langCode - The language code to import.
 * @returns {Promise<Object>} The imported locale module.
 */
async function importLocale(langCode) {
    const module = await import(`${BASE_PATH}locales/${langCode}.js`);
    return module.default;
}

async function haveLocaleFile(langCode) {
    try {
        await importLocale(langCode)
        return true
    } 
    catch {
        return false
    }
}

/**
 * Fetches a localized string based on the given key.
 * @param {string} key - The key of the string to fetch.
 * @returns {Promise<string>} The localized string.
 */
async function getString(key) {
    const lang = document.querySelector("html").lang;
    let localeModule

    if (await haveLocaleFile(lang)) {
        localeModule = await importLocale(lang)
        knownLocale = true
    }
    else {
        localeModule = await importLocale('default')
        knownLocale = false
    }
    
    if (getStringTime == 0) {
        if (knownLocale) log("Current locale:", lang)
        else log("Current locale:", 'default')
    }
    
    let result = localeModule[key];

    getStringTime += 1

    if (!result) {
        warn(`Missing translation for key: ${key}`);
        return key
    }

    return result
}

// Export getString globally
window.getString = getString;

export default getString;