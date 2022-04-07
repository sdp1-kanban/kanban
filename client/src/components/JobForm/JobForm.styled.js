import styled from 'styled-components'

export const Form = styled.form`
    margin: 5rem;
    display: grid;
    place-items: center;
`

export const Label = styled.label`
    font-family: 'Open Sans', sans-serif;
    font-size: 1.5rem;
    text-align: center;
    font-weight: 700;
`
export const Input = styled.input`
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    margin-top: 10px;
`
export const FormGroup = styled.div`
    margin-bottom: 3rem;
    display: grid;
`
export const ComboBox = styled.select`
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
    margin-top: 10px;
`
export const Option = styled.option`
    font-family: 'Open Sans', sans-serif;
    font-size: 1rem;
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