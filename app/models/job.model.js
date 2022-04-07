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
    isJobOpen: {type: Boolean},
    attachments: {type: Array},
    jobOpenDate: {type: Date},
    jobClosedDate: {type: Date}
});

module.exports = mongoose.model("Job", schema);
