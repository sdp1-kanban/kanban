import React, { useState } from "react";
import { Draggable } from 'react-beautiful-dnd';
import { CardContainer, CardTitle, Row1, Row2, CardDueDate, Row2RightCol, Row2LeftCol, Row3, Table, ComboBox, JobShortDescription } from '../styles/Card.styled'

function Card(props) {
    return (
        //changed props.item.id to props.item._id for key= and draggableId= (KEEP THAT IN MIND)
        <Draggable key={props.item._id} draggableId={props.item._id} index={props.index}>
            {(provided, snapshot) => {
                return (
                    <CardContainer priority={props.item.priority}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{ ...provided.draggableProps.style }}>
                        <Row1>
                            <CardTitle to="/#">{props.item.toolingNum}</CardTitle>
                            <CardDueDate>Due: {props.item.dueDate.split('T')[0]}</CardDueDate>
                        </Row1>

                        <Row2>
                            <Table>
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
                                        <ComboBox name="names">
                                            <option value="Osman">Osman</option>
                                            <option value="Robin">Robin</option>
                                            <option value="Ayan">Ayan</option>
                                            <option value="Marianne">Marianne</option>
                                            <option value="Parisa">Parisa</option>
                                            <option value="Akino">Akino</option>
                                            <option value="Asylhan">Asylhan</option>
                                            <option value="Marwa">Marwa</option>
                                            <option value="Hamoun">Hamoun</option>
                                        </ComboBox>
                                    </td>

                                </tr>
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