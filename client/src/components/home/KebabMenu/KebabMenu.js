import React from "react";
import { MenuContainer, MenuList, MenuItem} from './KebabMenu.styled'

function KebabMenu(props) {
    const {jobId, location, showMenu} = {...props};

    const handleEdit = ()=>{
        //TODO: open edit page
    }

    const handleDelete = ()=>{
        //TODO: confirm and process delete
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