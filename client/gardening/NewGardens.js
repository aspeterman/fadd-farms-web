import { CircularProgress, Divider, IconButton, InputLabel, MenuItem, Select } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { Delete, Info } from '@material-ui/icons'
import { indexOf } from "lodash"
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import auth from '../auth/auth-helper'
import { listPlants } from '../plant/api-plant'
import { create } from './api-gardens.js'

const useStyles = makeStyles(theme => ({
  root: {

    backgroundColor: '#efefef',
    padding: `${theme.spacing(3)}px 0px 1px`
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none'
  },
  cardContent: {
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 0
  },
  cardHeader: {
    paddingTop: 8,
    paddingBottom: 8
  },
  photoButton: {
    height: 30,
    marginBottom: 5
  },
  input: {
    display: 'none',
  },
  textField: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: '90%'
  },
  submit: {
    margin: theme.spacing(2)
  },
  filename: {
    verticalAlign: 'super'
  },
  gridWrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  gardenGrid: {

    // width: '200px',
    margin: 'auto',
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(65, 150, 136, 0.09)',
    boxShadow: 'none',
    border: '1px solid grey',
    // borderRadius: '25%',
    // backgroundColor: 'green',
    padding: theme.spacing(3),
    overflowY: 'scroll',
    height: 500,
    // flexWrap: 'wrap'
    '&::-webkit-scrollbar': {
      width: '0.4em',
    },
    '&::-webkit-scrollbar-track': {
      // '-webkit-box-shadow': 'inset 0 0 6px #aaaaaa'
      background: '#ffffff',
      borderRadius: '10px',
      boxShadow: 'inset 7px 10px 12px #f0f0f0'
    },
    '&::-webkit-scrollbar-thumb': {
      // backgroundColor: 'rgba(0,0,0,.1)',
      // outline: '1px solid slategrey'
      background: 'linear-gradient(13deg, #D4FFEC 14%,#c7ceff 64%)',
      borderRadius: '10px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: `linear-gradient(13deg, #c7ceff 14%,#f9d4ff 64%)`
    },
  },
}))

const grid = 8;

const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,

  background: isDragging ? "lightgreen" : "grey",

  ...draggableStyle
});
const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 250
});

export default function NewGarden(props) {
  const classes = useStyles()
  const [plants, setPlants] = useState([])
  const [values, setValues] = useState({
    year: 2021,
    season: 'Fall',
    gardenName: '',
    image: '',
    rows: [],
    error: '',
    gardenId: '',
    user: {}
  })
  const [open, setOpen] = useState(false)

  const jwt = auth.isAuthenticated()

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal
    listPlants({
      userId: jwt.user._id,
    }, { t: jwt.token }, signal).then((data) => {
      if (data.error)
        console.log(data.error)
      else {
        setPlants([data])
        setValues({ ...values, user: auth.isAuthenticated().user })
      }
    })
  }, [])

  const clickSubmit = () => {

    let gardenData = new FormData()
    values.gardenName && gardenData.append('gardenName', values.gardenName)
    values.season && gardenData.append('season', values.season)
    values.year && gardenData.append('year', values.year)
    values.image && gardenData.append('image', values.image)
    gardenData.append('rows', JSON.stringify(plants))
    create({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, gardenData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        // setOpen(false)
        setValues({ ...values, gardenId: data._id, rows: [], gardenName: '', year: 2021, season: 'Fall' })
        props.addGarden(data)
      }
    })
  }
  const handleChange = name => event => {
    const value = name === 'photo'
      ? event.target.files[0]
      : event.target.value
    setValues({ ...values, [name]: value })
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  function onDragEnd(result) {
    const { source, destination } = result;

    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(plants[sInd], source.index, destination.index);
      const newPlants = [...plants];
      newPlants[sInd] = items;
      setPlants(newPlants);
    } else {
      const result = move(plants[sInd], plants[dInd], source, destination);
      const newPlants = [...plants];
      newPlants[sInd] = result[sInd];
      newPlants[dInd] = result[dInd];

      setPlants(newPlants.filter(group => group.length));
    }
  }

  const handleSetPlants = (plants) => {
    setPlants(plants)
  }


  const photoURL = values.user._id ? '/api/users/photo/' + values.user._id : '/api/users/defaultphoto'

  if (!plants) return <CircularProgress />
  return (<div className={classes.root}>
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar src={photoURL} />
        }
        title={values.user.name}
        className={classes.cardHeader}
      />
      <CardContent className={classes.cardContent}>
        <InputLabel htmlFor="garden-name">Year</InputLabel>
        <TextField
          id="garden-name"
          placeholder="Garden Name"
          value={values.gardenName}
          onChange={handleChange('gardenName')}
          className={classes.textField}
          margin="normal"
        />

        <InputLabel htmlFor="year-select">Year</InputLabel>
        <TextField
          id="year-select"
          placeholder="Year"
          type="number"
          name='year'
          value={values.year}
          onChange={handleChange('year')}
          margin="normal"
          className={classes.textField}
        />
        <InputLabel id="season-select">Season</InputLabel>
        <Select value={values.season} labelId="season-select" name='season' onChange={handleChange('season')} >
          <MenuItem value={'Fall'}>Fall</MenuItem>
          <MenuItem value={'Spring'}>Spring</MenuItem>
        </Select>

        {values.error && (<Typography component="p" color="error">
          <Icon color="error" className={classes.error}>error</Icon>
          {values.error}
        </Typography>)
        }
      </CardContent>
      <Divider />

      <CardActions>
        <Button color="primary" variant="contained" onClick={clickSubmit} className={classes.submit}>POST</Button>
      </CardActions>
    </Card>
    <div className={classes.gardenGrid}>
      <Card >
        <CardContent  >
          <div>
            <Button
              variant='outlined'
              onClick={() => {
                handleSetPlants([...plants, []]);
              }}
            >
              Add new row
      </Button>
            <div className={classes.gridWrapper}>
              <DragDropContext onDragEnd={onDragEnd}>
                {plants.map((el, ind) => (
                  <Droppable key={ind} droppableId={`${ind}`}>
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        style={getListStyle(snapshot.isDraggingOver)}
                        {...provided.droppableProps}
                        className={classes.gardenGrid}
                      >
                        <Typography style={{ textAlign: 'center' }}>Row {indexOf(plants, el) + 1}</Typography>

                        {el.map((item, index) => (
                          <Draggable
                            key={item._id}
                            draggableId={item._id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={getItemStyle(
                                  snapshot.isDragging,
                                  provided.draggableProps.style
                                )}
                              >
                                <div
                                  className={classes.item}
                                >
                                  <Typography className={classes.textField}>
                                    {item.plantname}
                                  </Typography><br />
                                  {/* {item.active ? <Typography style={{ color: 'lightgreen', textAlign: 'center' }}>Active</Typography> : <Typography style={{ color: 'red', textAlign: 'center' }}>Inactive</Typography>} */}
                                  <div className={classes.button}>
                                    <IconButton
                                      color='secondary'
                                      onClick={() => {
                                        const newPlants = [...plants];
                                        newPlants[ind].splice(index, 1);
                                        handleSetPlants(
                                          newPlants.filter(group => group.length)
                                        );
                                      }}
                                    >
                                      <Delete />
                                    </IconButton>
                                    <IconButton color='primary' onClick={() => handleGoForward(item._id)}><Info /></IconButton>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))}
              </DragDropContext>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>)

}


