import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: grid;
    place-items: center;
`
export const HeaderCard = styled.div`
    display: grid;
    width: 30%;
    gap: 0;
`
export const HeaderTitle = styled.h1`
    font-family: 'Open Sans', sans-serif;
    text-align: left;
    color: black;
`
export const Container = styled.div`
    display: grid;
    place-items: center;
`
export const JobDetailsContainer = styled.div`
    grid-column: 2;
`
export const Card = styled.div`
    width: 30%;
    display: grid;
    grid-template-columns: 3;
    grid-template-columns: 40% 40% 20%;
    background-color: #f4f5f6;
    border-radius: 10px;
    margin-bottom: 1rem;
`
export const Title = styled.h2`
    font-family: 'Open Sans', sans-serif;
    grid-column: 1;
    text-align: center;
    margin-left: 2rem;
    color: black;
    background-color: #e4e4e4;
    padding-top: 0px;
    border-radius: 25px;
`
export const JobInfo = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-size: 1.1rem;
    text-align: right;
    margin: 10px;
    color: black;
`
export const JobStatusContainer = styled.div`
    grid-column: 3;
`
export const JobStatus = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    color: ${props => props.isOpen ? "green" : "red" }
`
export const NoJobs = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-size: 1.2rem;
    text-align: left;
    color: black;
`