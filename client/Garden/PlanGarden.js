import { Button, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Delete, Info } from "@material-ui/icons";
import { indexOf } from "lodash";
import PropTypes from 'prop-types';
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        // flexGrow: 1,
        // margin: 40,
        flexWrap: 'wrap',
        // height: 400,
        // overflow: 'scroll'
    },
    gardenGrid: {
        // width: '200px',
        border: '1px solid grey',
        // borderRadius: '25%',
        marginBottom: '2 px',
        // backgroundColor: 'green',
        padding: theme.spacing(3),
        overflowY: 'scroll',
        height: 500,
        // flexWrap: 'wrap'
        '&::-webkit-scrollbar': {
            width: '0.4em',
        },
        '&::-webkit-scrollbar-track': {
            // '-webkit-box-shadow': 'inset 0 0 6px #aaaaaa'
            background: '#ffffff',
            borderRadius: '10px',
            boxShadow: 'inset 7px 10px 12px #f0f0f0'
        },
        '&::-webkit-scrollbar-thumb': {
            // backgroundColor: 'rgba(0,0,0,.1)',
            // outline: '1px solid slategrey'
            background: 'linear-gradient(13deg, #D4FFEC 14%,#c7ceff 64%)',
            borderRadius: '10px'
        },
        '&::-webkit-scrollbar-thumb:hover': {
            background: `linear-gradient(13deg, #c7ceff 14%,#f9d4ff 64%)`
        },
    },
    item: {
        display: 'flex',
        justifyContent: "space-around",
        marginBottom: theme.spacing(3),
        borderRadius: '25%',
        border: '2px light blue',
        overflowX: 'clip'
    },
    text: {
        paddingRight: 20,
        display: "flex",
        maxWidth: 20
    },
    button: {
        // justifyContent: 'right',
        // minWidth: '20px',
        height: '30px',
        // padding: '0 8px',
        marginBottom: '20px'
    },
}))

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? "lightgreen" : "grey",

    ...draggableStyle
});
const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
});

export default function PlanGarden(props) {
    const classes = useStyles()
    const history = useHistory()


    const handleGoForward = (id) => {
        history.push(`/plants/${id}`)
    }

    return (
        <div>
            <Button
                variant='outlined'
                onClick={() => {
                    props.handleSetPlants([...props.plants, []]);
                }}
            >
                Add new row
      </Button>
            <div className={classes.root}>
                <DragDropContext onDragEnd={props.onDragEnd}>
                    {props.plants.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                    className={classes.gardenGrid}
                                >
                                    <Typography style={{ textAlign: 'center' }}>Row {indexOf(props.plants, el) + 1}</Typography>

                                    {el.map((item, index) => (
                                        <Draggable
                                            key={item._id}
                                            draggableId={item._id}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    style={getItemStyle(
                                                        snapshot.isDragging,
                                                        provided.draggableProps.style
                                                    )}
                                                >
                                                    <div
                                                        className={classes.item}
                                                    >
                                                        <Typography className={classes.text}>
                                                            {item.plantname}
                                                        </Typography><br />
                                                        {item.active ? <Typography style={{ color: 'lightgreen', textAlign: 'center' }}>Active</Typography> : <Typography style={{ color: 'red', textAlign: 'center' }}>Inactive</Typography>}
                                                        <div className={classes.button}>
                                                            <IconButton
                                                                color='secondary'
                                                                onClick={() => {
                                                                    const newPlants = [...props.plants];
                                                                    newPlants[ind].splice(index, 1);
                                                                    props.handleSetPlants(
                                                                        newPlants.filter(group => group.length)
                                                                    );
                                                                }}
                                                            >
                                                                <Delete />
                                                            </IconButton>
                                                            <IconButton color='primary' onClick={() => handleGoForward(item._id)}><Info /></IconButton>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ))}
                </DragDropContext>
            </div>
        </div>
    );
}

PlanGarden.propTypes = {
    plants: PropTypes.array.isRequired,
}