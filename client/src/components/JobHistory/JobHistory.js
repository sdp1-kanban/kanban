import React, { useState, useEffect } from "react";
import DataService from "../../services/DataService";
import {
    Container,
    JobInfo,
    Title,
    Card,
    JobDetailsContainer,
    HeaderCard,
    HeaderContainer,
    HeaderTitle,
    JobStatus,
    JobStatusContainer,
    NoJobs
} from "./JobHistory.styled"

function JobHistory() {

    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        const fetchAllJobs = async () => {
            const result = {};// TODO: Replace with front-end service call for Job History 
            if (result.data.success) {
                const jobs = result.data.data;
                setJobs(jobs);
            }
        };
        fetchAllJobs();
    }, []);

    return (
        <div>
            <HeaderContainer>
                <HeaderCard>
                    <HeaderTitle>Job History</HeaderTitle>
                    { jobs.length == 0 ? <NoJobs>No history was found.</NoJobs> : null}
                </HeaderCard>
            </HeaderContainer>
            {jobs.map((val) => {
                return (
                    <Container key={val._id}>
                        <Card>
                            <Title>{val.toolingNum}</Title>
                            <JobDetailsContainer>
                                <JobInfo><span style={{ fontWeight: 'bold' }}>Customer:</span> {val.customerName}</JobInfo>
                                <JobInfo><span style={{ fontWeight: 'bold' }}>Job Type:</span> {val.jobType}</JobInfo>
                                <JobInfo><span style={{ fontWeight: 'bold' }}>Opened on:</span> { (new Date(val.jobOpenDate)).toLocaleString()}</JobInfo>
                                <JobInfo><span style={{ fontWeight: 'bold' }}>Closed on:</span> {(new Date(val.jobClosedDate)).toLocaleString()}</JobInfo>
                            </JobDetailsContainer>
                            <JobStatusContainer>
                                <JobStatus isOpen={val.isJobOpen}>{val.isJobOpen ? "Open" : "Closed"}</JobStatus>
                            </JobStatusContainer>
                        </Card>
                    </Container>
                );
            })}
        </div>
    );
}

export default JobHistory;