import { Collapse, Divider, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles } from '@material-ui/core'
import { Create, ExpandLess, ExpandMore, History } from '@material-ui/icons'
import React, { useState } from 'react'
import { useHistory } from 'react-router'
import auth from '../auth/auth-helper'
import { getOne, remove } from './api-garden'
import CurrentGarden from './CurrentGarden'
import DeleteGarden from './DeleteGarden'
import GardenCommentDrawer from './GardenCommentDrawer'

const useStyles = makeStyles(theme => ({
    root: {
        // display: 'flex',
        // flexGrow: 1,
        margin: theme.spacing(3),
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
        border: '1px solid grey',
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
    list: {
        marginBottom: theme.spacing(3),
        float: 'left',
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
    nested: {
        paddingLeft: theme.spacing(4),
    },
}))

export default function MyGarden(props) {
    const classes = useStyles()
    const history = useHistory()
    const [openDelete, setOpenDelete] = useState(false)
    const [values, setValues] = useState({
        garden: [],
        currentGarden: [],
        comments: [],
        gardenId: '',
        loading: true,
        offset: 0,
        currentPage: 1,
        limit: 5,
        showCurrent: false
    })

    const jwt = auth.isAuthenticated()


    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(!open);
        // props.handleCreate()
    };



    // const handleGoForward = (item) => {
    //     const url = `/garden/${item._id}`
    //     history.push(url)
    // }
    const handleClick = (e) => {
        setValues({ ...values, gardenId: e })
        const abortController = new AbortController()
        const signal = abortController.signal
        getOne({
            gardenId: e
        }, { t: jwt.token }, signal).then((data) => {
            if (data & data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, currentGarden: data, comments: data.comments, gardenId: data._id, loading: false })
                setOpen(false)
            }
        })
        props.handleShowGarden()
    }

    const clickButton = () => {
        setOpenDelete(true)
    }

    const handleRequestClose = () => {
        setOpenDelete(false)
    }
    const deleteGarden = (garden) => {
        remove({
            gardenId: garden._id
        }, {
            t: jwt.token
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, currentGarden: [] })
                props.onRemove(garden)
                handleRequestClose()
            }
        })
    }

    const pageUp = () => {
        setValues({ ...values, offset: values.offset + values.limit, currentPage: values.currentPage + 1 })
    }
    const pageDown = () => {
        setValues({ ...values, offset: values.offset - values.limit, currentPage: values.currentPage - 1 })
    }

    const updateComments = (comments) => {
        setValues({ ...values, comments: comments })
    }

    return (
        <>

            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
                subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                        Your Gardens
        </ListSubheader>
                }
                className={classes.root}
            >

                <ListItem button onClick={handleClickOpen}>
                    <ListItemIcon>
                        <History />
                    </ListItemIcon>
                    <ListItemText primary="History" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {props.gardens.map(item => {
                            return (
                                <ListItem button className={classes.nested} value={item._id} key={item._id} onClick={() => handleClick(item._id)}>
                                    {item.season} - {item.year}
                                    <ListItemSecondaryAction>
                                        <DeleteGarden
                                            garden={item}
                                            gardenId={item._id}
                                            clickButton={clickButton}
                                            handleRequestClose={handleRequestClose}
                                            open={openDelete}
                                            onRemove={() => deleteGarden(item)} />
                                    </ListItemSecondaryAction>
                                </ListItem>
                            )
                        })}
                    </List>
                </Collapse>
                <ListItem button onClick={props.handleCreate}>
                    <ListItemIcon>
                        <Create />
                    </ListItemIcon>
                    <ListItemText primary="New Layout" />
                </ListItem>
            </List>
            <Divider />
            {props.values.showing &&
                <>
                    <GardenCommentDrawer updateComments={updateComments} gardenId={values.gardenId} comments={values.comments} />
                    <CurrentGarden values={values} handleClick={handleClick} pageUp={pageUp} pageDown={pageDown} />
                </>
            }
        </>
    )
}