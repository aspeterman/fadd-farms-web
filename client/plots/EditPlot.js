import { InputLabel, MenuItem, Select } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
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
import { read, update } from './api-plot.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    textAlign: 'center',
    marginTop: theme.spacing(5),
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
  }
}))

export default function EditPlot({ match }) {
  const classes = useStyles()
  const [values, setValues] = useState({
    name: '',
    season: '',
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
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    read({
      plotId: match.params.plotId
    }, signal).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, id: data._id, name: data.name, season: data.season, prePlantSeeds: data.prePlantSeeds, prePlantSeedsDate: data.prePlantSeedsDate, prePlantGerminated: data.prePlantGerminated, prePlantGerminatedDate: data.prePlantGerminatedDate, seedsTransferred: data.seedsTransferred, seedsTransferredDate: data.seedsTransferredDate })
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])
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

    update({
      plantId: match.params.plantId,
      plotId: match.params.plotId
    }, {
      t: jwt.token
    }, plotData).then((data) => {
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
    return (<Redirect to={'/plants/' + match.params.plantId} />)
  }
  return (<div className={classes.root}>
    <Card className={classes.card}>
      <CardContent>
        <Typography type="headline" component="h2" className={classes.title}>
          Edit Plot
          </Typography><br />
        <Avatar src={imageUrl} className={classes.bigAvatar} /><br />
        <input accept="image/*" onChange={handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
        <label htmlFor="icon-button-file">
          <Button variant="contained" color="secondary" component="span">
            Change Image
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
          /></div>
        <div className={classes.textField}>
          <InputLabel id="season-select">Season</InputLabel>
          <Select labelId="season-select" value={values.season} onChange={handleChange('season')} >
            <MenuItem value={'Fall'}>Fall</MenuItem>
            <MenuItem value={'Spring'}>Spring</MenuItem>
          </Select>
        </div>
        {
          values.error && (<Typography component="p" color="error">
            <Icon color="error" className={classes.error}>error</Icon>
            {values.error}</Typography>)
        }
      </CardContent>
      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>Update</Button>
        <Link to={'/plants/' + match.params.plantId} className={classes.submit}><Button variant="contained">Cancel</Button></Link>
      </CardActions>
    </Card>
  </div>)
}
