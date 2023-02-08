import App from "../App";
import Sign from "./Sign";
let app: App | undefined;
let sign: Sign | undefined;
export function setapp(val: App) {
    app = val;
}
export function getapp(): App {
    if (app === undefined) { throw new Error('app not initialized'); }
    return app;
}
export function setsign(val: Sign) {
    sign = val;
}
export function getsign(): Sign {
    if (sign === undefined) { throw new Error('sign not initialized'); }
    return sign;
}