import * as ethers from "ethers";
import { getLocal, setLocal } from "../helpers/local";
import { getapp } from "./globals";
export async function onqrcodescan(data: any) {
    const ok = await updateaccounts(data);
    if (ok !== undefined) {
        const app = getapp();
        app.toggleScanner();
    }
    if (ok) { alert('account imported'); }
}
export async function onuripaste(e: any) {
    const data = e.target.value;
    e.target.value = '';
    const ok = await updateaccounts(data);
    if (ok) { alert('account imported'); }
}
export async function updateaccounts(data: any): Promise<boolean | undefined> {
    const app = getapp();
    const uri = typeof data === "string" ? data : "";
    switch (true) {
        case uri.startsWith('wc:'):
            {
                await app.setState({ uri });
                await app.initWalletConnect();
                return false;
            }
        case ethers.utils.isAddress(uri):
            {
                const address = ethers.utils.getAddress(uri);
                if (app.state.accounts.includes(address)) {
                    alert('account already exist');
                    return false;
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
                    return false;
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
            return undefined;
    }
}

export function deleteaccount(): void {
    const app = getapp();
    const address = app.state.address;
    if (app.state.accounts.length < 2) {
        alert('at least 1 account');
        return;
    }
    if (confirm(`are you sure to remove address ${address}?`)) {
        const accounts = app.state.accounts.filter(v => v !== address);
        const localdata = getLocal('__fakewallet__') as string[];
        const newlocaldata = localdata.filter(v => getaddress(v) !== address);
        setLocal('__fakewallet__', newlocaldata);
        app.setState({ accounts, address: accounts[0], activeIndex: 0 });
    }
}

export function getaddress(val: string): string {
    switch (true) {
        case ethers.utils.isAddress(val):
            return ethers.utils.getAddress(val);
        default:
            throw new Error('cannot get address');
    }
}