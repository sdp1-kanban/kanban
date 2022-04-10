import React, { useEffect, useState, useRef } from 'react';
import { DropZone, FileRemove, SelectedFiles, UploadBar, UploadStatus, ChooseFile, ErrorMessage, UnSupported, AttachmentArea } from "./Attachment.styled"

const max = 2e+9;

const Attachment = ({ setFiles, setBtnStatus, refresh, required }) => {

    const [selectedFiles, setSelectedFiles] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [validFiles, setValidFiles] = useState([]);
    const [unsupportedFiles, setUnsupportedFiles] = useState([]);

    const uploadMsgRef = useRef();
    const uploadRef = useRef();
    const fileInputRef = useRef();

    const dragOver = (e) => {
        e.preventDefault();
    }

    const dragEnter = (e) => {
        e.preventDefault();
    }

    const dragLeave = (e) => {
        e.preventDefault();
    }

    const fileDrop = (e) => {
        e.preventDefault();
        const files = e.dataTransfer.files;
        if (files.length) {
            handleFiles(files);
        }

    }

    useEffect(() => {
        if (unsupportedFiles.length > 0) {
            setBtnStatus(false);
        } else {
            setBtnStatus(true);
        }
    }, [unsupportedFiles])

    useEffect(() => {
        if (required) {
            if (validFiles.length > 0) {
                setBtnStatus(true);
            } else {
                setBtnStatus(false);
            }
        }
    }, [validFiles])

    useEffect(() => {
        uploadFiles();
    }, [validFiles]);

    useEffect(() => {
        let filteredArray = selectedFiles.reduce((file, current) => {
            const x = file.find(item => item.name === current.name);
            if (!x) {
                return file.concat([current]);
            } else {
                return file;
            }
        }, []);
        setValidFiles([...filteredArray]);

    }, [selectedFiles]);

    useEffect(() => {
        setValidFiles([]);
        setSelectedFiles([]);
        setUnsupportedFiles([]);
        setErrorMessage('');
        uploadRef.current.innerHTML = '';
    }, [refresh])


    const fileInputClicked = () => {
        fileInputRef.current.click();
    }

    const filesSelected = () => {
        if (fileInputRef.current.files.length) {
            handleFiles(fileInputRef.current.files);
        }
        uploadRef.current.innerHTML = ' ';
    }

    // Validate file type (accepted files = pdf, microsoft powerpoint, word, excel(not xlms), opendocument spreadsheet, images, plain text)
    // not accepting zip file
    const validateFile = (file) => {
        const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/x-icon',
            'application/pdf', 'application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 'application/xlsm', 'application/vnd.ms-powerpoint', 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.oasis.opendocument.presentation', 'application/vnd.oasis.opendocument.spreadsheet', 'application/vnd.oasis.opendocument.text', 'text/csv',
            'text/plain', 'application/zip'];
        if (validTypes.indexOf(file.type) === -1) {
            return false;
        }
        return true;
    }

    const fileSize = (size) => {
        if (size === 0) return '0 Bytes';
        const k = 1024;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(size) / Math.log(k));
        return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
    }

    const handleFiles = (files) => {
        for (let i = 0; i < files.length; i++) {
            if (validateFile(files[i])) {
                // add to an array to display the name of file
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
            } else {
                // add a new property called invalid
                files[i]['invalid'] = true;
                // add to the same array to display the name of the file
                setSelectedFiles(prevArray => [...prevArray, files[i]]);
                // set error message
                setErrorMessage('File type not permitted');
                setUnsupportedFiles(prevArray => [...prevArray, files[i]]);

            }
        }
    }

    // Remove file from array
    const removeFile = (name) => {

        const validFileIndex = validFiles.findIndex(e => e.name === name);
        validFiles.splice(validFileIndex, 1);
        // update validFiles array
        setValidFiles([...validFiles]);

        const selectedFileIndex = selectedFiles.findIndex(e => e.name === name);
        selectedFiles.splice(selectedFileIndex, 1);

        // update selectedFiles array
        setSelectedFiles([...selectedFiles]);

        if (selectedFileIndex === 0)
            uploadRef.current.innerHTML = ' ';

        const unsupportedFileIndex = unsupportedFiles.findIndex(e => e.name === name);
        if (unsupportedFileIndex !== -1) {
            unsupportedFiles.splice(unsupportedFileIndex, 1);
            // update unsupportedFiles array
            setUnsupportedFiles([...unsupportedFiles]);
        }
    }

    // Upload validated files
    const uploadFiles = () => {
        // eslint-disable-next-line no-restricted-globals
        event.preventDefault()
        uploadMsgRef.current.style.display = 'block';
        uploadMsgRef.current.style.color = 'black';

        let filesizes = 0;
        for (let i = 0; i < validFiles.length; i++) {
            filesizes += (validFiles[i].size);
        }

        if (filesizes < max && unsupportedFiles.length === 0) {
            const formData = new FormData();
            for (let i = 0; i < validFiles.length; i++) {
                formData.append('files', validFiles[i]);
                uploadRef.current.innerHTML = 'File(s) added.';
                uploadRef.current.style.color = 'green';
                uploadRef.current.style.fontWeight = 'bold';
            }
            setFiles(formData);
        }
        else if (filesizes >= max) {
            uploadRef.current.innerHTML = `Maximum upload file size: 2 GB`;
            uploadMsgRef.current.style.color = 'red';
        }

    }

    return (
        <AttachmentArea>
            <UploadBar>
                <UploadStatus ref={uploadMsgRef}>
                    <div ref={uploadRef}></div>
                </UploadStatus>
                {unsupportedFiles.length ? <UnSupported>Please remove all unsupported files.</UnSupported> : ''}
            </UploadBar>
            <DropZone
                onDragOver={dragOver}
                onDragEnter={dragEnter}
                onDragLeave={dragLeave}
                onDrop={fileDrop}
                onClick={fileInputClicked}
            >
                <div>
                    <ChooseFile
                        ref={fileInputRef}
                        type="file"
                        multiple
                        onChange={filesSelected}
                    />
                    <div>Click or Drag and Drop your files here.</div>
                </div>
            </DropZone>
            <div>
                {
                    validFiles.map((data, i) =>
                        <div key={i}>
                            <SelectedFiles>
                                <span>{data.name}</span>
                                <span>({fileSize(data.size)})</span> {data.invalid && <ErrorMessage>({errorMessage})</ErrorMessage>}
                                <FileRemove onClick={() => removeFile(data.name)}>x</FileRemove>
                            </SelectedFiles>
                        </div>
                    )
                }
            </div>
        </AttachmentArea>
    )
}
export default Attachment;
