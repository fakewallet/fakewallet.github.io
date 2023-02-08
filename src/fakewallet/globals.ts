import App from "../App";

let app: App | undefined;
let sign: any;

export function setapp(val: App) {
  app = val;
}
export function getapp(): App {
  if (app === undefined) {
    throw new Error("app not initialized");
  }
  return app;
}

export function setsign(val: any) {
  sign = val;
}

export function getsign(): any {
  if (sign === undefined) {
    throw new Error("sign not initialized");
  }
  return sign;
}
