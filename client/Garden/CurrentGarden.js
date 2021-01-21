import { Divider, IconButton, makeStyles, Typography } from "@material-ui/core";
import { Info } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";
import auth from "../auth/auth-helper";

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        margin: 40,
    },
    gardenGrid: {
        // display: 'flex',
        // width: '200px',
        border: '1px solid grey',
        borderRadius: '25%',
        marginBottom: '2 px',
        padding: theme.spacing(3),
        overflow: 'hidden'
    },
    item: {
        display: 'flex',
        justifyContent: "space-around",
        marginBottom: theme.spacing(3),
        // borderRadius: '25%',
        border: '2px blue',
        overflowX: 'clip',
        margin: theme.spacing(1),
        backgroundColor: 'grey'
    },
    text: {
        // paddingRight: 20,
        // display: "flex",
        maxWidth: 20
    },
    button: {
        justifyContent: 'right',
        // minWidth: '20px',
        // height: '30px',
        // padding: '0 8px',
        // marginBottom: '20px'
        // margin: theme.spacing(1)
    },
    card: {
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(3),
        backgroundColor: 'rgba(0, 0, 0, 0.06)',
        // width: 300,
        overflow: 'hidden',
    },
    cardContent: {
        display: 'flex',
        // backgroundColor: 'white',
        margin: theme.spacing(2),
        textAlign: 'center',
        // height: 250
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

export default function CurrentGarden(props) {
    const classes = useStyles()

    const jwt = auth.isAuthenticated()
    const history = useHistory()
    const handleGoForward = (id) => {
        const url = `/plants/${id}`
        history.push(url)
    }

    if (props.values.loading) return <></>
    return (


        <div className={classes.root}>
            {props.values.currentGarden.rows.map((el, ind) => (
                <div                 >
                    {ind + 1}
                    {
                        el.map((item, index) => (
                            <div
                                key={item._id}
                                draggableId={item._id}
                                index={index}
                                className={classes.item}
                            >
                                <div className={classes.cardContent}>
                                    <Typography className={classes.text} style={{ fontSize: 20 }}>
                                        {item.plantname}
                                    </Typography>
                                    <IconButton color='secondary' onClick={() => handleGoForward(item._id)}><Info /></IconButton>
                                    {/* </div>
                                <div className={classes.button}> */}
                                </div>
                                <div
                                    className={classes.root}
                                >
                                    {/* <div className={classes.item}> */}

                                    <div className={classes.cardContent}>
                                        {item.active ? <Typography className={classes.text} style={{ color: 'lightgreen' }}>Active</Typography> : <Typography className={classes.text} style={{ color: 'red' }}>Inactive</Typography>}</div>
                                    <Divider />


                                    {/* </div> */}
                                </div>
                            </div>
                        ))
                    }
                </div>
            ))
            }
        </div >

    );
}
