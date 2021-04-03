import { Collapse, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles } from '@material-ui/core'
import { Create, ExpandLess, ExpandMore, History } from '@material-ui/icons'
import React, { useState } from 'react'
import auth from '../auth/auth-helper'
import { remove } from './api-gardens'
import DeleteGarden from './DeleteGarden'

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

export default function GardensList(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = useState(false)
  const handleClickOpen = () => {
    setOpen(!open);
    // props.handleCreate()
  };

  const onRemove = (garden) => {
    const jwt = auth.isAuthenticated()
    remove({
      gardenId: garden._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        props.removeGarden(garden)
        handleRequestClose()
      }
    })
  }

  const handleRequestClose = () => {
    setOpenDelete(false)
  }

  const handleDeleteOpen = () => {
    setOpenDelete(true)
  }

  return (
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
        <ListItemText primary="Gardens" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {props.gardens.map(value => {
            return (
              <>

                <ListItem button className={classes.nested} value={value._id} key={value._id} onClick={() => props.handleClick(value._id)}>
                  {value.gardenName} - {value.season} {value.year}
                  <ListItemSecondaryAction>
                    <DeleteGarden
                      onRemove={onRemove}
                      gardenId={value._id}
                      garden={value}
                      handleRequestClose={handleRequestClose}
                      handleDeleteOpen={handleDeleteOpen}
                      openDelete={openDelete}
                    />
                  </ListItemSecondaryAction>
                </ListItem>

              </>
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
  )
}

