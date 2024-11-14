const BASE_PATH = new URL(".", import.meta.url).href;

const CONSOLE_STYLE = {
    prefix: '%c Elaina ',
    css: 'color: #ffffff; background-color: #f77fbe'
};

const log = (message, ...args) => console.log(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);
const warn = (message, ...args) => console.warn(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);

/**
 * Imports a locale module based on the given language code.
 * @param {string} langCode - The language code to import.
 * @returns {Promise<Object>} The imported locale module.
 */
async function importLocale(langCode) {
    const module = await import(`${BASE_PATH}locales/${langCode}.js`);
    return module.default;
}

/**
 * Fetches a localized string based on the given key.
 * @param {string} key - The key of the string to fetch.
 * @returns {Promise<string>} The localized string.
 */
async function getString(key) {
    const lang = document.querySelector("html").lang;
    let localeModule

    try {
        localeModule = await importLocale(lang)
    } 
    catch {
        localeModule = await importLocale(`default`)
    }

    let result = localeModule[key];

    if (!result) {
        warn(`Missing translation for key: ${key}`);
        return key
    }

    return result
}

// Expose getString globally
window.getString = getString;

export default getString;