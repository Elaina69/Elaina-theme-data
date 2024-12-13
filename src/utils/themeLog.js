const CONSOLE_STYLE = {
    prefix: '%c Elaina ',
    css: 'color: #ffffff; background-color: #f77fbe'
};

export const log = (message, ...args) => console.log(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);
export const warn = (message, ...args) => console.warn(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);
export const error = (message, ...args) => console.error(CONSOLE_STYLE.prefix + '%c ' + message, CONSOLE_STYLE.css, '', ...args);