import * as ethers from "ethers";
interface App {
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
            // TODO
            console.log('address');
            return false
        default:
            return false
    }
}