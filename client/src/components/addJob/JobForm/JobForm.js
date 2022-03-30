import React, { useRef, useState } from "react";
import {
    Label,
    Input,
    Form,
    FormGroup,
    ComboBox,
    Option,
    Button,
    FormError
} from "./JobForm.styled"
import DataService from "../../../services/DataService"
import { useHistory } from "react-router-dom";

function JobForm() {

    const [error, setError] = useState();
    let history = useHistory();
    const toolingNumRef = useRef();
    const customerNameRef = useRef();
    const dateRef = useRef();
    const partNumRef = useRef();
    const revNumRef = useRef();
    const jobTypeRef = useRef("PO Order");
    const jobDesc1 = useRef();
    const jobDesc2 = useRef();
    const jobDesc3 = useRef();

    const validateForm = (e) => {
        e.preventDefault();
        
        // Performing basic form validation
        if (toolingNumRef.current.value === ""
            || customerNameRef.current.value === ""
            || dateRef.current.value === ""
            || partNumRef.current.value === ""
            || revNumRef.current.value === ""
            || jobTypeRef.current === ""
            || jobDesc1.current.value === ""
            || jobDesc2.current.value === ""
            || jobDesc3.current.value === "") {
            setError(true);
        } else {
            // Submitting if all fields are filled
            setError(false);
            handleSubmit(e)
        }
    }

    const handleSubmit = (e) => {

        // Creating job object to push to DB
        const jobToAdd = {
            toolingNum: toolingNumRef.current.value,
            dueDate: dateRef.current.value,
            customerName: customerNameRef.current.value,
            partNum: partNumRef.current.value,
            revisionNum: revNumRef.current.value,
            jobType: jobTypeRef.current,
            jobShortDesc: `${jobDesc1.current.value} / ${jobDesc2.current.value} / ${jobDesc3.current.value}`,
            assignedTo: `Not Started`,
            column: `ENGINEERING`,
            isJobOpen: true
        }

        // API call to post job to DB
        const postJob = async () => {
            const result = await DataService.addJob(jobToAdd).then(history.push("/"));
            if (result.data.success) {
                let jobIdAdded = result.data.id;
                console.log(jobIdAdded)
            }
        };

        // Calling the async method
        postJob();
    }

    return (
        <div>
            <Form onSubmit={validateForm}>
                <FormGroup>
                    <Label>Tooling Number</Label>
                    <Input type="text" ref={toolingNumRef} placeholder="Tooling Number"></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Customer Name</Label>
                    <Input type="text" ref={customerNameRef} placeholder="Customer Name"></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Due Date</Label>
                    <Input type="date" ref={dateRef}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Part Number</Label>
                    <Input type="text" placeholder="Part #" ref={partNumRef}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Revision Number</Label>
                    <Input type="number" placeholder="Revision #" ref={revNumRef}></Input>
                </FormGroup>

                <FormGroup>
                    <Label>Job Type</Label>
                    <ComboBox onChange={e => { jobTypeRef.current = e.target.value }}>
                        <Option value="PO Order">PO Order</Option>
                        <Option value="Data Review">Data Review</Option>
                        <Option value="ECO">ECO</Option>
                        <Option value="TV">TV</Option>
                    </ComboBox>
                </FormGroup>

                <FormGroup>
                    <Label>Job Short Description</Label>
                    <Input type="text" placeholder="Keyword 1" ref={jobDesc1}></Input>
                    <Input type="text" placeholder="Keyword 2" ref={jobDesc2}></Input>
                    <Input type="text" placeholder="Keyword 3" ref={jobDesc3}></Input>
                </FormGroup>

                <FormGroup>
                    {error ? <FormError>Error: Please fill in all fields.</FormError> : null}
                </FormGroup>

                <FormGroup>
                    <Button type="submit">Submit</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default JobForm;