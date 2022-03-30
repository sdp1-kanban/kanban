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
    font-size: 32px;
    border: none;
    border-radius: 10px;
    padding: 10px;
    color: white;
    background-color: green;
`
export const FormError = styled.h1`
    font-family: 'Open Sans', sans-serif;
    font-size: 1.5rem;
    text-align: center;
    font-weight: 700;
    color: red;
`