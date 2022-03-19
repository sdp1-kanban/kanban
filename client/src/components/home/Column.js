import React, { useState } from "react";
import { Droppable } from 'react-beautiful-dnd';
import Card from "./Card";
import { ColumnTitle, ColumnDiv } from '../styles/Column.styled'

function Column(props) {
    return (
        <div>
            <div style={{ margin: 15 }}>
                <Droppable droppableId={props.id}>
                    {(provided, snapshot) => {
                        return (
                            <ColumnDiv snapshot={snapshot} {...provided.droppableProps} ref={provided.innerRef}>
                                <ColumnTitle name={props.column.name}>
                                    {props.column.name}
                                </ColumnTitle>

                                {props.column.items.map((item, index) => {
                                    return (
                                        <Card item={item} index={index} />
                                    );
                                })}
                                {provided.placeholder}
                            </ColumnDiv>
                        )
                    }}
                </Droppable>
            </div>
        </div>
    );
}

export default Column;