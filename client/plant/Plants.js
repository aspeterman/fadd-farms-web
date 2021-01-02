import { CircularProgress } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useAxios from 'axios-hooks'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import Pagination from '../utils/Pagination'
import { listCategories } from './api-plant'
import PlantList from './PlantList'
import PlantSearch from './PlantSearch'

const useStyles = makeStyles(theme => ({
  card: {
    margin: 'auto',
    paddingTop: 0,
    paddingBottom: theme.spacing(3),
  },
  title: {
    alignItems: 'center',
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
  pagination: {
    display: 'flex',
    marginTop: 0,
    marginBottom: 0,
    padding: theme.spacing(1),
    listStyleType: 'none',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)'
  },
}))
export default function Plants(props) {
  const classes = useStyles()
  const [plants, setPlants] = useState([])
  const [newPlants, setNewPlants] = useState([])
  const [showing, setShowing] = useState('all')
  const [sorting, setSorting] = useState('plantname')
  const [values, setValues] = useState({
    total: 0,
    pageCount: 0,
    offset: 0,
    perPage: 20,
    currentPage: 0,
    category: '',
    search: '',
    searchedPlants: [],
    searched: false,
    added: false,
    removed: false,
    newPlant: {},
    removedPlant: {},
    updatedPlants: [],
    categories: []
  })


  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listCategories(signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setValues({ ...values, categories: data })
      }
    })
    return function cleanup() {
      abortController.abort()
    }

  }, [])

  const handlePageSizeChange = (e) => {
    setValues({ ...values, perPage: parseInt(e.target.value) })
  }

  //PAGINATION-------------------------------------------
  const [page, setPage] = useState(1)
  const [{ data, loading, error }] = useAxios({
    url: `/api/plants/feed/${jwt.user._id}`,

    params: {
      page,
      limit: values.perPage
    },
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + jwt.token
    }
  })

  const handlePageChange = (e) => {
    setPage(e)
    page === data.currentPage &&
      e.backgroundColor === 'red'
  }
  const handlePageUp = () => {
    setPage(p => p + 1)
  }
  const handlePageDown = () => {
    setPage(p => Math.max(1, p - 1))
  }

  //------------

  //Search-----------------------

  const handleSearch = (results) => {
    setValues({ ...values, searchedPlants: results, searched: true })
  }

  const handleShowAll = () => {
    setValues({ ...values, showing: 'all', search: '', searched: false })
  }

  //-----------

  const handleReset = () => {
    setValues({ ...values, added: false, removed: false })
  }

  const addPlant = (plant) => {
    // const updatedPlants = [...plants]
    // updatedPlants.unshift(plant)
    // setPlants(updatedPlants)
    // const updatedPlants = [...data]
    // data = updatedPlants
    setValues({ ...values, newPlant: plant, added: true })
    handleReset()
  }
  const removePlant = (plant) => {
    // const updatedPlants = [...plants]
    // const index = updatedPlants.indexOf(plant)
    // updatedPlants.splice(index, 1)
    // setPlants(updatedPlants)
    setValues({ ...values, removedPlant: plant, removed: true })
    handleReset()
  }



  const handleShowActive = () => {
    setShowing('active')
  }

  const handleSorting = (sort) => {
    setSorting(sort)
  }

  if (loading) return <><CircularProgress /></>
  if (error) return <p>Error!</p>

  return (
    <>
      <Card className={classes.card}>
        <div className={classes.title}>
          <Typography type="title">
            Garden Plants
        </Typography>
          <PlantSearch handleSearch={handleSearch} handleShowAll={handleShowAll} categories={values.categories} />
          {/* <FilterSideBar plants={data.plants}
            handleShowActive={handleShowActive}
            handleShowAll={handleShowAll}
            handleSorting={handleSorting}
            sorting={sorting}
            showing={showing} /> */}
        </div>
        <Divider />
        {/* <NewPlant
          addUpdate={addPlant}
        /> */}
        <Divider />
        {plants ?
          <PlantList removeUpdate={removePlant}
            addUpdate={addPlant}
            plants={data.plants}
            values={values}
            showing={showing}
            searched={values.searched}
            results={values.searchedPlants}
          /> : <Typography>You have no plants</Typography>}
      </Card>
      <Pagination handleClick={handlePageChange} totalPages={data.totalPages} currentPage={data.currentPage} values={values} handlePageUp={handlePageUp} handlePageDown={handlePageDown} handlePageSizeChange={handlePageSizeChange} />
    </>
  )
}

