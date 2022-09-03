const mlog = require("./helpers/Mlog");

// const oneQuad = {
//   id: 0,
//   a: 1,
//   b: 1,
//   c: 1,
//   d: 0,
//   x1: 0,
//   x2: 0,
// };

// const reqData = {
//   oneQuad: {},
//   cntAnswer: 0,
// };

const A_MIN = -20;
const A_MAX = 21;
const A_RND = 1;
//let d, x1, x2;

let cntAnswer = 0;
let lastAnswer = 2;
const arrQw = [];
let currentQuad = {};

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class Quad {
  Discr(a, b, c) {
    // discriminant
    // D = b**2 - 4ac
    // const d = b ** 2 - 4 * a * c;
    const d = Math.pow(b, 2) - 4 * a * c;
    return d;
  }

  createQuad(a, b, c, n) {
    let p, q;
    const d = this.Discr(a, b, c);
    if (d < 0) return false;
    const qd = Math.pow(d, 1 / 2);
    if (!Number.isInteger(qd)) return false;

    p = -b + qd;
    q = 2 * a;
    const x1 = p / q;
    if (!Number.isInteger(x1 * A_RND)) return false;

    p = -b - qd;
    const x2 = p / q;
    if (!Number.isInteger(x2 * A_RND)) return false;

    // console.log(`a=${a} b=${b} c=${c} d=${d} x1=${x1} x2=${x2}`);
    const oneQ = { id: n, a, b, c, d, x1, x2 };
    arrQw.push(oneQ);

    return true;
  }

  fillQuads() {
    let n = 0;
    for (let a = A_MIN; a < A_MAX; a++) {
      if (a === 0) continue;
      for (let b = A_MIN; b < A_MAX; b++) {
        for (let c = A_MIN; c < A_MAX; c++) {
          if (b === 0 && c === 0) continue;
          if (!this.createQuad(a, b, c, n)) continue;
          n++;
        }
      }
    }
  }

  setCurQuad() {
    const len = arrQw.length;
    const ind = getRandomInt(len);
    const oneQuad = arrQw.find((p) => p.id === ind);
    currentQuad = {
      oneQuad,
      cntAnswer,
      lastAnswer,
    };
    mlog.log(`ind=${ind}`);
  }

  checkAns(req, res) {
    console.log(`ans ${JSON.stringify(req.body, null, 2)}`);
    const id = req.body.id;
    const ad = req.body.d;
    const ax1 = req.body.x1;
    const ax2 = req.body.x2;
    const r = arrQw.find((p) => p.id === id);
    lastAnswer = 0;
    if (r !== null) {
      mlog.log(`d=${ad}(${r.d}) x1=${ax1}(${r.x1}) x2=${ax2}(${r.x2})`);
      if (r.d === ad && r.x1 === ax1 && r.x2 === ax2) {
        cntAnswer++;
        lastAnswer = 1;
        mlog.log("ok");
      } else if (r.x1 === ax1 && r.x2 === ax2) {
        cntAnswer++;
        lastAnswer = 1;
        mlog.log("ok wo D");
      } else if (r.x1 === ax2 && r.x2 === ax1) {
        cntAnswer++;
        lastAnswer = 1;
        mlog.log("ok wo D x1->x2");
      }
    }
    mlog.setCntAns(cntAnswer);

    //this.setCurQuad();
    const len = arrQw.length;
    const ind = getRandomInt(len);
    const oneQuad = arrQw.find((p) => p.id === ind);
    currentQuad = {
      oneQuad,
      cntAnswer,
      lastAnswer,
    };
    return res.json(currentQuad);
  }

  sendQuad(req, res) {
    // this.setCurQuad();
    const len = arrQw.length;
    const ind = getRandomInt(len);
    const oneQuad = arrQw.find((p) => p.id === ind);
    currentQuad = {
      oneQuad,
      cntAnswer,
      lastAnswer,
    };
    return res.json(currentQuad);
  }
  // nextAbc() {
  //   const len = arrQw.length;
  //   // console.log(`len = ${len}`);

  //   const ind = getRandomInt(len);
  //   const oneQuad = arrQw.find((p) => p.id === ind);
  //   const data = {
  //     oneQuad,
  //     cntAnswer,
  //     lastAnswer,
  //   };
  //   //console.log("data:", JSON.stringify(data, null, 2));
  //   mlog.log(`ind=${ind}`);
  //   return data;
  // }
  start() {
    cntAnswer = mlog.getCntAns();
    this.fillQuads();
  }
}

const quad = new Quad();

module.exports = quad;
