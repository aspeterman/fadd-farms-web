import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import React, { useState } from 'react'
import auth from '../auth/auth-helper'
import { create, update } from './api-garden'

const useStyles = makeStyles(theme => ({
    root: {
        marginBottom: 40,
        display: 'flex',
        justifyContent: 'space-around',
        flexGrow: 1,
        backgroundColor: '#efefef',
        padding: `${theme.spacing(3)}px 0px 1px`,
    },
    photoButton: {
        height: 30,
        marginBottom: 5
    },
    input: {
        display: 'none',
    },
    textField: {
        // marginLeft: theme.spacing(2),
        // marginRight: theme.spacing(2),
        // width: '90%'
    },
    submit: {
        margin: theme.spacing(2)
    },
    filename: {
        verticalAlign: 'super'
    },
    button: {
        marginBottom: theme.spacing(2)
    }
}))

export default function NewGarden(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        year: 2021,
        season: 'Fall',
        image: '',
        rows: [],
        error: '',
        gardenId: ''
    })
    const [open, setOpen] = useState(false)

    const jwt = auth.isAuthenticated()
    const clickSubmit = () => {

        let gardenData = new FormData()
        props.gardenScheme && gardenData.append('gardenScheme', props.gardenScheme)
        values.season && gardenData.append('season', values.season)
        values.year && gardenData.append('year', values.year)
        values.image && gardenData.append('image', values.image)
        console.log(gardenData)
        create({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, gardenData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                // setOpen(false)
                setValues({ ...values, gardenId: data._id })
            }
        })
    }

    const handleChange = name => event => {
        const value = name === 'image'
            ? event.target.files[1]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    const clickUpdate = () => {
        console.log(values)
        update({
            userId: jwt.user._id,
            gardenId: values.gardenId
        }, { t: jwt.token }, props.plants).then((data) => {
            if (data.error)
                setValues({ ...values, error: data.error })
            else {
                setOpen(false)
                props.addGarden(data)
                props.handleShowGarden()
            }
        })
    }

    const handleClickOpen = () => {
        setOpen(true)
        // setValues({ ...values, rows: props.plants })
        clickSubmit()
    }
    const handleClose = () => {
        setOpen(false)
    }


    return (<>
        <div style={{ textAlign: 'center' }}>
            <Button variant="outlined" color="primary" className={classes.button} onClick={handleClickOpen}>
                Save Layout
      </Button>
        </div>
        <div className={classes.root}>
            {/* <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Save</DialogTitle>
            <DialogContent> */}
            <div className={classes.textField}>
                <InputLabel id="season-select">Season</InputLabel>
                <Select value={values.season} labelId="season-select" name='season' onChange={handleChange('season')} >
                    <MenuItem value={'Fall'}>Fall</MenuItem>
                    <MenuItem value={'Spring'}>Spring</MenuItem>
                </Select>
            </div>
            <div className={classes.textField}>
                <TextField
                    placeholder="Year"
                    type="number"
                    name='year'
                    value={values.year}
                    onChange={handleChange('year')}
                    // className={classes.textField}
                    margin="normal"
                />
            </div>
            <input accept="image/*" onChange={props.handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
            <label htmlFor="icon-button-file">
                <Button variant="contained" color="secondary" component="span">
                    Upload Photo
              <FileUpload />
                </Button>
            </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br />
            {values.error && (<Typography component="p" color="error">
                <Icon color="error" className={classes.error}>error</Icon>
                {values.error}
            </Typography>)
            }
        </div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Save</DialogTitle>
            <DialogContent>
                <Typography className={classes.textField}>Confirm Submission</Typography>
            </DialogContent>
            <DialogActions>
                {/* <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button> */}
                <Button color="primary" variant="contained" onClick={clickUpdate} className={classes.submit}>Submit</Button>
            </DialogActions>
        </Dialog>
    </>
    )
}