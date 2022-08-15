import { makeAutoObservable, runInAction } from "mobx";
import http from "../http";

class QuadStore {
  constructor() {
    this._load = "none";
    this._id = 0;
    this._a = 1;
    this._b = 1;
    this._c = 1;
    this._d = 0;
    this._x1 = 0;
    this._x2 = 0;
    this._cnt = 0;
    this._lastAns = 2;
    this._date = new Date().toISOString();
    makeAutoObservable(this, {});
  }

  // Init(pur = {id = 0, name = "", price = 0, needId = 1, freqId = 1, tags = [], date}) {
  Init() {
    this._load = "none";
  }
  setD(d) {
    this._d = d;
  }
  setX1(d) {
    this._x1 = d;
  }
  setX2(d) {
    this._x2 = d;
  }
  setCnt(cnt) {
    this._cnt = cnt;
  }

  get id() {
    return this._id;
  }
  get a() {
    return this._a;
  }
  get b() {
    return this._b;
  }
  get c() {
    return this._c;
  }
  get d() {
    return this._d;
  }
  get x1() {
    return this._x1;
  }
  get x2() {
    return this._x2;
  }
  get load() {
    return this._load;
  }
  get cnt() {
    return this._cnt;
  }
  get lastAns() {
    return this._lastAns;
  }

  fillOneQuad(d) {
    this._id = d.id;
    this._a = d.a;
    this._b = d.b;
    this._c = d.c;
    this._d = 0;
    this._x1 = 0;
    this._x2 = 0;
  }
  getOneQuad() {
    let p = {
      id: this._id,
      a: this._a,
      b: this._b,
      c: this._c,
      d: this._d,
      x1: this._x1,
      x2: this._x2,
    };
    // if (this._id) p = { ...p, id: this._id };
    return p;
  }

  async sendQuad(xd, xx1, xx2) {
    this._load = "load";
    this._d = xd;
    this._x1 = xx1;
    this._x2 = xx2;
    const quad = this.getOneQuad();
    // console.log("create purchase", purchase);
    try {
      const { data } = await http.Quad.create(quad);
      runInAction(() => {
        console.log("get quad", JSON.stringify(data, null, 2));
        this.fillOneQuad(data.oneQuad);
        this.setCnt(data.cntAnswer);
        this._lastAns = data.lastAnswer;
        this._load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this._load = "err";
      });
    }
  }

  async getQuad() {
    this._load = "load";
    try {
      const { data } = await http.Quad.fetch();
      runInAction(() => {
        console.log("get quad", JSON.stringify(data, null, 2));
        this.fillOneQuad(data.oneQuad);
        this.setCnt(data.cntAnswer);
        this._lastAns = data.lastAnswer;
        this._load = "done";
      });
    } catch (err) {
      runInAction(() => {
        this._load = "err";
      });
    }
  }
}

const quadStore = new QuadStore();

export default quadStore;
