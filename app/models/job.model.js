const mongoose = require("mongoose");

const schema = new mongoose.Schema({

    toolingNum: { type: String },
    dueDate : { type: Date },
    customerName: { type: String },
    partNum: { type: String},
    revisionNum: { type: Number },
    jobType: { type: String},
    //jobInfoHiglight: { type: String} old name
    jobShortDesc: { type: String },
    assignedTo: { type: String },
    column: { type: String }
});

module.exports = mongoose.model("Job", schema);
