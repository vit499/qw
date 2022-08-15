import React from "react";
//import quadStore from "../store/QuadStore";

const QuadText = ({ a, b, c }) => {
  const ca = () => {
    let s = a;
    let aa = "";
    if (s === 0) return aa;
    if (s < 0) aa = "-";
    s = Math.abs(s);
    if (s === 1) aa = aa + "x";
    else aa = aa + s + "x";
    return aa;
  };
  const cb = () => {
    let s = b;
    let aa = "";
    if (s === 0) return aa;
    if (s < 0) aa = "-";
    else aa = "+";
    s = Math.abs(s);
    if (s === 1) aa = aa + "x";
    else aa = aa + s + "x";
    return aa;
  };
  const cc = () => {
    let s = c;
    let aa = "";
    if (s === 0) return aa;
    if (s < 0) aa = "-";
    else aa = "+";
    s = Math.abs(s);
    aa = aa + s;
    return aa;
  };
  return (
    <div>
      {`${ca()}`}
      <sup>2</sup>
      {`${cb()}${cc()}=0`}
      {/* {a !== 1 && `${a}x`}
      {b < 0 && ` - ${-b}`}
      {b >= 0 && ` + ${b}`} */}
    </div>
  );
};

export default QuadText;
