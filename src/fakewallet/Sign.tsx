import * as React from "react";
import { setsign } from "./globals";
import QRCode from "qrcode.react";
import styled from "styled-components";

const SRequestValues = styled.div`
  font-family: monospace;
  width: 100%;
  font-size: 12px;
  background-color: #eee;
  padding: 8px;
  word-break: break-word;
  border-radius: 8px;
  margin-bottom: 10px;
`;

export default () => {
  const [state, setState]: any = React.useState({
    show: true,
    val: "test",
  });

  React.useEffect(() => {
    setsign([state, setState]);
  }, []);

  return (
    <>
      {state.show && (
        <div style={{ marginTop: "30px", width: "100%" }}>
          <div style={{ width: "100%", textAlign: "center" }}>
            <QRCode value={state.val} renderAs="canvas" size={256} />
          </div>
          <h6>Data</h6>
          <SRequestValues>{state.val}</SRequestValues>
        </div>
      )}
    </>
  );
};
