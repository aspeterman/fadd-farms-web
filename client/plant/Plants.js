import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import { listPlants } from './api-plant.js'
import NewPlant from './NewPlant'
import PlantList from './PlantList'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3)
  },
  title: {
    // padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    // color: theme.palette.openTitle,
    // fontSize: '2em',
    // textAlign: "center"
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  },
  button: {
    marginBottom: theme.spacing(2),
  }
}))
export default function Plants() {
  const classes = useStyles()
  const [plants, setPlants] = useState([])
  const [showing, setShowing] = useState('all')
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listPlants({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setPlants(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }

  }, [])

  const addPlant = (plant) => {
    const updatedPlants = [...plants]
    updatedPlants.unshift(plant)
    setPlants(updatedPlants)
  }
  const removePlant = (plant) => {
    const updatedPlants = [...plants]
    const index = updatedPlants.indexOf(plant)
    updatedPlants.splice(index, 1)
    setPlants(updatedPlants)
  }

  const handleShowActive = () => {
    setShowing('active')
  }

  const handleShowAll = () => {
    setShowing('all')
  }

  return (
    <Card className={classes.card}>
      <Typography type="title" className={classes.title}>
        Garden Plants
        </Typography>
      <Divider />
      <NewPlant
        addUpdate={addPlant}
        handleShowActive={handleShowActive}
        handleShowAll={handleShowAll}
        showing={showing} />
      {/* <Button variant="outlined" className={classes.button} onClick={handleShowAll}>Show All</Button>
      <Button variant="outlined" className={classes.button} onClick={handleShowActive}>Show Active</Button> */}
      <Divider />
      <PlantList removeUpdate={removePlant}
        plants={plants}
        showing={showing}
      />
    </Card>
  )
}

