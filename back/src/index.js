const express = require("express");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const quad = require("./Quad.js");

const API_PORT = process.env.API_PORT || 3008;
const app = express();

app.use(cors());
app.use(express.json());
app.post("/api/quad", quad.checkAns);
app.use("/api/quad", quad.sendQuad);

// const urlencodedParser = express.urlencoded({ extended: false });
// app.set("view engine", "pug");

// app.get("/", (req, res) => {
//   //res.sendFile(__dirname + "/view/index.html");
//   const data = quad.nextAbc();
//   res.render("quest", {
//     a: data.oneQuad.a,
//     b: data.oneQuad.b,
//     c: data.oneQuad.c,
//     cnt: data.cntAnswer,
//   });
// });
// app.post("/", urlencodedParser, (req, res) => {
//   if (!req.body) return res.sendStatus(400);
//   console.log(req.body);
//   res.sendFile(__dirname + "/view/ans.html");
// });

app.get("/log", (req, res) => {
  //   if (!req.body) return res.sendStatus(400);
  //   console.log(req.body);
  const f = path.join(__dirname, "..", "logs", "log.txt");
  res.sendFile(f);
});

const start = () => {
  app.listen(API_PORT, () => {
    console.log(`-------- Start app listen on port ${API_PORT} -------`);
    quad.start();
  });
};
start();
