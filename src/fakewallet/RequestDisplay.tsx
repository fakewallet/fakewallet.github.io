import * as React from "react";
import Base from "../components/RequestDisplay";
import QRCode from "qrcode.react";
import { setrequestdisplay } from "./globals";
import Button from "../components/Button";
import Input from "../components/Input";
import styled from "styled-components";
import QRCodeScanner, { IQRCodeValidateResponse } from "../components/QRCodeScanner";
interface ISignState {
  show: boolean;
  scanner: boolean;
  request?: string;
  type?: string;
  resolve?: any;
  reject?: any;
}
const SButton = styled(Button)`
  height: 40px;
`;
const SInput = styled(Input)`
  font-size: 14px;
  height: 40px;
`;
class RequestDisplay extends React.Component<any, any> {
  public state: ISignState;
  constructor(props: any) {
    super(props);
    this.state = { show: true, scanner: false };
  }
  public componentDidMount() {
    setrequestdisplay(this);
  }
  public toggleScanner = () => {
    console.log("ACTION", "toggleScanner");
    this.setState({ scanner: !this.state.scanner });
  };

  public onQRCodeValidate = (data: string): IQRCodeValidateResponse => {
    const res: IQRCodeValidateResponse = {
      error: null,
      result: null,
    };
    try {
      res.result = data;
    } catch (error) {
      res.error = error;
    }
    return res;
  };

  public onQRCodeScan = async (data: any) => {
    console.log(data);
    this.state.resolve(data);
  };

  public onURIPaste = async (e: any) => {
    const data = e.target.value;
    console.log(data);
    this.state.resolve(data);
  };

  public onQRCodeError = (error: Error) => {
    throw error;
  };

  public onQRCodeClose = () => this.toggleScanner();

  public render() {
    if (this.state.show) {
      const approveRequest = async () => {
        this.setState({ show: false });
        this.props.approveRequest();
      };
      return <Base {...this.props} approveRequest={approveRequest} />;
    }
    if (!this.state.request) {
      return (
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
          loading ...
        </div>
      );
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
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
          }}
        >
          <SButton
            onClick={() => {
              navigator.clipboard.writeText(this.state.request ?? "");
              alert("request payload copied");
            }}
          >{`Copy`}</SButton>
          <SButton onClick={this.toggleScanner}>{`Scan`}</SButton>
          <SInput onChange={this.onURIPaste} placeholder={""} />
        </div>
        {this.state.scanner && (
          <QRCodeScanner
            onValidate={this.onQRCodeValidate}
            onScan={this.onQRCodeScan}
            onError={this.onQRCodeError}
            onClose={this.onQRCodeClose}
          />
        )}
      </div>
    );
  }
}

export default RequestDisplay;
