const express = require("express");
require("dotenv").config();
const cors = require("cors");
const quad = require("./Quad.js");

const API_PORT = process.env.API_PORT || 3008;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/quad/a", quad.checkAns);
app.use("/api/quad", quad.sendQuad);

const start = () => {
  app.listen(API_PORT, () => {
    console.log(`-------- Start app listen on port ${API_PORT} -------`);
    quad.start();
  });
};
start();
