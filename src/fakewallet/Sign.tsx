import * as React from "react";
import QRCode from "qrcode.react";
import { setsign } from "./globals";
interface ISignState {
    hide: boolean;
    request: string;
}
class Sign extends React.Component {
    public state: ISignState;
    constructor(props: any) {
        super(props);
        this.state = { hide: true, request: '' };
    }
    public componentDidMount() {
        setsign(this);
    }
    public render() {
        if (this.state.hide) { return <></>; }
        return <div style={{ marginTop: "30px", width: "100%" }}>
            <div style={{ width: "100%", textAlign: "center" }}>
                <QRCode value={this.state.request} renderAs="canvas" size={256} />
            </div>
            <code>{this.state.request}</code>
            {/* <SRequestValues>{state.val}</SRequestValues> */}
        </div>;
    }
}

export default Sign;
