import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../services/DataService";
import { Container, Row, RowHead, Button, Ul } from "./JobDetail.styled";
import { useHistory, useLocation } from "react-router-dom";
import Attachment from "../Attachment/Attachment";

const downloadUrl = "http://localhost:3001/api/downloadAttachments?file=";

function JobDetail() {
  const [job, setJob] = useState({});
  const { id } = useParams();
  const [files, setFiles] = useState();
  const [btnStatus, setBtnStatus] = useState(true);
  let history = useHistory();

  const getJob = async () => {
    const result = await DataService.getJob(id);
    if (result.data.success) {
      console.log(result.data);
      setJob(result.data.data);
    }
  };

  useEffect(() => {
    getJob();
  }, [id]);

  const handleSubmit = (e) => {

    e.preventDefault();

    const addAttachments = async (jobId) => {
      const result = await DataService.uploadFiles(files, jobId)
        .then(history.push("/"));

    // updateJob();
    addAttachments();
}
    
} 
    return (
      <div>

        <Container>
          <h1>Job Details</h1>
          <RowHead>
            <h3>Tooling Number</h3>
            <span>{job.toolingNum}</span>
          </RowHead>

          <div>
            <Row>
              <h3>Due Date</h3>
              <span>{(new Date(job.dueDate)).toLocaleDateString()}</span>
            </Row>
            <Row>
              <h3>Customer Name</h3>
              <span>{job.customerName}</span>
            </Row>
            <Row>
              <h3>Part Number</h3>
              <span>{job.partNum}</span>
            </Row>
            <Row>
              <h3>Revision Number</h3>
              <span>{job.revisionNum}</span>
            </Row>
            <Row>
              <h3>Job Type</h3>
              <span>{job.jobType}</span>
            </Row>
            <Row>
              <h3>Job Description</h3>
              <span>{job.jobShortDesc}</span>
            </Row>
            <Row>
              <h3>Assigned To</h3>
              <span>{job.assignedTo}</span>
            </Row>
            <Row>
              <h3>Column</h3>
              <span>{job.column}</span>
            </Row>
            <Row>
              <h3>Job Status</h3>
              <span>{job.isJobOpen ? "Open" : "Closed"}</span>
            </Row>
            <Row>
              <h3>Attachment</h3>
              <Ul>{job.attachments?.map((file,i) => (<li key={i}><a target="_blank" href={downloadUrl+file} download>{file.substring(20)}</a></li>))}</Ul>

            </Row>
            <Attachment setFiles={setFiles} setBtnStatus={setBtnStatus} />
            <Button onClick={handleSubmit}>Submit</Button>

          </div>
        </Container>
        
      </div>
    );
  
}

export default JobDetail;
