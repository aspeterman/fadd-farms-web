import { Card, CardContent, CardMedia, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import unicornbikeImg from '../assets/images/unicornbike.jpg'
import auth from '../auth/auth-helper'
import NewsFeed from '../post/Newsfeed'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
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

export default function PlantHome({ history }) {
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
                                Garden Page
                </Typography>
                            <CardMedia className={classes.media} image={unicornbikeImg} title="Unicorn Bicycle" />
                            <CardContent>
                                <Typography type="body1" component="p">
                                    Welcome to Your Garden.
                  </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            }
            {defaultPage &&
                <Grid >
                    {/* <Grid item xs={7} sm={7}> */}
                    <NewsFeed />
                    {/* </Grid> */}
                    {/* <Grid item xs={5} sm={5}>
                        <RecentActivity />
                    </Grid> */}
                </Grid>
            }

        </div>
    )
}
