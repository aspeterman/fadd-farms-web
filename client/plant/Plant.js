import { CardMedia, GridListTile, Tooltip } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import Card from '@material-ui/core/Card'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { Info } from '@material-ui/icons'
import CommentIcon from '@material-ui/icons/Comment'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { like, remove, unlike } from './api-plant.js'
import Comments from './Comments'
import DeletePlant from './DeletePlant'

const useStyles = makeStyles(theme => ({
  card: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)',
    width: 300,
    overflow: 'hidden',
  },
  cardContent: {
    backgroundColor: 'white',
    // padding: `${theme.spacing(2)}px 0px`,
    height: 250
  },
  cardHeader: {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  },
  text: {
    margin: theme.spacing(2)
  },
  photo: {
    textAlign: 'center',
    backgroundColor: '#f2f5f4',
    padding: theme.spacing(1)
  },
  media: {
    height: 100,
    '&:hover': {
      cursor: 'pointer'
    },
  },
  button: {
    margin: theme.spacing(1),
  }
}))

export default function Plant(props) {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const history = useHistory()
  const jwt = auth.isAuthenticated()
  const checkLike = (likes) => {
    let match = likes.indexOf(jwt.user._id) !== -1
    return match
  }
  const [values, setValues] = useState({
    active: props.plant.active,
    like: checkLike(props.plant.likes),
    likes: props.plant.likes.length,
    comments: props.plant.comments,
    plots: props.plant.plots,
    harvests: props.plant.harvests,
    commentsView: false,
    error: {}
  })

  const clickLike = () => {
    let callApi = values.like ? unlike : like
    callApi({
      userId: jwt.user._id
    }, {
      t: jwt.token
    }, props.plant._id).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setValues({ ...values, like: !values.like, likes: data.likes.length })
      }
    })
  }

  const updateComments = (comments) => {
    setValues({ ...values, comments: comments })
  }

  const deletePlant = () => {
    remove({
      plantId: props.plant._id
    }, {
      t: jwt.token
    }).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        props.onRemove(props.plant)
        setOpen(false)
      }
    })
  }

  const clickButton = () => {
    setOpen(true)
  }

  const handleRequestClose = () => {
    setOpen(false)
  }

  const showComments = () => {
    setValues({ ...values, commentsView: !values.commentsView })

  }
  const handleGoForward = () => {
    const url = `/plants/${props.plant._id}`
    const state = { values: props.values }
    history.push(url, state)
  }
  const imageUrl = props.plant._id
    ? `/api/plants/image/${props.plant._id}?${new Date().getTime()}`
    : '/api/plants/defaultphoto'

  return (
    <GridListTile cols={4}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={'/api/users/photo/' + props.plant.postedBy._id} />
          }
          action={
            props.plant.postedBy._id === auth.isAuthenticated().user._id &&
            <DeletePlant
              plant={props.plant}
              plantId={props.plant._id}
              clickButton={clickButton}
              handleRequestClose={handleRequestClose}
              open={open}
              onRemove={deletePlant} />
          }
          title={<Link to={"/user/" + props.plant.postedBy._id}>{props.plant.postedBy.name}</Link>}
          subheader={(new Date(props.plant.createdAt)).toDateString()}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <div className={classes.photo}>
            <CardMedia
              className={classes.media}
              image={imageUrl}
              title={props.plant.plantname}
              onClick={handleGoForward}
            /></div>
          {props.plant.active ? <Typography style={{ color: 'lightgreen', textAlign: 'center' }}>Active</Typography> : <Typography style={{ color: 'red', textAlign: 'center' }}>Inactive</Typography>}
          <Typography component="p" className={classes.text} >
            Common Name: {props.plant.plantname}
          </Typography>
        </CardContent>
        <CardActions>
          {values.like
            ? <Tooltip title="Unlike"><IconButton onClick={clickLike} className={classes.button} aria-label="Like" color="secondary">
              <FavoriteIcon />
            </IconButton></Tooltip>
            : <Tooltip title="Like"><IconButton onClick={clickLike} className={classes.button} aria-label="Unlike" color="secondary">
              <FavoriteBorderIcon />
            </IconButton></Tooltip>} <span>{values.likes}</span>
          <IconButton className={classes.button} aria-label="Comment" color="secondary" onClick={showComments}>
            <CommentIcon />
          </IconButton> <span>{values.comments.length}</span>
          <Tooltip title="Plant Information">
            <IconButton className={classes.button} aria-label="Info" color="primary" onClick={handleGoForward}>
              <Info />
            </IconButton>
          </Tooltip>
        </CardActions>
        <Divider />
        {values.commentsView ?
          <Comments plantId={props.plant._id} comments={values.comments} updateComments={updateComments} showComments={showComments} />
          : null}
        <Divider />
      </Card>
    </GridListTile>
  )

}

Plant.propTypes = {
  plant: PropTypes.object.isRequired,
}
