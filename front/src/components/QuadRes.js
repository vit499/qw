import React from "react";
import { useState } from "react";
import quadStore from "../store/QuadStore";

const QuadRes = () => {
  const [x1, setX1] = useState("");
  const [x2, setX2] = useState("");
  const [d, setD] = useState("");
  function filterInt(value) {
    if (/^[-+]?(\d+|Infinity)$/.test(value)) {
      return Number(value);
    } else {
      return value;
    }
  }

  const sx1 = (e) => {
    const t = e.target.value;
    const a = filterInt(t);
    if (isNaN(a) && t != "-") {
      setX1("");
      return;
    }
    setX1(a);
  };
  const sx2 = (e) => {
    const t = e.target.value;
    const a = filterInt(t);
    if (isNaN(a) && t !== "-") {
      setX2("");
      return;
    }
    setX2(a);
  };
  const sd = (e) => {
    const t = e.target.value;
    const a = filterInt(t);
    if (isNaN(a)) {
      setD("");
      return;
    }
    setD(a);
  };
  const send = () => {
    const xd = filterInt(d);
    const xx1 = filterInt(x1);
    const xx2 = filterInt(x2);
    if (isNaN(xd) || isNaN(xx1) || isNaN(xx2)) {
      return;
    }
    if (xd === "" || xx1 === "" || xx2 === "") {
      return;
    }
    console.log(`d=${xd}, x1=${xx1}, x2=${xx2}`);
    setD("");
    setX1("");
    setX2("");
    quadStore.sendQuad(xd, xx1, xx2);
  };
  return (
    <div>
      {`D =`}
      <input type="text" value={d} onChange={sd}></input>
      <br />
      {`x1=`}
      <input type="text" value={x1} onChange={sx1}></input>
      <br />
      {`x2=`}
      <input type="text" value={x2} onChange={sx2}></input>
      <br />
      <button style={{ marginTop: "1rem" }} onClick={send}>
        Отправить
      </button>
    </div>
  );
};

export default QuadRes;
