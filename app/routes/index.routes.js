﻿var index = require("../controllers/index.controller");

module.exports = (app) => {
    app.get("/api", index.getIndex);
};
