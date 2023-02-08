import { IAppConfig } from "../helpers/types";
import { getLocal, setLocal } from "../helpers/local";
export function loadconfig(def: IAppConfig): IAppConfig {
    const localdata = getLocal('__fakewallet__') as string[];
    const defaddr = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
    if (localdata && localdata.length) {
        def.numberOfAccounts = localdata.length;
    } else {
        setLocal('__fakewallet__', [defaddr]);
        def.numberOfAccounts = 0;
    }
    return def;
}