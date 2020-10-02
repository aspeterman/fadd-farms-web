import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
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
    }
}))

export default function NewPlant(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        plantname: '',
        text: '',
        photo: '',
        description: '',
        soil: '',
        spacing: '',
        plantHeight: '',
        pests: '',
        whenToPlant: '',
        careDuringGrowth: '',
        error: '',
        user: {}
    })
    const jwt = auth.isAuthenticated()
    useEffect(() => {
        setValues({ ...values, user: auth.isAuthenticated().user })
    }, [])
    const clickPlant = () => {
        let postData = new FormData()
        postData.append('plantname', values.plantname)
        postData.append('description', values.description)
        postData.append('careDuringGrowth', values.careDuringGrowth)
        postData.append('whenToPlant', values.whenToPlant)
        postData.append('spacing', values.spacing)
        postData.append('pests', values.pests)
        postData.append('plantHeight', values.plantHeight)
        postData.append('soil', values.soil)
        postData.append('text', values.text)
        postData.append('photo', values.photo)
        create({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, postData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, plantname: '', text: '', photo: '' })
                props.addUpdate(data)
            }
        })
    }
    const handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }
    const photoURL = values.user._id ? '/api/users/photo/' + values.user._id : '/api/users/defaultphoto'
    return (<div className={classes.root}>
        <Card className={classes.card}>
            <CardHeader
                avatar={
                    <Avatar src={photoURL} />
                }
                title={values.user.name}
                className={classes.cardHeader}
            />
            <CardContent className={classes.cardContent}>
                <TextField
                    placeholder="Plant Name"
                    multiline
                    rows="1"
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
                <TextField
                    placeholder="Share your thoughts ..."
                    multiline
                    rows="3"
                    value={values.text}
                    onChange={handleChange('text')}
                    className={classes.textField}
                    margin="normal"
                />
                <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="secondary" className={classes.photoButton} component="span">
                        <PhotoCamera />
                    </IconButton>
                </label> <span className={classes.filename}>{values.photo ? values.photo.name : ''}</span>
                {values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}
                </Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" disabled={values.text === ''} onClick={clickPlant} className={classes.submit}>POST</Button>
            </CardActions>
        </Card>
    </div>)

}

NewPlant.propTypes = {
    addUpdate: PropTypes.func.isRequired
}

