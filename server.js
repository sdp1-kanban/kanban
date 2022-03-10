process.env.NODE_ENV = process.env.NODE_ENV || "development";

const config = require("./config/config");
const mongoose = require("./config/mongoose");
const express = require("./config/express");

var db = mongoose();

var app = express();
app.listen(3001, () => console.log("API server running at http://localhost:3001/"));

module.exports = app;
