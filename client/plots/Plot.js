import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { read } from './api-plot.js'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 30,
  },
  flex: {
    display: 'flex'
  },
  card: {
    padding: '24px 40px 40px'
  },
  subheading: {
    margin: '24px',
    color: theme.palette.openTitle
  },
  price: {
    padding: '16px',
    margin: '16px 0px',
    display: 'flex',
    backgroundColor: '#93c5ae3d',
    fontSize: '1.3em',
    color: '#375a53',
  },
  media: {
    height: 200,
    display: 'inline-block',
    width: '50%',
    marginLeft: '24px'
  },
  icon: {
    verticalAlign: 'sub'
  },
  link: {
    color: '#3e4c54b3',
    fontSize: '0.9em'
  },
  addCart: {
    width: '35px',
    height: '35px',
    padding: '10px 12px',
    borderRadius: '0.25em',
    backgroundColor: '#5f7c8b'
  },
  action: {
    margin: '8px 24px',
    display: 'inline-block'
  }
}))

export default function Plot({ match }) {
  const classes = useStyles()
  const [plot, setPlot] = useState({ plant: {} })
  const [suggestions, setSuggestions] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    read({ plotId: match.params.plotId }, signal).then((data) => {
      if (data.error) {
        setError(data.error)
      } else {
        setPlot(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [match.params.plotId])


  const imageUrl = plot._id
    ? `/api/plot/image/${plot._id}?${new Date().getTime()}`
    : '/api/plot/defaultphoto'
  return (
    <div className={classes.root}>
      <Grid container spacing={10}>
        <Grid item xs={7} sm={7}>
          <Card className={classes.card}>
            <CardHeader
              title={plot.name}
            // subheader={plot.quantity > 0? 'In Stock': 'Out of Stock'}
            />
            <div className={classes.flex}>
              <CardMedia
                className={classes.media}
                image={imageUrl}
                title={plot.name}
              />
              <Typography component="p" variant="subtitle1" className={classes.subheading}>
                {plot.season}<br />
                <Link to={'/plants/' + plot.plant._id} className={classes.link}>
                </Link>
              </Typography>

            </div>
          </Card>
        </Grid>
      </Grid>
    </div>)
}
