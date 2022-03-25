import React from "react";
import {useBoardKey} from "../../../contexts/BoardContext";
import {useModal} from "../../../contexts/ModalContext";
import { MenuContainer, MenuList, MenuItem} from './KebabMenu.styled'
import DataService from "../../../services/DataService";

function KebabMenu(props) {
    const {jobId, toolingNum, location, showMenu} = {...props};
    const { modal, setModal } = useModal();
    const { setBoardKey } = useBoardKey();
    
    const handleEdit = ()=>{
        //TODO: open edit page
    }

    const handleDelete = ()=>{
        const modalConfig = {
            title: 'Confirm Delete',
            message: `Are you sure you want to delete ${toolingNum}?`,
            buttons: [
            {
                text: 'Cancel',
                className: 'btn-secondary',
                onClick: ()=>{
                    setModal({...modal, showModal: false});
                }
            },
            {
                text: 'Delete',
                className: 'btn-primary',
                onClick: async ()=>{
                    const result = await DataService.deleteJob(jobId);
                    if(result.data.success) {
                        setModal({...modal, showModal: false});
                        setBoardKey(Date.now()); // rerender board
                    }
                }
            }]
        };
        setModal({showModal: true, config: modalConfig});
    }

    return (
        <MenuContainer location={location} showMenu={showMenu}>
            <MenuList>
                <MenuItem onClick={()=>handleEdit()}>Edit</MenuItem>
                <MenuItem onClick={()=>handleDelete()}>Delete</MenuItem>
            </MenuList>
        </MenuContainer>
    );
}

export default KebabMenu;