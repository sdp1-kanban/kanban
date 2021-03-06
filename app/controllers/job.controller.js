const Job = require("../models/job.model");
const ReviewNote = require("../models/reviewnote.model");

downloadAttachments = async (req,res) =>{
    const fs = require("fs");
    const fileRequest = req.query.file.substring(6);
    const stream = fs.createReadStream("files/"+fileRequest);
    res.setHeader('Content-disposition', 'attachment; filename="'+fileRequest+'"');
    stream.pipe(res)
};

uploadAttachments = async (req, res) => {
    const filter = { _id: req.params.id };
    const filePathArr = [];
    for(let i = 0; i < req.files.length; i++){
        filePathArr.push(req.files[i].path);
    }
    const update = { $push: {attachments: filePathArr} }
    let updatedJob = await Job.findOneAndUpdate(filter, update);
    res.status(200).json({
        success: true,
        data: updatedJob,
        message: 'Files uploaded successfully!'
    });
};

getAllUnfinishedJobs = async (req, res) => {
    const result = await Job.find().or([{ isJobOpen: true }, { isJobOpen: undefined }]).exec();
    res.status(200).json({
        success: true,
        data: result,
        message: 'All jobs fetched!'
    });
};

getAllFinishedJobs = async (req, res) => {
    const result = await Job.find({ isJobOpen: false }).exec();
    res.status(200).json({
        success: true,
        data: result,
        message: 'All finished jobs fetched!'
    });
};

// POST add a new job
addJob = (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a job',
        })
    }

    const job = new Job(body);

    if (!job) {
        return res.status(400).json({ success: false, error: err })
    }

    job
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: job._id,
                message: 'Job created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Job not created!',
            })
        })
}

// update job
updateJob = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    await Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Job not found!',
            })
        }        
        job.toolingNum = body.toolingNum
        job.dueDate = body.dueDate
        job.customerName = body.customerName
        job.partNum = body.partNum
        job.revisionNum = body.revisionNum
        job.jobType = body.jobType
        job.jobShortDesc = body.jobShortDesc
        job.assignedTo = body.assignedTo
        job.column = body.column

        job
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: job._id,
                    message: 'Job updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Job not updated!',
                })
            })
    }).clone().catch(function(err){console.log(err)})
}

deleteJob = async (req, res) => {
    await Job.findOneAndDelete({ _id: req.params.id }, (err, job) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!job) {
            return res
                .status(404)
                .json({ success: false, error: `Job not found` })
        }

        return res.status(200).json({ success: true, data: job })
    }).catch(err => console.log(err))
}

getJobById = async (req, res) => {
    await Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: job })
    }).clone().catch(err => console.log(err))
}

closeJob = async (req, res) => {
    await Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) {
          return res.status(404).json({
            err,
            message: 'Job not found!',
          });
        }

        if (!job.isJobOpen) {
            return res.status(400).json({ success: false, message: 'Job is already closed'});
        }

        job.column = '';
        job.isJobOpen = false;
        job.jobClosedDate = new Date();

        job
          .save()
          .then(() => {
            return res.status(200).json({
              success: true,
              id: job._id,
              message: 'Job successfully closed!',
            });
          })
          .catch((error) => {
            return res.status(404).json({
              error,
              message: 'Failed to close job',
            });
          });
    }).clone().catch(function(err){console.log(err)})
}


getJobById = async (req, res) => {
    await Job.findOne({ _id: req.params.id }, (err, job) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: job })
    }).clone().catch(err => console.log(err))
}
getJobReviewNotes = async (req, res) => {
    const notes = await ReviewNote.find({ job: req.params.id }).select("-job").exec();

    res.status(200).json({
        success: true,
        data: notes,
        message: 'All review notes fetched!'
    });
};

createJobReviewNote = async (req, res) => {
    const note = new ReviewNote({
        job: req.params.id,
        content: req.body.content,
        author : req.body.author
        // TODO: once things are linked up with accounts - save author as well
    });

    try {
        await note.save();

        res.status(201).json({
            success: true,
            id: note._id,
            message: 'Review note created!',
        });
    } catch (error) {
        res.status(400).json({
            error,
            message: 'Review note not created!',
        });
    }
};

module.exports = {
    getAllUnfinishedJobs,
    getAllFinishedJobs,
    addJob,
    updateJob,
    deleteJob,
    getJobById,
    uploadAttachments,
    closeJob,
    downloadAttachments,
    getJobReviewNotes,
    createJobReviewNote,
};
