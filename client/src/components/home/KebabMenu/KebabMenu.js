import React, {useContext} from "react";
import { ModalContext } from "../../../Context";
import { MenuContainer, MenuList, MenuItem} from './KebabMenu.styled'
import DataService from "../../../services/DataService";

function KebabMenu(props) {
    const {jobId, location, showMenu} = {...props};
    const { modal, setModal } = useContext(ModalContext);
    
    const handleEdit = ()=>{
        //TODO: open edit page
    }

    const handleDelete = ()=>{
        const modalConfig = {
            title: 'Confirm Delete',
            message: `Are you sure you want to delete job ${jobId}?`,
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
                        // TODO: update ui after delete
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