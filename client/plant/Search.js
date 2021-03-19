import { CircularProgress, Grid, IconButton } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { ArrowBack } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import auth from '../auth/auth-helper'
import { list } from './api-plant'
import PlantList from './PlantList'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 40,
    },
    card: {
        margin: 'auto',
        paddingTop: 0,
        paddingBottom: theme.spacing(3),
    },
    title: {
        alignItems: 'center',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        fontSize: '1em'
    },
    iconButton: {
        padding: 10,
    },
    loading: {
        textAlign: 'center',
        heeight: 500
    }
}))
export default function Search({ match }) {
    const classes = useStyles()
    const [values, setValues] = useState({
        displayedPlants: [],
        searched: false,
        loading: true
    })

    const history = useHistory()
    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        list({
            search: match.params.search || undefined, category: values.category, active: values.active,
            userId: jwt.user._id
        }, { t: jwt.token }, signal).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, displayedPlants: data.filter(plant => plant.postedBy._id === jwt.user._id), searched: true, loading: false })
            }
        })



    }, [])


    const handleBack = () => {
        history.goBack()
    }


    return (
        <Grid container spacing={10} className={classes.root}>
            <Grid container>

                <Grid item xs={10} sm={10}>

                    <IconButton className={classes.iconButton} onClick={handleBack}><ArrowBack /></IconButton>
                    <Card className={classes.card}>
                        <div className={classes.title}>
                            <Typography type="title">
                                Search Results
        </Typography>
                        </div>
                        <Divider />
                        {values.loading && <div className={classes.loading}><CircularProgress /></div>}
                        {values.displayedPlants ?
                            <PlantList
                                plants={values.displayedPlants}
                                values={values}
                            /> : <Typography>No Results Found</Typography>}
                    </Card>
                </Grid>
            </Grid>
        </Grid>
    )
}

