import App from "../App";
import RequestDisplay from "./RequestDisplay";
let app: App | undefined;
let requestdisplay: RequestDisplay | undefined;
export function setapp(val: App) {
    app = val;
}
export function getapp(): App {
    if (app === undefined) { throw new Error('app not initialized'); }
    return app;
}
export function setrequestdisplay(val: RequestDisplay) {
    requestdisplay = val;
}
export function getrequestdisplay(): RequestDisplay {
    if (requestdisplay === undefined) { throw new Error('requestdisplay not initialized'); }
    return requestdisplay;
}