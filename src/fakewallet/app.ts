import * as ethers from "ethers";
import { getLocal, setLocal } from "../helpers/local";
import { getapp } from "./globals";
export async function onqrcodescan(data: any) {
    const ok = await onuripaste(data);
    if (ok) {
        const app = getapp();
        app.toggleScanner();
    }
}
export async function onuripaste(data: any): Promise<boolean> {
    const app = getapp();
    const uri = typeof data === "string" ? data : "";
    switch (true) {
        case uri.startsWith('wc:'):
            {
                await app.setState({ uri });
                await app.initWalletConnect();
                return true;
            }
        case ethers.utils.isAddress(uri):
            {
                const address = ethers.utils.getAddress(uri);
                if (app.state.accounts.includes(address)) {
                    alert('account already exist');
                    return true;
                }
                const localdata = getLocal('__fakewallet__') as string[];
                localdata.push(address);
                setLocal('__fakewallet__', localdata);
                const activeIndex = app.state.accounts.length;
                const accounts = app.state.accounts.concat([address]);
                app.setState({ accounts, address, activeIndex });
                return true;
            }
        case uri.startsWith('ethereum:') && ethers.utils.isAddress(uri.slice(9)):
            {
                const address = ethers.utils.getAddress(uri.slice(9));
                if (app.state.accounts.includes(address)) {
                    alert('account already exist');
                    return true;
                }
                const localdata = getLocal('__fakewallet__') as string[];
                localdata.push(address);
                setLocal('__fakewallet__', localdata);
                const activeIndex = app.state.accounts.length;
                const accounts = app.state.accounts.concat([address]);
                app.setState({ accounts, address, activeIndex });
                return true;
            }
        default:
            return false
    }
}