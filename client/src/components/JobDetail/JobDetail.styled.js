import styled from 'styled-components'


export const Container   = styled.div`
width: 600px;
margin: 2rem auto;
background-color: #fff;
padding: 0 1rem;
font-family: 'Open Sans', sans-serif;
text-align: center;
`
export const Row   = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border-nottom:1px solid #aaa;
padding: 0 1rem;
`
export const RowHead   = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
border-nottom:1px solid #aaa;
border-radius:1rem;
background-color:#eee;
padding:1rem;
`

export const Button = styled.button`
    font-size: 24px;
    color: white;
    background-color: #50c878;
    width: 150px;
    padding: 10px;
    border-radius: 10px;
    border: 5px solid #3ba860;

    &:disabled{
        background-color: gray;
        border-color: gray;
        &:hover{
            background-color: gray;
            cursor: not-allowed;
        }
    }
    &:hover{
        background-color: #3ba860;
        cursor: pointer;
    }
`
export const Ul = styled.ul`
    list-style-type: none;
`