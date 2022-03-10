var job = require("../controllers/job.controller");

module.exports = (app) => {
    app.get("/api/jobs", job.getAllUnfinishedJobs);
};
