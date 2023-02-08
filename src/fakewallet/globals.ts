import App from "../App";
let app: App | undefined;
export function setapp(val: App) {
    app = val;
}
export function getapp(): App {
    if (app === undefined) { throw new Error('app not initialized'); }
    return app;
}
