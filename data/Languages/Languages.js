let path = new URL(".", import.meta.url).href

async function getString(key) {
    let lang, result
    let langCode = document.querySelector("html").lang

    try {
        lang = (await (() => import(`${path}Locales/${langCode}.js`))()).default
        result = lang[key]
    }
    catch {
        lang = (await (() => import(`${path}Locales/Default.js`))()).default
        result = lang[key]
    }
    return result
}

window.getString = getString

export default getString