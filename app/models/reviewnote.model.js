const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    job: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
    content: { type: String },
    author: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("ReviewNote", schema);
