import { IAppConfig } from "../helpers/types";
import { getLocal, setLocal } from "../helpers/local";
export function loadconfig(def: IAppConfig): IAppConfig {
    const localdata = getLocal('__fakewallet__') as any[];
    if (localdata) {
        def.numberOfAccounts = localdata.length;
    } else {
        setLocal('__fakewallet__', [])
        def.numberOfAccounts = 0;
    }
    return def;
}