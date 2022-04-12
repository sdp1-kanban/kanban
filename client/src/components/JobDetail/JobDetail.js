import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DataService from "../../services/DataService";
import { Container, Row, RowHead, Button, Ul } from "./JobDetail.styled";
import { useHistory, useLocation } from "react-router-dom";
import Attachment from "../Attachment/Attachment";
import download from 'downloadjs';

function JobDetail() {
  const [job, setJob] = useState({});
  const { id } = useParams();
  const [files, setFiles] = useState();
  const [btnStatus, setBtnStatus] = useState(true);
  let history = useHistory();
  const [jobLoaded, setJobLoaded] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getJob = async () => {
    const result = await DataService.getJob(id)
      .then((result) => {
        setJob(result.data.data)
        setJobLoaded(true);
      });
  };

  useEffect(() => {
    getJob();
    setRefresh(false);
  }, [id, refresh]);

  const downloadFile = async (file) => {
    const result = await DataService.downloadFiles(`${file}`, {
      responseType: 'blob'
    })
    download(result.data,file);
  };

  
  const handleSubmit = (e) => {
    console.log(files);
    e.preventDefault();

    const addAttachments = async (jobId) => {
      const result = await DataService.uploadFiles(files, jobId)
        .then(setRefresh(true));
    }
    addAttachments(id);

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
            <Ul>
            {
                jobLoaded ? job.attachments.map((element, i) => (
                  element.map((file, i) => (
                    <li key={i}><a href="#/"
                    onClick={() =>
                      downloadFile(file,i)
                    }>{file.substring(20)}</a></li>
                  ))
                )) : null
            }
            </Ul>
          </Row>
          {console.log("Button Status: " + btnStatus)}
          <Attachment required={true} setFiles={setFiles} setBtnStatus={setBtnStatus}  refresh={refresh} />
          <Button  disabled={btnStatus ? false : true} onClick={handleSubmit}>Upload</Button>
        </div>
      </Container>

    </div>
  );

}

export default JobDetail;
