import styled from 'styled-components'

export const Form = styled.form`
    margin: 5rem;
    display: grid;
    place-items: left;
`

export const Label = styled.label`
    font-family: 'Open Sans', sans-serif;
    font-size: 1.2rem;
    text-align: left;
    font-weight: 700;
`
export const Input = styled.input`
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    margin-top: 10px;
`
export const Textarea = styled.textarea`
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    height: 10rem;
    margin-top: 10px;
`
export const FormGroup = styled.div`
    margin-bottom: 1rem;
    display: grid;
`

export const Button = styled.button`
    font-size: 15px;
    color: white;
    background-color: #50c878;
    width: 100px;
    padding: 5px;
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