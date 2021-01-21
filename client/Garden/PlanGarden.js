import { IconButton, makeStyles, Typography } from "@material-ui/core";
import { Delete, Info } from "@material-ui/icons";
import PropTypes from 'prop-types';
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        margin: 40,
    },
    gardenGrid: {
        width: '200px',
        border: '1px solid grey',
        borderRadius: '25%',
        marginBottom: '2 px',
        // backgroundColor: 'green',
        padding: theme.spacing(3),
        overflow: 'hidden'
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

// fake data generator
// const getItems = (count, offset = 0) =>
//     Array.from({ length: count }, (v, k) => k).map(k => ({
//         id: `item-${k + offset}-${new Date().getTime()}`,
//         content: `item ${k + offset}`
//     }));


// const reorder = (list, startIndex, endIndex) => {
//     const result = Array.from(list);
//     const [removed] = result.splice(startIndex, 1);
//     result.splice(endIndex, 0, removed);

//     return result;
// };

// const move = (source, destination, droppableSource, droppableDestination) => {
//     const sourceClone = Array.from(source);
//     const destClone = Array.from(destination);
//     const [removed] = sourceClone.splice(droppableSource.index, 1);

//     destClone.splice(droppableDestination.index, 0, removed);

//     const result = {};
//     result[droppableSource.droppableId] = sourceClone;
//     result[droppableDestination.droppableId] = destClone;

//     return result;
// };
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
    // const getPlants = () =>
    //     props.plants && props.plants.map(k => ({
    //         id: k._id,
    //         content: k.plantname
    //     }));

    // const [state, setPlants] = useState([getPlants()]);
    // const [plants, setPlants] = useState([])
    // useEffect(() => {
    //     const jwt = auth.isAuthenticated()
    //     const abortController = new AbortController()
    //     const signal = abortController.signal
    //     listPlants({
    //         userId: jwt.user._id,
    //     }, { t: jwt.token }, signal).then((data) => {
    //         if (data.error)
    //             console.log(data.error)
    //         else {
    //             setPlants([data.plants])
    //         }
    //     })
    //     getPlants(1)
    //     return function cleanup() {
    //         abortController.abort()
    //     }

    // }, [])



    // function onDragEnd(result) {
    //     const { source, destination } = result;

    //     if (!destination) {
    //         return;
    //     }
    //     const sInd = +source.droppableId;
    //     const dInd = +destination.droppableId;

    //     if (sInd === dInd) {
    //         const items = reorder(plants[sInd], source.index, destination.index);
    //         const newPlants = [...plants];
    //         newPlants[sInd] = items;
    //         setPlants(newPlants);
    //     } else {
    //         const result = move(plants[sInd], plants[dInd], source, destination);
    //         const newPlants = [...plants];
    //         newPlants[sInd] = result[sInd];
    //         newPlants[dInd] = result[dInd];

    //         setPlants(newPlants.filter(group => group.length));
    //     }
    // }

    const handleGoForward = (id) => {
        history.push(`/plants/${id}`)
    }

    return (
        <div>
            <button
                type="button"
                onClick={() => {
                    props.handleSetPlants([...props.plants, []]);
                }}
            >
                Add new group
      </button>
            <div className={classes.root}>
                <DragDropContext onDragEnd={props.onDragEnd}>
                    {props.plants.map((el, ind) => (
                        <Droppable key={ind} droppableId={`${ind}`}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    style={getListStyle(snapshot.isDraggingOver)}
                                    {...provided.droppableProps}
                                >
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