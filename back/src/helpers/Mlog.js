const fs = require("fs");
require("dotenv").config();

const fn = "logs/log.txt";
const fn2 = "logs/log2.txt";
const ans = "logs/ans.txt";

class Mlog {
  constructor() {
    this.debug = true; // process.env.API_DEBUG === "1" ? true : false;
    this._fileEn = true;
    this._fileEn2 = this.debug ? true : false;
  }

  getCntAns() {
    let cnt = 0;
    let fileExist = false;
    try {
      fs.accessSync(ans, fs.constants.R_OK | fs.constants.W_OK);
      fileExist = true;
      console.log("can read/write");
    } catch (err) {
      console.error("no access!");
    }
    if (!fileExist) {
      fs.writeFileSync(ans, "0");
    }

    try {
      const text = fs.readFileSync(ans, "utf8");
      cnt = Number.parseInt(text);
    } catch (e) {}
    console.log(`cntAns=${cnt}`);
    return cnt;
  }
  setCntAns(cnt) {
    fs.writeFileSync(ans, cnt.toString());
  }

  log(...args) {
    // 2021-05-28T23:11:42.805Z
    const t = new Date().toISOString();
    const tt = `${t.substr(2, 17)}`;
    const m = `${tt} ${args}`;
    console.log(m);
    if (this._fileEn) {
      const m1 = `\r\n${m}`;
      fs.appendFileSync(fn, m1);
    }
  }

  log2(...args) {
    const t = new Date().toISOString();
    const tt = `${t.substr(2, 17)}`;
    const m = `${tt} ${args}`;
    console.log(m);
    if (this._fileEn2) {
      const m1 = `\r\n${m}`;
      fs.appendFileSync(fn2, m1);
    }
  }
}

const mlog = new Mlog();
module.exports = mlog;
