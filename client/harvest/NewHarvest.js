import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import React, { useState } from 'react'
import { Link, Redirect } from 'react-router-dom'
import auth from './../auth/auth-helper'
import { create } from './api-harvest.js'

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        margin: 'auto',
        textAlign: 'center',
        marginTop: theme.spacing(5),
        paddingBottom: theme.spacing(2)
    },
    error: {
        verticalAlign: 'middle'
    },
    title: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle,
        fontSize: '1.2em'
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300
    },
    submit: {
        margin: 'auto',
        marginBottom: theme.spacing(2)
    },
    input: {
        display: 'none'
    },
    filename: {
        marginLeft: '10px'
    }
}))

export default function NewHarvest({ match }) {
    const classes = useStyles()
    const [values, setValues] = useState({
        observations: '',
        yield: '',
        date: '',
        image: '',
        redirect: false,
        error: ''
    })
    const jwt = auth.isAuthenticated()
    const handleChange = name => event => {
        const value = name === 'image'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }
    const clickSubmit = () => {
        let harvestData = new FormData()
        values.observations && harvestData.append('observations', values.observations)
        values.yield && harvestData.append('yield', values.yield)
        values.date && harvestData.append('date', values.date)
        values.image && harvestData.append('image', values.image)
        harvestData.append('postedBy', jwt.user._id)
        harvestData.append('plot', match.params.plotId)

        create({
            plotId: match.params.plotId,
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, harvestData).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, error: '', redirect: true })
            }
        })
    }

    if (values.redirect) {
        return (<Redirect to={'/plants/' + match.params.plantId + '/' + match.params.plotId} />)
    }
    return (<div>
        <Card className={classes.card}>
            <CardContent>
                <Typography type="headline" component="h2" className={classes.title}>
                    New Harvest
          </Typography><br />
                <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <Button variant="contained" color="secondary" component="span">
                        Upload Photo
              <FileUpload />
                    </Button>
                </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br />
                <TextField autoFocus id="yield" label="Yield" className={classes.textField} value={values.yield} onChange={handleChange('yield')} margin="normal" /><br />
                <TextField
                    id="multiline-flexible"
                    label="Observations"
                    multiline
                    rows="2"
                    value={values.observations}
                    onChange={handleChange('observations')}
                    className={classes.textField}
                    margin="normal"
                /><br />
                <TextField
                    label="Date"
                    type="date"
                    defaultValue={new Date().toJSON().slice(0, 10)}
                    format='yyyy/MM/dd'
                    name='prePlantGerminatedDate'
                    onChange={handleChange('date')}
                    className={classes.textField}
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                {
                    values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}</Typography>)
                }
            </CardContent>
            <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
                <Link to={'/seller/shop/edit/' + match.params.plotId} className={classes.submit}><Button variant="contained">Cancel</Button></Link>
            </CardActions>
        </Card>
    </div>)
}
