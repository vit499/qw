import React from "react";
import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import quadStore from "../store/QuadStore";
import QuadText from "./QuadText";

const Quad2 = observer(() => {
  // useEffect(() => {
  //   console.log("app init");
  //   quadStore.Init();
  //   quadStore.getQuad();
  // }, []);

  return (
    <div>
      <QuadText a={quadStore.a} b={quadStore.b} c={quadStore.c} />
    </div>
  );
});

export default Quad2;
