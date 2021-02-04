import { CircularProgress } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import auth from '../auth/auth-helper'
import Pagination from '../utils/Pagination'
import { listCategories, listPlants } from './api-plant'
import NewPlant from './NewPlant'
import PlantList from './PlantList'
import PlantSearch from './PlantSearch'
import PlantSort from './PlantSort'

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
    justifyContent: 'space-between',
    // padding: `${theme.spacing(3)}px 0px 1px`,
    // marginTop: 0,
    // marginBottom: 0,
    // padding: theme.spacing(1),
    // listStyleType: 'none',
    // boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#efefef',
  },
  iconButton: {
    padding: 10,
  },
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 130,
    verticalAlign: 'bottom',
    marginBottom: '20px'
  },
  loading: {
    textAlign: 'center',
    height: 500
  }
}))
export default function Plants() {
  const classes = useStyles()
  const [plants, setPlants] = useState([])
  const [anchorEl, setAnchorEl] = useState(false)
  const [values, setValues] = useState({
    displayedPlants: [],
    totalPages: 0,
    pageCount: 0,
    offset: 0,
    perPage: 30,
    currentPage: 1,
    categories: [],
    filtered: '',
    loading: true
  })

  const history = useHistory()
  const jwt = auth.isAuthenticated()

  const getData = (signal, limit, offset) => {
    listPlants({
      userId: jwt.user._id,
      limit: limit,
      offset: offset
    }, { t: jwt.token }, signal).then((data) => {
      if (data.error)
        console.log(data.error)
      else {
        setPlants(data.plants)
        setValues({ ...values, displayedPlants: data.plants, totalPages: data.totalPages, perPage: data.perPage, currentPage: data.currentPage, offset: (data.perPage * data.currentPage), loading: false, })
      }
    })
  }

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    // if (history.location.state !== undefined) {
    //   console.log(history.location.state)
    //   setValues({ ...values, displayedPlants: history.location.state.displayedPlants, currentPage: history.location.state.currentPage, offset: history.location.state.offset, perPage: history.location.state.perPage, loading: history.location.state.loading })
    //   getData(signal, history.location.state.perPage, history.location.state.offset)
    // } else {
    getData(signal, values.perPage, values.offset)
    // }

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


  //PAGINATION-------------------------------------------

  const handlePageSizeChange = (e) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    setValues({ ...values, perPage: parseInt(e.target.value), loading: true })
    getData(signal, parseInt(e.target.value), 0)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handlePageChange = (e) => {
    const abortController = new AbortController()
    const signal = abortController.signal
    const url = `/page=${e}`
    history.push(url)
    setValues({ ...values, displayedPlants: [], currentPage: e, offset: e * values.perPage, loading: true })
    getData(signal, values.perPage, e * values.perPage)
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  //------------


  const addPlant = (plant) => {
    setValues({ ...values, loading: true })
    const abortController = new AbortController()
    const signal = abortController.signal
    const url = '/'
    const state = values
    history.push(url, state)
    getData(signal, values.perPage, values.offset)
  }
  const removePlant = (plant) => {
    setValues({ ...values, loading: true })
    const abortController = new AbortController()
    const signal = abortController.signal
    const url = '/'
    const state = values
    history.push(url, state)
    getData(signal, values.perPage, values.offset)

  }
  const handleFilter = (e) => {
    setValues({ ...values, filtered: e.target.value })
    let filteredPlants = []
    if (e.target.value === 'Active') {
      filteredPlants = plants.filter(plant => plant.active === true)
    }
    else if (e.target.value === 'Inactive') {
      filteredPlants = plants.filter(plant => plant.active === false)
    }
    else if (e.target.value === 'All') filteredPlants = plants
    setValues({ ...values, displayedPlants: filteredPlants, totalPages: Math.ceil(filteredPlants.length / values.perPage) })

    // }
  }


  const handleClickOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>

      <Card className={classes.card}>
        <div className={classes.title}>
          <Typography type="title">
            Garden Plants
        </Typography>
          <PlantSearch values={values} />
          <PlantSort handleFilter={handleFilter} handleClickOpen={handleClickOpen} handleClose={handleClose} anchorEl={anchorEl} values={values} />
        </div>
        <Divider />
        <div className={classes.pagination}>
          <Pagination handleClick={handlePageChange} totalPages={values.totalPages} currentPage={values.currentPage} values={values} handlePageSizeChange={handlePageSizeChange} />
          <NewPlant addUpdate={addPlant} onRemove={removePlant} />
        </div>
        {values.loading && <div className={classes.loading}><CircularProgress /></div>}
        {plants ?
          <PlantList
            removeUpdate={removePlant}
            addUpdate={addPlant}
            plants={values.displayedPlants}
            values={values}
          /> : <Typography>You have no plants</Typography>}
      </Card>
      <div className={classes.pagination}>
        <Pagination handleClick={handlePageChange} totalPages={values.totalPages} currentPage={values.currentPage} values={values} handlePageSizeChange={handlePageSizeChange} />
      </div>
      {/* <PlanGarden plants={values.displayedPlants} /> */}
    </>
  )
}

