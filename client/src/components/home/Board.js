import React, { useState } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { BoardDiv } from '../styles/Board.styled'

function getTodaysDate() {
    var currentDate = new Date()
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    return "" + month + "/" + day + "/" + year;
}

const itemsFromBackend = [
    {
        id: 'T5255',
        dueDate: getTodaysDate(),
        customerName: 'Intel',
        partNumber: 'FG783274',
        revisionNumber: '8',
        jobType: 'PO Order',
        assignedTo: 'Osman Jan',
        jobInfoHighlight: '8 Layer / TK Material / Outsource'
    },
    {
        id: 'T5256',
        dueDate: getTodaysDate(),
        customerName: 'Intel',
        partNumber: 'FG783274',
        revisionNumber: '8',
        jobType: 'PO Order',
        assignedTo: 'Osman Jan',
        jobInfoHighlight: '8 Layer / TK Material / Outsource'
    },
    {
        id: 'T5257',
        dueDate: getTodaysDate(),
        customerName: 'Intel',
        partNumber: 'FG783274',
        revisionNumber: '8',
        jobType: 'PO Order',
        assignedTo: 'Osman Jan',
        jobInfoHighlight: '8 Layer / TK Material / Outsource'
    },
    {
        id: 'T5258',
        dueDate: getTodaysDate(),
        customerName: 'Intel',
        partNumber: 'FG783274',
        revisionNumber: '8',
        jobType: 'PO Order',
        assignedTo: 'Osman Jan',
        jobInfoHighlight: '8 Layer / TK Material / Outsource'
    }
];

const columnsFromBackend = {
    ['column-1']: {
        name: 'Engineering',
        items: itemsFromBackend
    },
    ['column-2']: {
        name: 'CAM Engineering',
        items: []
    },
    ['column-3']: {
        name: 'Product Engineering',
        items: []
    },
    ['column-4']: {
        name: 'Final Review',
        items: []
    },
    ['column-5']: {
        name: 'Hold',
        items: []
    }
};

const onDragEnd = (result, columns, setColumns) => {
    // if card is not dragged into another column, nothing should happen
    if (!result.destination) return;

    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId]
        const destColumn = columns[destination.droppableId]

        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];

        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed)
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems
            }
        })
    } else {
        const column = columns[source.droppableId]
        const copiedItems = [...column.items]
        //remove item from source column array
        const [removed] = copiedItems.splice(source.index, 1);
        //insert item into destination column array
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems
            }
        })
    }
};

function Board() {

    const [columns, setColumns] = useState(columnsFromBackend);

    return (
        <BoardDiv>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <Column id={id} column={column} />
                    );
                })}
            </DragDropContext>
        </BoardDiv>
    );
}

export default Board;