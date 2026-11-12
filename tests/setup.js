// The data package runs inside the League client and uses `window` plus globals the theme
// provides (ElainaData, Toast, ...). Tests run in plain Node: `window` is the global object,
// and each test sets the globals it needs.
globalThis.window ??= globalThis;
