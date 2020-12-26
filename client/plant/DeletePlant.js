import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React from 'react'

export default function DeletePlant(props) {

  return (<span>
    <IconButton aria-label="Delete" onClick={props.clickButton} color="secondary">
      <DeleteIcon />
    </IconButton>
    <Dialog open={props.open} onClose={props.handleRequestClose}>
      <DialogTitle>{"Delete this record"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Confirm to delete your plot.
          </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleRequestClose} color="primary">
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

