import React from "react";
import NavBar from "../components/home/NavBar/NavBar";
import { useLocation } from 'react-router-dom';
import DataService from '../services/DataService';
import EditForm from "../components/editJob/editJobForm/EditForm";
import { useEffect, useState } from "react";

function EditJob(){
    const location = useLocation();
    
    const [job, setJob] = useState({});
    const [desc1, setDesc1] = useState();
    const [desc2, setDesc2] = useState();
    const [desc3, setDesc3] = useState();
    const [jobDueDate, setJobDueDate] = useState();

    useEffect(() => {
        const fetchJob = async () => {
            const result = await DataService.getJob(location.state.jobId);
            if (result.data.success) {
                setJob(result.data.data);
                setDesc1(result.data.data.jobShortDesc.split("/")[0]);
                setDesc2(result.data.data.jobShortDesc.split("/")[1]);
                setDesc3(result.data.data.jobShortDesc.split("/")[2]);
                setJobDueDate(result.data.data.dueDate.split("T")[0])
            }
        };
        fetchJob();
    }, [])

    return(
        <div>
            <NavBar />
            <EditForm 
                id={job._id}
                toolingNum={job.toolingNum}
                dueDate={jobDueDate}
                customerName={job.customerName}
                partNum={job.partNum}
                revisionNum={job.revisionNum}
                jobType={job.jobType}
                jobShortDesc1={desc1}
                jobShortDesc2={desc2}
                jobShortDesc3={desc3}
                assignedTo={job.assignedTo}
                column={job.column}
                isJobOpen={job.isJobOpen}
            />
        </div>
    )
}

export default EditJob;