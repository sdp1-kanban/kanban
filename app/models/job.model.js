const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: { type: String },
    // TODO: finish this schema
});

module.exports = mongoose.model("Job", schema);
