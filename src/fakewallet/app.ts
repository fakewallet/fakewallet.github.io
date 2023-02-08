import * as ethers from "ethers";
import { IAppState } from "../App";
interface App {
    state: IAppState;
    toggleScanner(): void;
    setState(data: any): void;
    initWalletConnect(): void;
}
export async function onqrcodescan(app: App, data: any) {
    const ok = await onuripaste(app, data);
    if (ok) {
        app.toggleScanner();
    }
}
export async function onuripaste(app: App, data: any): Promise<boolean> {
    const uri = typeof data === "string" ? data : "";
    switch (true) {
        case uri.startsWith('wc:'):
            await app.setState({ uri });
            await app.initWalletConnect();
            return true;
        case ethers.utils.isAddress(uri):
            const address = ethers.utils.getAddress(uri);
            if (app.state.accounts.includes(address)) {
                console.log('account already exist');
                return true;
            }
            const accounts = app.state.accounts.concat([address]);
            app.setState({ accounts, address });
            return true;
        default:
            return false
    }
}