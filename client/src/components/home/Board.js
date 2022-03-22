import React, { useState, useEffect } from "react";
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';
import { BoardDiv } from '../styles/Board.styled'
import DataService from "../../services/DataService";

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
    const jobId = jobData.draggableId;

    const url = 'http://localhost:3001/api/job/' + jobId;
    fetch(url)
        .then(resp => {if(resp.ok){ return resp.json()}})
        .then(resp => {
            fetchedJob = resp.data;
            updateJobColumn(fetchedJob, jobData);
        })
        .catch((error) => { console.error("Failed to fetch job, error: " + error) });
}

function updateJobColumn(job, jobCol) {
    let updatedJob = {
        ...job,
        column: jobCol.destination.droppableId
    };

    fetch('http://localhost:3001/api/job/' + job._id, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedJob)
    }).then(() => { console.log('Jobs column updated successfully');});
}

function fetchAllJobs(items, setColumns) {

    let engineeringColumn = [];
    let camColumn = [];
    let productColumn = [];
    let finalColumn = [];
    let holdColumn = [];

    console.log(items);

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


function Board() {

    //TODO
    /*
        update mongoose schema to include column, assigned to field - DONE
        figure out the id thing for the jobs (make it used _id instead) - DONE
        update onDragEnd function to update column field in db
        update onDragEnd to save index of card positions in each column (maybe use a sort method on the array?)
    */
    const [columns, setColumns] = useState(columnsFromBackend);

<<<<<<< Updated upstream
    useEffect(()=>{
        const fetchData = async () => {
            const result = await DataService.getAllUnfinishedJobs()
            if (result.data.success) {
                const jobs = result.data.data;
                // TODO: Sort jobs into columns and call setColumns
            } 
          };
          fetchData();
    },[]);
=======
    useEffect(() => {
        let cancel = false;
        const url = 'http://localhost:3001/api/jobs';
        fetch(url)
            .then(resp => resp.json())
            .then((data) => {
                if (!cancel) {
                    fetchAllJobs(data, setColumns)
                }
            });
        return () => { cancel = true; }
    }, []);
>>>>>>> Stashed changes

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