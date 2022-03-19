var jobCtrl = require("../controllers/job.controller");

const express = require('express');
const router = express.Router()

/*
module.exports = (app) => {
    app.get("/api/jobs", jobCtrl.getAllUnfinishedJobs);
};
*/
router.get("/jobs", jobCtrl.getAllUnfinishedJobs)
router.post('/job', jobCtrl.addJob)
router.put('/job/:id', jobCtrl.updateJob)
router.delete('/job/:id', jobCtrl.deleteJob)
router.get('/job/:id', jobCtrl.getJobById)

module.exports = router
