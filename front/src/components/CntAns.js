import React from "react";

const CntAns = ({ cnt }) => {
  console.log(`cnt = ${cnt}`);
  return <div>{`Правильных ответов: ${cnt}`}</div>;
};

export default CntAns;
