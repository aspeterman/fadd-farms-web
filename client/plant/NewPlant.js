import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import auth from './../auth/auth-helper'
import { create } from './api-plant.js'


const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: '#efefef',
        padding: `${theme.spacing(3)}px 0px 1px`
    },
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginBottom: theme.spacing(3),
        backgroundColor: 'rgba(65, 150, 136, 0.09)',
        boxShadow: 'none'
    },
    cardContent: {
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 0
    },
    cardHeader: {
        paddingTop: 8,
        paddingBottom: 8
    },
    photoButton: {
        height: 30,
        marginBottom: 5
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '90%'
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

export default function NewPlant(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [values, setValues] = useState({
        plantname: '',
        image: '',
        description: '',
        soil: '',
        spacing: '',
        plantHeight: '',
        pests: '',
        whenToPlant: '',
        careDuringGrowth: '',
        error: '',
        user: {},
        showNew: false
    })
    const jwt = auth.isAuthenticated()
    const handleChange = name => event => {
        const value = name === 'image'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    useEffect(() => {
        setValues({ ...values, user: auth.isAuthenticated().user })
    }, [])
    const clickPlant = () => {
        let postData = new FormData()
        values.plantname && postData.append('plantname', values.plantname)
        values.description && postData.append('description', values.description)
        values.careDuringGrowth && postData.append('careDuringGrowth', values.careDuringGrowth)
        values.whenToPlant && postData.append('whenToPlant', values.whenToPlant)
        values.spacing && postData.append('spacing', values.spacing)
        values.pests && postData.append('pests', values.pests)
        values.plantHeight && postData.append('plantHeight', values.plantHeight)
        values.soil && postData.append('soil', values.soil)
        values.image && postData.append('image', values.image)
        create({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, postData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, plantname: '', description: '', careDuringGrowth: '', whenToPlant: '', pests: '', plantHeight: '', soil: '', image: '', showNew: false })
                props.addUpdate(data)
                setOpen(false)
            }
        })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const photoURL = values.user._id ? '/api/users/photo/' + values.user._id : '/api/users/defaultphoto'
    return (<div className={classes.root}>
        <Button variant="outlined" color="primary" className={classes.button} onClick={handleClickOpen}>
            New Plant
      </Button>
        {props.showing === 'active' ?
            <Button variant="outlined" color="primary" value="all" className={classes.button} onClick={props.handleShowAll}>Show All</Button>
            :
            <Button variant="outlined" color="primary" value="active" className={classes.button} onClick={props.handleShowActive}>Show Active</Button>
        }
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Plant</DialogTitle>
            <DialogContent>
                <TextField
                    placeholder="Plant Name"
                    autoFocus
                    value={values.plantname}
                    onChange={handleChange('plantname')}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    placeholder="Description"
                    multiline
                    rows="3"
                    value={values.description}
                    onChange={handleChange('description')}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    placeholder="When To Plant"
                    multiline
                    rows="1"
                    value={values.whenToPlant}
                    onChange={handleChange('whenToPlant')}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    placeholder="Care During Growth"
                    multiline
                    rows="1"
                    value={values.careDuringGrowth}
                    onChange={handleChange('careDuringGrowth')}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    placeholder="Plant Height"
                    multiline
                    rows="1"
                    value={values.plantHeight}
                    onChange={handleChange('plantHeight')}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    placeholder="Soil Requirements"
                    multiline
                    rows="1"
                    value={values.soil}
                    onChange={handleChange('soil')}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    placeholder="Plant Spacing"
                    multiline
                    rows="1"
                    value={values.spacing}
                    onChange={handleChange('spacing')}
                    className={classes.textField}
                    margin="normal"
                />
                <TextField
                    placeholder="pests"
                    multiline
                    rows="1"
                    value={values.pests}
                    onChange={handleChange('pests')}
                    className={classes.textField}
                    margin="normal"
                />
                {/* <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="secondary" className={classes.photoButton} component="span">
                        <PhotoCamera />
                    </IconButton>
                </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span> */}
                <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
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
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" disabled={values.plantname === ''} onClick={clickPlant} className={classes.submit}>POST</Button>
            </DialogActions>
        </Dialog>
    </div>)

}

NewPlant.propTypes = {
    addUpdate: PropTypes.func.isRequired
}

