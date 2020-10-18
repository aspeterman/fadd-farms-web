import { Button, GridListTile } from '@material-ui/core'
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
import DeleteIcon from '@material-ui/icons/Delete'
import FavoriteIcon from '@material-ui/icons/Favorite'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { like, remove, unlike } from './api-plant.js'
import Comments from './Comments'
import Plots from './Plots'

const useStyles = makeStyles(theme => ({
  card: {
    // maxWidth: 600,
    // margin: 'auto',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(3),
    backgroundColor: 'rgba(0, 0, 0, 0.06)'
  },
  cardContent: {
    backgroundColor: 'white',
    padding: `${theme.spacing(2)}px 0px`
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
    height: 100
  },
  button: {
    margin: theme.spacing(1),
  }
}))

export default function Plant(props) {
  const classes = useStyles()
  const jwt = auth.isAuthenticated()
  const checkLike = (likes) => {
    let match = likes.indexOf(jwt.user._id) !== -1
    return match
  }
  const [values, setValues] = useState({
    like: checkLike(props.plant.likes),
    likes: props.plant.likes.length,
    comments: props.plant.comments,
    plots: props.plant.plots,
    harvests: props.plant.harvests,
    commentsView: false,
    plotsView: false,
    error: {}
  })

  // const [commentsView, showCommentList] = useState(false)
  // const [plotsView, showPlotsList] = useState(false)
  // useEffect(() => {
  //   setValues({...values, like:checkLike(props.plant.likes), likes: props.plant.likes.length, comments: props.plant.comments})
  // }, [])



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

  const updatePlots = (plots) => {
    setValues({ ...values, plots: plots })
  }

  const updateHarvests = (harvests) => {
    setValues({ ...values, harvests: harvests })
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
      }
    })
  }

  const showComments = () => {
    // showCommentList({ commentsView: !commentsView })
    setValues({ ...values, commentsView: !values.commentsView })

  }

  const showPlots = () => {
    setValues({ ...values, plotsView: !values.plotsView })
  }

  return (
    <GridListTile cols={4}>
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar src={'/api/users/photo/' + props.plant.postedBy._id} />
          }
          action={props.plant.postedBy._id === auth.isAuthenticated().user._id &&
            <IconButton onClick={deletePlant}>
              <DeleteIcon />
            </IconButton>
          }
          title={<Link to={"/user/" + props.plant.postedBy._id}>{props.plant.postedBy.name}</Link>}
          subheader={(new Date(props.plant.createdAt)).toDateString()}
          className={classes.cardHeader}
        />
        <CardContent className={classes.cardContent}>
          <Typography component="p" className={classes.text}>
            Common Name: {props.plant.plantname}
          </Typography>
          <Typography component="p" className={classes.text}>
            Overview: {props.plant.description}
          </Typography>
          {props.plant.photo &&
            (<div className={classes.photo}>
              <img
                className={classes.media}
                src={'/api/plants/photo/' + props.plant._id}
              />
            </div>)}
        </CardContent>
        <CardActions>
          {values.like
            ? <IconButton onClick={clickLike} className={classes.button} aria-label="Like" color="secondary">
              <FavoriteIcon />
            </IconButton>
            : <IconButton onClick={clickLike} className={classes.button} aria-label="Unlike" color="secondary">
              <FavoriteBorderIcon />
            </IconButton>} <span>{values.likes}</span>
          <IconButton className={classes.button} aria-label="Comment" color="secondary" onClick={showComments}>
            <CommentIcon />
          </IconButton> <span>{values.comments.length}</span>
          <IconButton className={classes.button} aria-label="Info" color="secondary">
            <Link to={{
              pathname: "/plants/" + props.plant._id,
              plantProps: { plantId: props.plant._id, plant: props.plant, plots: values.plots, harvests: values.harvests, updateHarvests, updatePlots }
            }}>
              <Info />
            </Link>
          </IconButton>
        </CardActions>
        <Divider />
        <Button size="small" variant="outlined" color="primary" className={classes.button} onClick={showPlots}>Plots</Button>
        {/* <EditPlant plantId={props.plant._id} plant={props.plant} /> */}
        {values.commentsView ?
          <Comments plantId={props.plant._id} comments={values.comments} updateComments={updateComments} showComments={showComments} />
          : null}
        <Divider />
        {/* <Divider> */}
        {values.plotsView ?
          <Plots plantId={props.plant._id} plant={props.plant} plots={values.plots} updatePlots={updatePlots} harvests={values.harvests} updateHarvests={updateHarvests} />
          : null}
      </Card>
    </GridListTile>
  )

}

Plant.propTypes = {
  plant: PropTypes.object.isRequired,
  onRemove: PropTypes.func.isRequired
}
