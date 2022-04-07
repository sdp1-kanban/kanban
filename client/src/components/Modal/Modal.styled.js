import styled from 'styled-components'

export const ModalBackground = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    background-color: rgb(200 200 200 / 0.9);   
    display: flex;
    justify-content: center;
    align-items: center;
`
  
export const ModalContainer = styled.div`
    font-family: 'Open Sans',sans-serif;
    width: 600px;
    height: 320px;
    border-radius: 12px;
    background-color: white;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    display: flex;
    flex-direction: column;
    padding: 25px;
`
  
export const Title = styled.div`
    display: inline-block;
    text-align: center;

    h1 {
        margin: 0;
    }
`

export const Body = styled.div`
    flex: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 1.7rem;
    text-align: center;
`
export const Footer = styled.div`
    flex: 20%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
        width: 150px;
        height: 45px;
        margin: 10px;
        border: none;
        color: white;
        border-radius: 8px;
        font-size: 20px;
        cursor: pointer;
        
    }

    .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
    }
    .btn-primary:hover {
        background-color: #0069d9;
        border-color: #0062cc;
    }

    .btn-secondary {
        background-color: #6c757d;
        border-color: #6c757d;
    }
    .btn-secondary:hover {
        background-color: #5a6268;
        border-color: #545b62;
    }

    .btn-danger {
        background-color: #dc3545;
        border-color: #dc3545;
    }
    .btn-danger:hover {
        background-color: #c82333;
        border-color: #bd2130
    }
`
export const TitleCloseButton = styled.div`
    display: flex;
    justify-content: flex-end;
    
    button {
        background-color: transparent;
        border: none;
        font-size: 25px;
        cursor: pointer;
    }
`
  