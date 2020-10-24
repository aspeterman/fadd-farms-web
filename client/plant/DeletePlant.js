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
import { remove } from './api-plant.js'

export default function DeletePlant(props) {
  const [open, setOpen] = useState(false)

  const jwt = auth.isAuthenticated()
  const clickButton = () => {
    setOpen(true)
  }
  const deletePlant = () => {
    remove({
      plantId: props.plantId,
    }, { t: jwt.token }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setOpen(false)
        props.onRemove(props.plant)
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
      <DialogTitle>{"Delete this record"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm to delete your plot.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRequestClose} color="primary">
          Cancel
          </Button>
        <Button onClick={props.onRemove} color="secondary" autoFocus="autoFocus">
          Confirm
          </Button>
      </DialogActions>
    </Dialog>
  </span>)

}
DeletePlant.propTypes = {
  plantId: PropTypes.string.isRequired,
  plant: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}

