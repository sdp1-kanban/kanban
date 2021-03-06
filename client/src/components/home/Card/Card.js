import React, { useEffect, useState, useRef } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { CardContainer, CardTitle, Row1, Row2, CardDueDate, Row2RightCol, Row2LeftCol, Row3, Table, ComboBox, JobShortDescription, MenuButton, CardHeader } from './Card.styled';
import KebabMenu from "../KebabMenu/KebabMenu";
import DataService from "../../../services/DataService";

let options = [];

function getEmployeesNames() {
    let names = [];
    // get all employess
    const fetchData = async () => {
        const result = await DataService.getEmployees();
        if (result.data.success) {
            const employees = result.data.data;            
            names = employees.map(a => a.name);
            names.forEach(element => {
                options.push(<option value={element}>{element}</option>);
            });
        }
    };
    fetchData();
}
getEmployeesNames()

function Card(props) {
    const [menuLocation, setMenuLocation] = useState({pageX: 0, pageY: 0});
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);

    const handleMenuClicked = (e) => {  
        setMenuLocation({pageX: e.pageX, pageY: e.pageY});
        setShowMenu(true);
    }
    
    const handleOutsideClick = (e) => {
        if(!menuRef.current?.contains(e.target)) {
            setShowMenu(false);
        } 
    }
    
    useEffect(() => {
        window.addEventListener('click', handleOutsideClick);
        return () => {window.removeEventListener('click', handleOutsideClick)};
    },[]);
    
    return (
        <Draggable key={props.item._id} draggableId={props.item._id} index={props.index}>
            {(provided, snapshot) => {
                return (
                    <CardContainer priority={props.item.priority}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style }}>
                        <CardHeader>
                            <div ref={menuRef}>
                                <MenuButton onClick={(e)=>{handleMenuClicked(e)}}>...</MenuButton>
                            </div>
                        </CardHeader>
                        <KebabMenu showMenu={showMenu} job={props.item} toolingNum={props.item.toolingNum} location={menuLocation}/>
                        <Row1>
                            <CardTitle to={"/jobs/"+props.item._id}>{props.item.toolingNum}</CardTitle>
                            <CardDueDate>Due: {props.item.dueDate.split('T')[0]}</CardDueDate>
                        </Row1>

                        <Row2>
                            <Table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <Row2LeftCol>Customer: {props.item.customerName}</Row2LeftCol>
                                        </td>
                                        <td>
                                            <Row2RightCol>{props.item.jobType}</Row2RightCol>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td><Row2LeftCol>Part #: {props.item.partNum}</Row2LeftCol></td>
                                    </tr>
                                    <tr>
                                        <td><Row2LeftCol>Revision #: {props.item.revisionNum}</Row2LeftCol></td>
                                        <td>
                                            Assigned To: {props.item.assignedTo}
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Row2>

                        <Row3>
                            <JobShortDescription>{props.item.jobShortDesc}</JobShortDescription>
                        </Row3>
                    </CardContainer>
                )
            }}
        </Draggable>
    );
}

export default Card;