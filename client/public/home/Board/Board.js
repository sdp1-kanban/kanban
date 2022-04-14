import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../Column/Column';
import { BoardDiv } from './Board.styled'
import DataService from "../../../services/DataService";
import { useBoardKey } from "../../../contexts/BoardContext";

const columnsFromBackend = {
    ['ENGINEERING']: {
        name: 'Engineering',
        items: []
    },
    ['CAM ENGINEERING']: {
        name: 'CAM Engineering',
        items: []
    },
    ['PRODUCT ENGINEERING']: {
        name: 'Product Engineering',
        items: []
    },
    ['FINAL REVIEW']: {
        name: 'Final Review',
        items: []
    },
    ['HOLD']: {
        name: 'Hold',
        items: []
    }
};


function Board() {
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
            fetchJobAndUpdate(result);
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
    
    function fetchJobAndUpdate(jobData) {
        let fetchedJob = {};
        let jobId = jobData.draggableId;
    
        const fetchJob = async () => {
            const result = await DataService.getJob(jobId);
            if (result.data.success) {
                fetchedJob = result.data.data;
                updateJobColumn(fetchedJob, jobData);
            }
        };
        fetchJob();
    }
    
    function updateJobColumn(job, jobCol) {
        let updatedJob = {
            ...job,
            column: jobCol.destination.droppableId
        };
    
        const updateJob = async () => {
            const result = await DataService.updateJob(job._id, updatedJob);
            if(!result.data.success){
                console.warn('Failed to update job column')
            } else {
                // Rerender board so that the job object has the new column
                setBoardKey(Date.now());
            }
        }
        updateJob();
    }
    
    function displayJobs(items, setColumns) {
    
        let engineeringColumn = [];
        let camColumn = [];
        let productColumn = [];
        let finalColumn = [];
        let holdColumn = [];
    
        for (var i = 0; i < items.length; i++) {
            if (items[i].column.toUpperCase() === 'ENGINEERING') engineeringColumn.push(items[i]);
            if (items[i].column.toUpperCase() === 'CAM ENGINEERING') camColumn.push(items[i]);
            if (items[i].column.toUpperCase() === 'PRODUCT ENGINEERING') productColumn.push(items[i]);
            if (items[i].column.toUpperCase() === 'FINAL REVIEW') finalColumn.push(items[i]);
            if (items[i].column.toUpperCase() === 'HOLD') holdColumn.push(items[i]);
        }
    
        setColumns({
            ['ENGINEERING']: {
                name: 'Engineering',
                items: engineeringColumn
            },
            ['CAM ENGINEERING']: {
                name: 'CAM Engineering',
                items: camColumn
            },
            ['PRODUCT ENGINEERING']: {
                name: 'Product Engineering',
                items: productColumn
            },
            ['FINAL REVIEW']: {
                name: 'Final Review',
                items: finalColumn
            },
            ['HOLD']: {
                name: 'Hold',
                items: holdColumn
            }
        });
    }
    const [columns, setColumns] = useState(columnsFromBackend);
    const {boardKey, setBoardKey} = useBoardKey();

    useEffect(() => {
        const fetchData = async () => {
            const result = await DataService.getAllUnfinishedJobs();
            if (result.data.success) {
                const jobs = result.data.data;
                displayJobs(jobs, setColumns);
            }
        };
        fetchData();
    }, [boardKey]);

    return (
        <BoardDiv>
            <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {Object.entries(columns).map(([id, column]) => {
                    return (
                        <Column id={id} column={column} key={id}/>
                    );
                })}
            </DragDropContext>
        </BoardDiv> 
    );
}

export default Board;