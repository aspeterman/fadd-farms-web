import { Avatar, Button, Dialog, DialogContent, Grid, IconButton } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { PhotoCamera } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom'
import auth from '../auth/auth-helper'
import MyPlots from '../plots/MyPlots'
import { getOne, update } from './api-plant'

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle
  },
  error: {
    verticalAlign: 'middle'
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
  bigAvatar: {
    width: 60,
    height: 60,
    margin: 'auto'
  },
  input: {
    display: 'none'
  },
  filename: {
    marginLeft: '10px'
  },
  button: {
    margin: theme.spacing(1),
  }
}))

export default function EditPlant(props) {
  const classes = useStyles()
  const [values, setValues] = useState({
    plantname: '',
    category: '',
    description: '',
    image: '',
    plantHeight: '',
    pests: '',
    soil: '',
    whenToPlant: '',
    careDuringGrowth: '',
    spacing: '',
    active: props.plant.active,
    redirectToPlant: false,
  })

  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    getOne({
      plantId: props.plant._id
    }, { t: jwt.token }, signal).then((data) => {
      if (data & data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({
          ...values,
          plantname: data.plantname,
          active: data.active,
          description: data.description,
          image: '',
          plantHeight: data.plantHeight,
          pests: data.pests,
          soil: data.soil,
          whenToPlant: data.whenToPlant,
          careDuringGrowth: data.careDuringGrowth,
          spacing: data.spacing,
        })
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [props.plant._id])


  const clickSubmit = () => {
    let plantData = new FormData()
    values.plantname && plantData.append('plantname', values.plantname)
    values.category && plantData.append('category', values.category)
    values.description && plantData.append('description', values.description)
    values.plantHeight && plantData.append('plantHeight', values.plantHeight)
    values.pests && plantData.append('pests', values.pests)
    values.whenToPlant && plantData.append('whenToPlant', values.whenToPlant)
    values.careDuringGrowth && plantData.append('careDuringGrowth', values.careDuringGrowth)
    values.spacing && plantData.append('spacing', values.spacing)
    values.image && plantData.append('image', values.image)
    plantData.append('active', values.active)
    update({
      plantId: props.plant._id
    }, {
      t: jwt.token
    }, plantData).then((data) => {
      if (data && data.error) {
        setValues({ ...values, error: data.error })
      } else {
        props.updatePlant(data)
        props.handleClose()
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    //plantData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const handleToggleActive = event => {
    setValues({ ...values, active: !values.active })
  }
  const photoUrl = values.id
    ? `/api/users/photo/${values.id}?${new Date().getTime()}`
    : '/api/users/defaultphoto'
  if (values.redirectToPlant) {
    return (<Redirect to={'/plants/' + values.plantId} />)
  }
  return (
    <>
      <Grid container spacing={8}>
        <Grid item xs={6} sm={6}></Grid>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
          <DialogContent>
            <Card className={classes.card}>
              <CardContent>
                <Typography variant="h6" className={classes.title}>
                  Edit {values.plantname}
                </Typography>
                <Avatar src={photoUrl} className={classes.bigAvatar} /><br />
                <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                  <IconButton color="secondary" className={classes.photoButton} component="span">
                    <PhotoCamera />
                  </IconButton>
                </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span>
                <br />
                <Button className={classes.button} size="small" variant="outlined" color="primary" onClick={handleToggleActive}>{values.active ? "Deactivate" : "Activate"}</Button>
                <br />
                <TextField autoFocus id="plantname" label="Plant Name" className={classes.textField} value={values.plantname} onChange={handleChange('plantname')} margin="normal" /><br />
                <TextField autoFocus id="category" label="Category" className={classes.textField} value={values.category} onChange={handleChange('category')} margin="normal" /><br />
                <TextField
                  id="multiline-flexible"
                  label="Description"
                  multiline
                  rows="2"
                  value={values.description}
                  onChange={handleChange('description')}
                  className={classes.textField}
                  margin="normal"
                /><br />
                <TextField id="whenToPlant" type="text" label="When To Plant" className={classes.textField} value={values.whenToPlant} onChange={handleChange('whenToPlant')} margin="normal" /><br />
                <TextField id="careDuringGrowth" type="text" label="Care During Growth" className={classes.textField} value={values.careDuringGrowth} onChange={handleChange('careDuringGrowth')} margin="normal" />
                <TextField id="plantHeight" type="text" label="Plant Height" className={classes.textField} value={values.plantHeight} onChange={handleChange('plantHeight')} margin="normal" />
                <TextField id="soil" type="text" label="Soil Requirements" className={classes.textField} value={values.soil} onChange={handleChange('soil')} margin="normal" />
                <TextField id="spacing" type="text" label="Spacing" className={classes.textField} value={values.spacing} onChange={handleChange('spacing')} margin="normal" />
                <TextField id="pests" type="text" label="Pests" className={classes.textField} value={values.pests} onChange={handleChange('pests')} margin="normal" />
                <br /> {
                  values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {values.error}
                  </Typography>)
                }
              </CardContent>
              <CardActions>
                <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
              </CardActions>
            </Card>
          </DialogContent>
        </Dialog>
      </Grid>
      <MyPlots plantId={props.plant._id} searched={false} />
    </>
  )
}

EditPlant.propTypes = {
  plant: PropTypes.object.isRequired,
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  updatePlant: PropTypes.func.isRequired
}