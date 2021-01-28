import { Divider, IconButton, makeStyles, Typography } from "@material-ui/core";
import { ArrowLeft, ArrowRight, Info } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";

const useStyles = makeStyles(theme => ({
    // root: {
    //     display: 'flex',
    //     flexGrow: 1,
    //     margin: 40,
    // },
    // gardenGrid: {
    //     // display: 'flex',
    //     // width: '200px',
    //     border: '1px solid grey',
    //     borderRadius: '25%',
    //     marginBottom: '2 px',
    //     padding: theme.spacing(3),
    //     overflow: 'hidden'
    // },
    // item: {
    //     display: 'flex',
    //     justifyContent: "space-around",
    //     marginBottom: theme.spacing(3),
    //     // borderRadius: '25%',
    //     border: '2px blue',
    //     overflowX: 'clip',
    //     margin: theme.spacing(1),
    //     backgroundColor: 'grey'
    // },
    // text: {
    //     // paddingLeft: 20,
    //     // display: "flex",
    //     // minWidth: 20
    //     textAlign: 'center'
    // },
    // button: {
    //     justifyContent: 'right',
    //     // minWidth: '20px',
    //     // height: '30px',
    //     // padding: '0 8px',
    //     // marginBottom: '20px'
    //     // margin: theme.spacing(1)
    // },
    // card: {
    //     marginTop: theme.spacing(2),
    //     marginBottom: theme.spacing(3),
    //     backgroundColor: 'rgba(0, 0, 0, 0.06)',
    //     // width: 300,
    //     overflow: 'hidden',
    // },
    // cardContent: {
    //     display: 'flex',
    //     // backgroundColor: 'white',
    //     margin: theme.spacing(2),
    //     textAlign: 'center',
    //     // height: 250
    // },
    root: {
        display: 'flex',
        flexGrow: 1,
        margin: 40,
        justifyContent: "space-around",
    },
    gardenGrid: {
        width: '200px',
        border: '1px solid grey',
        borderRadius: '25%',
        marginBottom: '2 px',
        padding: theme.spacing(3),
        overflow: 'hidden'
    },
    item: {
        display: 'flex',
        justifyContent: "space-around",
        // marginBottom: theme.spacing(3),
        margin: `${theme.spacing(1)}px `,
        border: '2px solid black',
        borderRadius: '5%',
        overflowX: 'hidden',
        backgroundColor: '#6CE666',
        '&:hover': {
            overflowX: 'visible'
        }
    },
    text: {
        marginLeft: `${theme.spacing(3)}px`,
        paddingRight: 20,
        display: "flex",
        maxWidth: 20,
        overflowX: 'clip',
    },
    button: {
        // justifyContent: 'right',
        // minWidth: '20px',
        height: '30px',
        // padding: '0 8px',
        marginBottom: '20px'
    },
}))


export default function CurrentGarden(props) {
    const classes = useStyles()
    const history = useHistory()
    const handleGoForward = (id) => {
        const url = `/plants/${id}`
        history.push(url, { from: "GardenHome" })
    }




    if (props.values.loading) return <></>
    return (
        <>
            <div style={{ textAlign: 'center' }}>
                <IconButton disabled={props.values.currentPage === 1} onClick={props.pageDown}><ArrowLeft /></IconButton>
                {props.values.currentPage}
                <IconButton disabled={props.values.offset + 5 >= props.values.currentGarden.rows.length} onClick={props.pageUp}><ArrowRight /></IconButton>
            </div>
            <div className={classes.root}>
                {props.values.currentGarden.rows && props.values.currentGarden.rows.slice(props.values.offset, props.values.offset + props.values.limit).map((el, ind) => (
                    <div key={ind} >
                        <Typography className={classes.text}>
                            Row: {ind + 1}
                        </Typography>
                        {
                            el.map((item, index) => (
                                <div
                                    key={item._id}
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
                                            {item.active ? <Typography className={classes.text} style={{ color: '#F1FCA1' }}>Active</Typography> : <Typography className={classes.text} style={{ color: 'red' }}>Inactive</Typography>}</div>
                                        <Divider />


                                        {/* </div> */}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                ))
                }
            </div>
        </ >
    )
}
