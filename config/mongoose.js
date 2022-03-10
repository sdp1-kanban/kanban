const config = require("./config");
const mongoose = require("mongoose");

module.exports = () => {
    const db = mongoose.connect(config.db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    })
        .then(() => console.log("Connected to database."))
        .catch(err => console.log("Mongoose error", err));

    require("../app/models/job.model");

    return db;
};
