import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import Plants from '../plant/Plants'
import farm from './../assets/images/farm.jpg'
import auth from './../auth/auth-helper'

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    margin: 40,
  },
  card: {
    maxWidth: 600,
    margin: 'auto',
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(5)
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.text.secondary
  },
  media: {
    minHeight: 400
  },
  credit: {
    padding: 10,
    textAlign: 'right',
    backgroundColor: '#ededed',
    borderBottom: '1px solid #d0d0d0',
    '& a': {
      color: '#3f4771'
    }
  }
}))

export default function Home({ history }) {
  const classes = useStyles()
  const [defaultPage, setDefaultPage] = useState(false)
  useEffect(() => {
    setDefaultPage(auth.isAuthenticated())
    const unlisten = history.listen(() => {
      setDefaultPage(auth.isAuthenticated())
    })
    return () => {
      unlisten()
    }
  }, [])

  return (
    <div className={classes.root}>
      { !defaultPage &&
        <Grid container spacing={8}>
          <Grid item xs={12}>
            <Card className={classes.card}>
              <Typography variant="h6" className={classes.title}>
                Home Page
                </Typography>
              <CardMedia className={classes.media} image={farm} title="farm" />
              <CardContent>
                <Typography type="body1" component="p">
                  Welcome to the FADD Farms Website.
                  </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      }
      {defaultPage &&
        <>
          {/* <Grid container spacing={10} className={classes.root}>
            <Grid container>

              <Grid item xs={10} sm={10}>
                <Plants />
              </Grid>
            </Grid>
          </Grid> */}
          <Grid><Plants /></Grid>
        </>
      }
    </div>
  )
}
