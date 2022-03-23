import styled from "styled-components"

export const ColumnTitle = styled.h1`
    font-family: 'Nunito', sans-serif;
    font-weight: 800;
    font-size: 2rem;
    text-align: left;
    color: ${props => props.name !== 'Hold' ? 'black' : 'red'};
    margin-bottom: 50px;
    margin-top: -10px;
`;

export const ColumnDiv = styled.div`
    width: 350px;
    border-radius: 5px;
    background-color: ${props => props.snapshot.isDraggingOver ? 'lightgreen' : '#f4f5f6'};
    margin: 5px;
    padding: 20px;
`;