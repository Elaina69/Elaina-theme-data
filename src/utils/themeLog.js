const CONSOLE_STYLE = {
    prefix: '%c Elaina ',
    css: 'color: #ffffff; background-color: #f77fbe'
};

class ThemeLog {
    static log(message, ...args) {
        console.log(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);
    }

    static warn(message, ...args) {
        console.warn(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);
    }

    static error(message, ...args) {
        console.error(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);
    }
}

export const log = ThemeLog.log;
export const warn = ThemeLog.warn;
export const error = ThemeLog.error;
export default ThemeLog;