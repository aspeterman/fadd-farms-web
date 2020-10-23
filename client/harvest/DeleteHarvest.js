import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import auth from '../auth/auth-helper'
import { remove } from './api-harvest.js'

export default function DeleteHarvest(props) {
  const [open, setOpen] = useState(false)

  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deleteHarvest = () => {
    remove({
      plantId: props.plantId,
      plotId: props.plot._id
    }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        props.onRemove(props.plot)
      }
    })
  }
  const handleRequestClose = () => {
    setOpen(false)
  }
  return (<span>
    <IconButton aria-label="Delete" onClick={clickButton} color="secondary">
      <DeleteIcon />
    </IconButton>
    <Dialog open={open} onClose={handleRequestClose}>
      <DialogTitle>{"Delete " + props.plot.name}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm to delete your plot.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestClose} color="primary">
          Cancel
          </Button>
        <Button onClick={deleteHarvest} color="secondary" autoFocus="autoFocus">
          Confirm
          </Button>
      </DialogActions>
    </Dialog>
  </span>)

}
DeleteHarvest.propTypes = {
  plantId: PropTypes.string.isRequired,
  plot: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}

