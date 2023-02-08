import * as React from "react";
import QRCode from "qrcode.react";
import { setsign } from "./globals";
import Button from "../components/Button";

interface ISignState {
  hide: boolean;
  request: string;
}
class Sign extends React.Component {
  public state: ISignState;
  constructor(props: any) {
    super(props);
    this.state = { hide: true, request: "" };
  }
  public componentDidMount() {
    setsign(this);
  }
  public render() {
    if (this.state.hide) {
      return <></>;
    }
    return (
      <div style={{ marginTop: "30px", width: "100%" }}>
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
              alert("copy successfully!");
            }}
          >{`Copy`}</Button>
        </div>
      </div>
    );
  }
}

export default Sign;
