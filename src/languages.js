const BASE_PATH = new URL(".", import.meta.url).href;
const DEFAULT_LOCALE = 'default';

/**
 * Fetches a localized string based on the given key.
 * @param {string} key - The key of the string to fetch.
 * @returns {Promise<string>} The localized string.
 */
async function getString(key) {
    const langCode = document.querySelector("html").lang;
    let localeModule;

    try {
        localeModule = await importLocale(langCode);
    } catch (error) {
        localeModule = await importLocale(DEFAULT_LOCALE);
    }

    let result = localeModule[key];
    if (!result) {
        console.warn(`Missing translation for key: ${key}`);
    }

    return result || key;
}

/**
 * Imports a locale module based on the given language code.
 * @param {string} langCode - The language code to import.
 * @returns {Promise<Object>} The imported locale module.
 */
async function importLocale(langCode) {
    const module = await import(`${BASE_PATH}locales/${langCode}.js`);
    return module.default;
}

// Expose getString globally
window.getString = getString;

export default getString;