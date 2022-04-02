import styled from "styled-components"

export const DropZone = styled.section`
    display: flex;
    flexDirection: column;
    align-Items: center;
    padding: 20px;
    border-Width: 2;
    border-Radius: 2;
    border-Color: #eeeeee;
    border-Style: dashed;
    background-Color: #fafafa;
    color: #bdbdbd;
    transition: border .3s ease-in-out;
    font-family: 'Open Sans', sans-serif;
    margin-bottom: 5px;
`
export const FileUploadBtn = styled.button`
    color: white;
    outline: none;
    background-Color: #d39624;
    fontweight: bold;
    padding: 3px 5px;
    margin-bottom: 5px;
    border: none;
    border-radius: 5px;
    font-family: 'Open Sans', sans-serif;
    // margin-left: auto;
`
export const FileRemove = styled.span`
    cursor: pointer;
    margin-left: 10px;
    color: #bdbdbd;
    outline: none;
    background-Color: #eeeeee;
    fontweight: bold;
    padding: 1px 3px 1px 3px ;
    border-radius: 5px;
    border-Color: #eeeeee;
    font-family: 'Open Sans', sans-serif;
`
export const SelectedFiles = styled.div`
    width: 100%;
    margin-top: 10px;
    position: relative;
    font-family: 'Open Sans', sans-serif;
    font-size: small;
`
export const UploadBar = styled.div`
    display: flex;
`
export const UploadStatus = styled.span`
    margin-left: auto;
    padding-top: 5px;
    padding-right: 3px;
    font-family: 'Open Sans', sans-serif;
    font-size: small;
`
export const ChooseFile = styled.input`
    display: none;
`
export const ErrorMessage = styled.span`
    color: red;
`
export const UnSupported = styled.p`
    color: red;
    font-family: 'Open Sans', sans-serif;
    font-size: small;
`
export const AttachmentArea = styled.div`
    margin-bottom: 50px;

`