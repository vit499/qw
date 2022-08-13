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
const arrQw = [];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

class Quad {
  Discr(a, b, c) {
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

  checkAns(req, res) {
    cntAnswer++;
    mlog.setCntAns(cntAnswer);
    mlog.log("ok");
    return res.send("+++ok+++");
  }
  sendQuad(req, res) {
    const len = arrQw.length;
    // console.log(`len = ${len}`);

    const ind = getRandomInt(len);
    const oneQuad = arrQw.find((p) => p.id === ind);
    const data = {
      oneQuad,
      cntAnswer,
    };
    //console.log("data:", JSON.stringify(data, null, 2));
    mlog.log(`ind=${ind}`);
    return res.json(data);
  }
  start() {
    cntAnswer = mlog.getCntAns();
    this.fillQuads();
  }
}

const quad = new Quad();

module.exports = quad;
