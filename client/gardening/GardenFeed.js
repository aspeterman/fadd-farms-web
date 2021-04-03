import Card from '@material-ui/core/Card'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import { getOne, listGardenSchema } from './api-gardens'
import CurrentGarden from './GardenItem'
import GardensList from './GardensList'
import NewGarden from './NewGardens'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  }
}))
export default function GardenFeed() {
  const classes = useStyles()
  const [gardens, setGardens] = useState([])
  const [currentGarden, setCurrentGarden] = useState({})
  const [values, setValues] = useState({
    loading: true,
    offset: 0,
    currentPage: 1,
    limit: 5,
    showNew: false,
    comments: []
  })
  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listGardenSchema({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        let result = data.sort((a, b) => {
          return a.year < b.year
        })
        setGardens(result)
        setCurrentGarden(result.slice(0, 1))
        setValues({ ...values, loading: false })
      }
    })
    return function cleanup() {
      abortController.abort()
    }

  }, [])

  const addGarden = (post) => {
    const updatedGardens = [...gardens]
    updatedGardens.unshift(post)
    setGardens(updatedGardens)
    setValues({ ...values, showNew: false })
  }
  const removeGarden = (post) => {
    const updatedGardens = [...gardens]
    const index = updatedGardens.indexOf(post)
    updatedGardens.splice(index, 1)
    setGardens(updatedGardens)
  }

  const handleCreate = () => {
    setValues({ ...values, showNew: true })
  }

  const handleGetGarden = (e) => {
    setValues({ ...values, gardenId: e })
    const abortController = new AbortController()
    const signal = abortController.signal
    getOne({
      gardenId: e
    }, { t: jwt.token }, signal).then((data) => {
      if (data & data.error) {
        setValues({ ...values, error: data.error })
      } else {
        let parsed = JSON.parse(data.rows)
        data.rows = parsed
        setCurrentGarden(data)
        setValues({ ...values, comments: data.comments, gardenId: data._id, loading: false, showNew: false })
      }
    })
  }

  const pageUp = () => {
    setValues({ ...values, offset: values.offset + values.limit, currentPage: values.currentPage + 1 })
  }
  const pageDown = () => {
    setValues({ ...values, offset: values.offset - values.limit, currentPage: values.currentPage - 1 })
  }

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments })
  }

  return (
    <Card className={classes.card}>
      <GardensList gardens={gardens} handleClick={handleGetGarden} handleCreate={handleCreate} removeGarden={removeGarden} />
      {values.showNew ?
        <NewGarden addGarden={addGarden} /> :
        <CurrentGarden currentGarden={currentGarden} values={values} pageUp={pageUp} pageDown={pageDown} updateComments={updateComments} comments={values.comments} />
      }
    </Card>
  )
}

