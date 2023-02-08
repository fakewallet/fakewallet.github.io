import { IAppConfig } from "../helpers/types";
import { getLocal, setLocal } from "../helpers/local";
export function loadconfig(def: IAppConfig): IAppConfig {
    const localdata = getLocal('__fakewallet__') as string[];
    const defaddr = '0x000000000000000000000000000000000000dEaD';
    if (localdata && localdata.length) {
        def.numberOfAccounts = localdata.length;
    } else {
        setLocal('__fakewallet__', [defaddr])
        def.numberOfAccounts = 0;
    }
    return def;
}