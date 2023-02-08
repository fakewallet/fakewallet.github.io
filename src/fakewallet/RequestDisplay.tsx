import * as React from "react";
import Base from "../components/RequestDisplay";
import QRCode from "qrcode.react";
import { setrequestdisplay } from "./globals";
import Button from "../components/Button";
interface ISignState {
    show: boolean;
    request: string;
    type: string;
}
class RequestDisplay extends React.Component<any, any> {
    public state: ISignState;
    constructor(props: any) {
        super(props);
        this.state = { show: true, request: "", type: "" };
    }
    public componentDidMount() {
        setrequestdisplay(this);
    }
    public render() {
        if (this.state.show) {
            const approveRequest = async () => {
                this.setState({ show: false });
                this.props.approveRequest();
            };
            return <Base {...this.props} approveRequest={approveRequest} />
        }
        if (this.state.request.length === 0) {
            return <div
                style={{
                    fontFamily: "monospace",
                    width: "100%",
                    fontSize: "12px",
                    backgroundColor: "#eee",
                    padding: "8px",
                    wordBreak: "break-word",
                    borderRadius: "8px",
                    marginBottom: "10px",
                }}
            >loading ...</div>;
        }
        return <div style={{ marginTop: "30px", width: "100%" }}>
            <div style={{ marginBottom: "10px", width: "100%", textAlign: "center" }}>
                <QRCode value={this.state.request} renderAs="canvas" size={256} />
            </div>
            <div
                style={{
                    fontFamily: "monospace",
                    width: "100%",
                    fontSize: "12px",
                    backgroundColor: "#eee",
                    padding: "8px",
                    wordBreak: "break-word",
                    borderRadius: "8px",
                    marginBottom: "10px",
                }}
            >
                {this.state.request}
            </div>
            <div style={{ width: "100%", textAlign: "center" }}>
                <Button
                    onClick={() => {
                        navigator.clipboard.writeText(this.state.request);
                        alert("request payload copied");
                    }}
                >{`Copy`}</Button>
            </div>
        </div>;
    }
}

export default RequestDisplay;
