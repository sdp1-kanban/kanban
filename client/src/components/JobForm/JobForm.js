import React, { useEffect, useState } from "react";
import {
    Label,
    Input,
    Form,
    FormGroup,
    ComboBox,
    Option,
    Button,
} from "./JobForm.styled"
import DataService from "../../services/DataService"
import { useHistory, useLocation } from "react-router-dom";
import Attachment from "../Attachment/Attachment"

function JobForm() {

    let history = useHistory();
    let location = useLocation();
    const [files, setFiles] = useState();
    const [btnStatus, setBtnStatus] = useState(true);

    const newJob = {
        toolingNum: "",
        dueDate: "",
        customerName: "",
        partNum: "",
        revisionNum: "",
        jobType: "",
        jobShortDesc1: "",
        jobShortDesc2: "",
        jobShortDesc3: "",
        assignedTo: "",
        column: "",
        isJobOpen: true
    };
    const [job, setJob] = useState(newJob);

    useEffect(() => {
        if (location.state.mode === "edit") {
            const fetchJob = async () => {
                const result = await DataService.getJob(location.state.jobId);
                if (result.data.success) {
                    let job = result.data.data;
                    setJob({
                        id: job._id,
                        toolingNum: job.toolingNum,
                        dueDate: job.dueDate.split("T")[0],
                        customerName: job.customerName,
                        partNum: job.partNum,
                        revisionNum: job.revisionNum,
                        jobType: job.jobType,
                        jobShortDesc1: job.jobShortDesc.split("/")[0].trim(),
                        jobShortDesc2: job.jobShortDesc.split("/")[1].trim(),
                        jobShortDesc3: job.jobShortDesc.split("/")[2].trim(),
                        assignedTo: job.assignedTo,
                        column: job.column,
                        isJobOpen: job.isJobOpen
                    });
                }
            };
            fetchJob();
        } else {
            setJob(newJob);
        }
    }, [location.state.jobId, location.state.mode])

    const handleSubmit = (e) => {

        e.preventDefault();

        const jobToAdd = {
            ...job,
            jobShortDesc: `${job.jobShortDesc1} / ${job.jobShortDesc2} / ${job.jobShortDesc3}`,
            assignedTo: `Not Started`,
            column: `ENGINEERING`,
            isJobOpen: true
        }

        const jobToUpdate = {
            ...job,
            jobShortDesc: `${job.jobShortDesc1} / ${job.jobShortDesc2} / ${job.jobShortDesc3}`
        }

        // API call to post job to DB
        const postJob = async () => {
            const result = await DataService.addJob(jobToAdd)
                .then((res) => {    
                    if([...files].length > 0){
                        addAttachments(res.data.id)
                    }
                })
                .then(history.push("/"));
        };

        // API call to update job
        const updateJob = async () => {
            const result = await DataService.updateJob(job.id, jobToUpdate)
                .then(history.push("/"));
        };

        const addAttachments = async (jobId) => {
            const result = await DataService.uploadFiles(files, jobId);
        }

        switch (location.state.mode) {
            case 'add':
                postJob();
                break;
            case 'edit':
                updateJob();
                break;
        }
    }



    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label>Tooling Number</Label>
                    <Input required type="text" placeholder="Tooling Number" value={job.toolingNum} onChange={(e) => { setJob({ ...job, toolingNum: e.target.value }) }}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Customer Name</Label>
                    <Input required type="text" placeholder="Customer Name" value={job.customerName} onChange={(e) => { setJob({ ...job, customerName: e.target.value }) }}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Due Date</Label>
                    <Input required type="date" value={job.dueDate} onChange={(e) => { setJob({ ...job, dueDate: e.target.value }) }}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Part Number</Label>
                    <Input required type="text" placeholder="Part #" value={job.partNum} onChange={(e) => { setJob({ ...job, partNum: e.target.value }) }}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Revision Number</Label>
                    <Input required type="number" placeholder="Revision #" value={job.revisionNum} onChange={(e) => { setJob({ ...job, revisionNum: e.target.value }) }}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Job Type</Label>
                    <ComboBox value={job.jobType} onChange={(e) => { setJob({ ...job, jobType: e.target.value }) }}>
                        <Option value="PO Order">PO Order</Option>
                        <Option value="Data Review">Data Review</Option>
                        <Option value="ECO">ECO</Option>
                        <Option value="TV">TV</Option>
                    </ComboBox>
                </FormGroup>

                <FormGroup>
                    <Label>Job Short Description</Label>
                    <Input required type="text" placeholder="Keyword 1" value={job.jobShortDesc1} onChange={(e) => { setJob({ ...job, jobShortDesc1: e.target.value }) }}></Input>
                    <Input required type="text" placeholder="Keyword 2" value={job.jobShortDesc2} onChange={(e) => { setJob({ ...job, jobShortDesc2: e.target.value }) }}></Input>
                    <Input required type="text" placeholder="Keyword 3" value={job.jobShortDesc3} onChange={(e) => { setJob({ ...job, jobShortDesc3: e.target.value }) }}></Input>
                </FormGroup>

                {location.state.mode === "add" ? <Attachment setFiles={setFiles} setBtnStatus={setBtnStatus} /> : null}

                <FormGroup>
                    <Button type="submit" disabled={btnStatus ? false : true} >{location.state.mode === "add" ? "Submit" : "Update"}</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default JobForm;