import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import React, { useEffect, useState } from 'react'
import { Redirect } from 'react-router'
import { Link } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { read, update } from './api-harvest.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
    maxWidth: 500,
    paddingBottom: theme.spacing(2)
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '1.2em'
  },
  error: {
    verticalAlign: 'middle'
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 400
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
  }
}))

export default function EditHarvest({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    yield: '',
    observations: '',
    date: '',
    redirect: false,
    error: ''
  })

  const jwt = auth.isAuthenticated()
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      harvestId: match.params.harvestId
    }, signal).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, yield: data.yield, observations: data.observations, date: data.date })
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])
  const clickSubmit = () => {
    let harvestData = new FormData()
    values.observations && harvestData.append('observations', values.observations)
    values.yield && harvestData.append('yield', values.yield)
    values.date && harvestData.append('date', values.date)
    values.image && harvestData.append('image', values.image)

    update({
      plotId: match.params.plotId,
      harvestId: match.params.harvestId,
    }, {
      t: jwt.token
    }, harvestData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, 'redirect': true })
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'image'
      ? event.target.files[0]
      : event.target.value
    setValues({ ...values, [name]: value })
  }
  const imageUrl = values.id
    ? `/api/plot/image/${values.id}?${new Date().getTime()}`
    : '/api/plot/defaultphoto'
  if (values.redirect) {
    return (<Redirect to={'/plants/' + match.params.plantId + '/' + match.params.plotId} />)
  }
  return (<div className={classes.root}>
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Harvest
          </Typography><br />
        <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="secondary" component="span">
            Modify Photo
              <FileUpload />
          </Button>
        </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br />
        <TextField id="yield" label="Yield" className={classes.textField} value={values.yield} onChange={handleChange('yield')} margin="normal" /><br />
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
          defaultValue={values.date}
          name='date'
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
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Update</Button>
        <Link to={'/plants/' + match.params.plantId + '/' + match.params.plotId} className={classes.submit}><Button variant="contained">Cancel</Button></Link>
      </CardActions>
    </Card>
  </div>)
}
