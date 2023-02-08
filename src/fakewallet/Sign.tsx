import * as React from "react";
import { setsign } from "./globals";

export default () => {
  const [state, setState]: any = React.useState({
    show: true,
    val: "test",
  });

  React.useEffect(() => {
    setsign([state, setState]);
  }, []);

  return <>{state.show && <div>{state.val}</div>}</>;
};
