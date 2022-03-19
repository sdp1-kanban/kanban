const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    toolingNum: { type: String },
    dueDate : { type: Date },
    customerName: { type: String },
    partNum: { type: String},
    revisionNum: { type: String },
    jobType: { type: String},
    jobInfoHiglight: { type: String}
});

module.exports = mongoose.model("Job", schema);
