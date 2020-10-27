import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import auth from '../auth/auth-helper'
import HarvestList from '../harvest/HarvestsList'
import { read } from './api-plot'

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
    const [values, setValues] = useState({
        plotId: '',
        plantId: '',
        name: '',
        season: '',
        image: '',
        prePlantSeeds: '',
        prePlantSeedsDate: '',
        prePlantGerminated: '',
        prePlantGerminatedDate: '',
        seedsTransferred: '',
        seedsTransferredDate: '',
        redirect: false,
        error: ''
    })

    const jwt = auth.isAuthenticated()
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        read({
            plotId: match.params.plotId
        }, signal).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, plotId: data._id, plantId: data.plant._id, name: data.name, season: data.season, prePlantSeeds: data.prePlantSeeds, prePlantSeedsDate: data.prePlantSeedsDate, prePlantGerminated: data.prePlantGerminated, prePlantGerminatedDate: data.prePlantGerminatedDate, seedsTransferred: data.seedsTransferred, seedsTransferredDate: data.seedsTransferredDate })
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const imageUrl = values.plotId
        ? `/api/plot/image/${values.plotId}?${new Date().getTime()}`
        : '/api/plot/defaultphoto'
    return (
        <div className={classes.root}>
            <Grid container spacing={10}>
                <Grid item xs={7} sm={7}>
                    <Card className={classes.card}>
                        <CardHeader
                            title={values.name}
                        // subheader={plot.quantity > 0? 'In Stock': 'Out of Stock'}
                        />
                        <div className={classes.flex}>
                            <CardMedia
                                className={classes.media}
                                image={imageUrl}
                                title={values.name}
                            />
                            <Typography component="p" variant="subtitle1" className={classes.subheading}>
                                {values.season}<br />
                                <Link to={'/plants/' + values.plantId} className={classes.link}>Go
                                </Link>
                            </Typography>

                        </div>
                    </Card>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <HarvestList plantId={match.params.plantId} plotId={match.params.plotId} />
                </Grid>
            </Grid>
        </div>)
}
