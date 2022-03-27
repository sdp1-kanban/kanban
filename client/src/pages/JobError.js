import React from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/home/NavBar/NavBar";
function JobError() {
    return (
        <div>
            <NavBar />

            <div className="job-error">

                <h3>Sorry Job not found</h3>
                <p>Unfortunately The job you are trying to reteieve could not be completed, please contact the admin for support</p>

                <Link to="/"><a className="btn-1">Back to home</a></Link>
            </div>

        </div>
    );
}

export default JobError;

