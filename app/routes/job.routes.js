var jobCtrl = require("../controllers/job.controller");
const express = require('express');
const router = express.Router()
const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
    destination: './files',
    filename: (req, file, cb) =>{
        cb(null, Date.now() + "_" + file.originalname);
    }
})
const upload = multer({storage: fileStorageEngine});

router.get("/downloadAttachments",jobCtrl.downloadAttachments)
router.get("/jobs", jobCtrl.getAllUnfinishedJobs)
router.get("/jobs/finished", jobCtrl.getAllFinishedJobs)
router.post('/job', jobCtrl.addJob)
router.put('/job/:id', jobCtrl.updateJob)
router.put('/job/close/:id', jobCtrl.closeJob)
router.delete('/job/:id', jobCtrl.deleteJob)
router.get('/job/:id', jobCtrl.getJobById)
router.post('/uploadAttachments/:id', upload.array('files'), jobCtrl.uploadAttachments)

module.exports = router
