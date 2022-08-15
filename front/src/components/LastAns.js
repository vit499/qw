import React from "react";

const LastAns = ({ cnt }) => {
  console.log(`last ans = ${cnt}`);
  return (
    <div>
      {cnt === 1 && <div>Ваш ответ - OK</div>}
      {cnt === 0 && <div>Ваш ответ - Error</div>}
    </div>
  );
};

export default LastAns;
