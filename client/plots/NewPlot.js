import { InputLabel, MenuItem, Select } from '@material-ui/core'
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
import auth from '../auth/auth-helper'
import { create } from './api-plot.js'

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

export default function NewPlot({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    season: 'Fall',
    image: '',
    prePlantSeeds: '',
    prePlantSeedsDate: '',
    prePlantGerminated: '',
    prePlantGerminatedDate: '',
    seedsTransferred: '',
    seedsTransferredDate: '',
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
    let plotData = new FormData()
    values.name && plotData.append('name', values.name)
    values.season && plotData.append('season', values.season)
    values.image && plotData.append('image', values.image)
    values.prePlantSeeds && plotData.append('prePlantSeeds', values.prePlantSeeds)
    values.prePlantSeedsDate && plotData.append('prePlantSeedsDate', values.prePlantSeedsDate)
    values.prePlantGerminated && plotData.append('prePlantGerminated', values.prePlantGerminated)
    values.prePlantGerminatedDate && plotData.append('prePlantGerminatedDate', values.prePlantGerminatedDate)
    values.seedsTransferred && plotData.append('seedsTransferred', values.seedsTransferred)
    values.seedsTransferredDate && plotData.append('seedsTransferredDate', values.seedsTransferredDate)

    create({
      plantId: match.params.plantId,
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, plotData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, error: '', redirect: true })
      }
    })
  }

  if (values.redirect) {
    return (<Redirect to={'/plants/' + match.params.plantId} />)
  }
  return (<div>
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          New Plot
          </Typography><br />
        <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="secondary" component="span">
            Upload Photo
              <FileUpload />
          </Button>
        </label> <span className={classes.filename}>{values.image ? values.image.name : ''}</span><br />
        <TextField
          placeholder="Name your plot"
          autoFocus
          name='name'
          value={values.name}
          onChange={handleChange('name')}
          className={classes.textField}
          margin="normal"
        />
        {/* <TextField
          placeholder="Season"
          name='season'
          value={values.season}
          onChange={handleChange('season')}
          className={classes.textField}
          margin="normal"
        />
         */}
        <div>
          <TextField
            placeholder="prePlantSeeds"
            type="number"
            name='prePlantSeeds'
            value={values.prePlantSeeds}
            onChange={handleChange('prePlantSeeds')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            label="Pre-planted on"
            type="date"
            defaultValue={values.prePlantSeedsDate}
            name='prePlantSeedsDate'
            onChange={handleChange('prePlantSeedsDate')}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <TextField
            placeholder="Pre plant germinated"
            type="number"
            name='prePlantGerminated'
            value={values.prePlantGerminated}
            onChange={handleChange('prePlantGerminated')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            label="Germinated On"
            type="date"
            defaultValue={values.prePlantGerminatedDate}
            name='prePlantGerminatedDate'
            onChange={handleChange('prePlantGerminatedDate')}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div>
          <TextField
            type="number"
            placeholder="Seeds Transferred"
            name='seedsTransferred'
            value={values.seedsTransferred}
            onChange={handleChange('seedsTransferred')}
            className={classes.textField}
            margin="normal"
          />
          <TextField
            label="Transferred On"
            type="date"
            defaultValue={new Date()}
            name='seedsTransferredDate'
            onChange={handleChange('seedsTransferredDate')}
            className={classes.textField}
            margin="normal"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={classes.textField}>
          <InputLabel id="season-select">Season</InputLabel>
          <Select labelId="season-select" value={values.season} onChange={handleChange('season')} >
            <MenuItem value={'Fall'}>Fall</MenuItem>
            <MenuItem value={'Spring'}>Spring</MenuItem>
          </Select>
        </div>
        {values.error && (<Typography component="p" color="error">
          <Icon color="error" className={classes.error}>error</Icon>
          {values.error}
        </Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Submit</Button>
        <Link to={'/plants/' + match.params.plantId} className={classes.submit}><Button variant="contained">Cancel</Button></Link>
      </CardActions>
    </Card>
  </div>)
}
