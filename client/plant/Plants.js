import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import Paginate from '../utils/Pagination'
import { list, listPlants } from './api-plant.js'
import FilterSideBar from './FilterSideBar'
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
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    fontSize: '1em'
  },
  media: {
    minHeight: 330
  },
  button: {
    marginBottom: theme.spacing(2),
  },
  margin: {
    // margin: theme.spacing(1),
    background: theme.palette.primary.primary
  },
}))
export default function Plants() {
  const classes = useStyles()
  const [plants, setPlants] = useState([])
  const [newPlants, setNewPlants] = useState([])
  const [showing, setShowing] = useState('all')
  const [category, setCategory] = useState('')
  const [intPlants, setIntPlants] = useState([])
  const [values, setValues] = useState({
    total: 0,
    pageCount: 0,
    offset: 0,
    perPage: 10,
    currentPage: 0,
  })
  const [searchedPlants, setsearchedPlants] = useState([])
  const [query, setQuery] = useState('')

  const handlePageSizeChange = (e) => {
    setValues({ ...values, perPage: parseInt(e.target.value), pageCount: Math.ceil(values.total / parseInt(e.target.value)) })
    let newData = plants.slice(values.offset, values.offset + parseInt(e.target.value))
    setNewPlants(newData)
  }

  const handleClick = (offset, e) => {
    setValues({
      ...values,
      offset: offset,
      currentPage: offset / values.perPage
    });
    let newData = plants.slice(offset, offset + values.perPage)
    setNewPlants(newData)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }


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
        setNewPlants(data.slice(values.offset, values.offset + values.perPage))
        setValues({ ...values, pageCount: Math.ceil(data.length / values.perPage), total: data.length })
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

  const handlePagination = (data) => {
    setNewPlants(data)
  }

  const handleChange = name => event => {
    setValues({
      ...values, [name]: event.target.value,
    })
  }

  const handleSearch = () => {
    if (values.search) {
      list({
        search: values.search || undefined, category: values.category
      }).then((data) => {
        if (data.error) {
          console.log(data.error)
        } else {
          setValues({ ...values, results: data, searched: true })
        }
      })
    }
  }

  const enterKey = (event) => {
    if (event.keyCode == 13) {
      event.preventDefault()
      handleSearch()
    }
  }

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.title}>
          <Typography type="title">
            Garden Plants
        </Typography>
          {/* <PlantSearch plants={plants} handleSearch={handleSearch} handleChange={handleChange} query={query} enterKey={enterKey}/> */}
          <FilterSideBar plants={newPlants}
            handleShowActive={handleShowActive}
            handleShowAll={handleShowAll}
            showing={showing} />
        </div>
        <Divider />
        <NewPlant
          addUpdate={addPlant}
          handleShowActive={handleShowActive}
          handleShowAll={handleShowAll}
          showing={showing} />
        <Divider />
        <PlantList removeUpdate={removePlant}
          plants={newPlants}
          showing={showing}
        />
      </Card>
      <Paginate data={plants} handlePagination={handlePagination} handlePageSizeChange={handlePageSizeChange} newPlants={newPlants} handleClick={handleClick} values={values} />
    </>
  )
}

