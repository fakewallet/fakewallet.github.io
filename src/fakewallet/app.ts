export async function onqrcodescan(app: any, data: any) {
    const ok = await onuripaste(app, data);
    if (ok) {
        app.toggleScanner();
    }
}
export async function onuripaste(app: any, data: any): Promise<boolean> {
    const uri = typeof data === "string" ? data : "";
    if (uri) {
        await app.setState({ uri });
        await app.initWalletConnect();
        return true;
    }
    return false;
}