import React from "react";
import NavBar from "../components/home/NavBar/NavBar";
import JobForm from "../components/addJob/JobForm/JobForm";

function AddJob(){
    return(
        <div>
            <NavBar />
            <JobForm />
        </div>
    );
}

export default AddJob;