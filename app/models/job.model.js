const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    toolingNum: { type: String },
    dueDate : { type: Date },
    customerName: { type: String },
    partNum: { type: String},
    revisionNum: { type: Number },
    jobType: { type: String},
    jobShortDesc: { type: String },
    assignedTo: { type: String },
    column: { type: String },
    isJobOpen: {type: Boolean}
});

module.exports = mongoose.model("Job", schema);
