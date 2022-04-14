import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useBoardKey } from "../../../contexts/BoardContext";
import { useModal } from "../../../contexts/ModalContext";
import { MenuContainer, MenuList, MenuItem } from './KebabMenu.styled'
import DataService from "../../../services/DataService";

function KebabMenu(props) {
    const { job, toolingNum, location, showMenu } = { ...props };
    const { modal, setModal } = useModal();
    const { setBoardKey } = useBoardKey();
    const history = useHistory();

    const handleEdit = () => {
        history.push(
            {
                pathname: '/editJob',
                state: {
                    jobId: job._id,
                    mode: "edit"
                }
            }
        )
    }

    const handleDelete = () => {
        const modalConfig = {
            title: 'Confirm Delete',
            message: `Are you sure you want to delete <b>${toolingNum}</b>?<br/>This action cannot be undone.`,
            buttons: [
                {
                    text: 'Cancel',
                    className: 'btn-secondary',
                    onClick: () => {
                        setModal({ ...modal, showModal: false });
                    }
                },
                {
                    text: 'Delete',
                    className: 'btn-danger',
                    onClick: async () => {
                        const result = await DataService.deleteJob(job._id);
                        if (result.data.success) {
                            setModal({ ...modal, showModal: false });
                            setBoardKey(Date.now()); // rerender board
                        }
                    }
                }]
        };
        setModal({ showModal: true, config: modalConfig });
    }
    const handleApprove = () => {
        const modalConfig = {
            title: 'Review Approval',
            message: `Are you sure you want to approve job <b>${toolingNum}</b>?<br/>This action will remove the job from the current board.`,
            buttons: [
                {
                    text: 'Cancel',
                    className: 'btn-secondary',
                    onClick: () => {
                        setModal({ ...modal, showModal: false });
                    }
                },
                {
                    text: 'Approve',
                    className: 'btn-primary',
                    onClick: async () => {
                        const result = await DataService.closeJob(job._id);
                        if (result.data.success) {
                            setModal({ ...modal, showModal: false });
                            setBoardKey(Date.now()); // rerender board
                        }
                    }
                }]
        };
        setModal({ showModal: true, config: modalConfig });
    }

    return (
        <MenuContainer location={location} showMenu={showMenu}>
            <MenuList>
                <MenuItem onClick={() => handleEdit()}>Edit</MenuItem>
                <MenuItem onClick={() => handleDelete()}>Delete</MenuItem>
                {
                    job.column.toUpperCase() === 'FINAL REVIEW' ?
                        <>
                            <hr className='menu-divider'/>
                            <MenuItem onClick={() => handleApprove()}>Approve</MenuItem>
                        </> : null
                }
                
            </MenuList>
        </MenuContainer>
    );
}

export default KebabMenu;