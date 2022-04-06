import styled from "styled-components";

export const HeaderContainer = styled.div`
    display: grid;
    place-items: center;
`
export const Container = styled.div`
    display: grid;
    place-items: center;
`
export const JobDetailsContainer = styled.div`
    grid-column: 2;
    @media (max-width: 992px) {
        grid-column: 1;
    }
`
export const JobStatusContainer = styled.div`
    grid-column: 3;
    @media (max-width: 992px) {
        grid-column: 1;
    }
`
export const HeaderCard = styled.div`
    display: grid;
    width: 850px;
    gap: 0;
    @media (max-width: 992px) {
        width: 90%;
    }
`
export const HeaderTitle = styled.h1`
    font-family: 'Open Sans', sans-serif;
    text-align: left;
    color: black;
`
export const Card = styled.div`
    display: grid;
    width: 850px;
    grid-template-columns: 3;
    grid-template-columns: 40% 40% 20%;
    background-color: #f4f5f6;
    border-radius: 10px;
    margin-bottom: 1rem;
    @media (max-width: 992px) {
        width: 90%;
        grid-template-columns: 1;
        grid-template-columns: 100%;
    }
`
export const Title = styled.h2`
    font-family: 'Open Sans', sans-serif;
    grid-column: 1;
    text-align: left;
    margin-left: 2rem;
    color: goldenrod;
    padding-top: 0px;
    border-radius: 25px;
    @media (max-width: 992px) {
        text-align: center;
    }
`
export const JobInfo = styled.p`
    font-family: 'Open Sans', sans-serif;
    font-size: 1.1rem;
    text-align: left;
    margin: 10px;
    color: black;
    @media (max-width: 992px) {
        text-align: center;
    }
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