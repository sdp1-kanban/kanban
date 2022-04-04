import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/home/NavBar/NavBar";
import {JobErrorDiv, JobErrorTitle, Btn1} from "./JobError.styled"
function JobError() {
    return (
        <div>
            <NavBar />

            <JobErrorDiv>

                <JobErrorTitle>Sorry, Job not found!</JobErrorTitle>
                <p>Unfortunately The job you are trying to retrieve could not be completed, please contact the admin for support</p>

                <Link to="/"><Btn1>Back to home</Btn1></Link>
            </JobErrorDiv>

        </div>
    );
}

export default JobError;

