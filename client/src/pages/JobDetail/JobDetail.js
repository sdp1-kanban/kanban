import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavBar from "../../components/home/NavBar/NavBar";
import DataService from "../../services/DataService";
import { Container, Row } from "./JobDetail.styled";
// const jobData = {
//   toolingNum: "12344",
//   dueDate: "Dec 3rd 2022",
//   customerName: "Ayan Jama",
//   partNum: "1111",
//   revisionNum: "32a",
//   jobType: "Engineer",
//   jobShortDesc: "go fix that thing",
//   assignedTo: "Osman",
//   column: "i dont know",
//   isJobOpen: true,
// };

function JobDetail() {
  const [job, setJob] = useState({});
  const { id } = useParams();

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

  return (
    <div>
      <NavBar />
      <Container>
        <h1>Job Details</h1>
        {Object.entries(job).map(([key, value]) => (
          <Row>
            <h3>{key}</h3>
            <span>{value}</span>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default JobDetail;
