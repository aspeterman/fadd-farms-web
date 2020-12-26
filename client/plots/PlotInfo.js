import { IconButton } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import { ArrowBackTwoTone, Edit } from '@material-ui/icons'
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
        display: 'block'
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
    },
    text: {
        display: 'block',
        backgroundColor: 'white',
        padding: theme.spacing(1),
        margin: `2px ${theme.spacing(1)}px 2px 2px`,
    },
}))

export default function Plot({ match }) {
    const classes = useStyles()
    const [totalYield, setYield] = useState(0)
    const [values, setValues] = useState({
        postedBy: '',
        plotId: '',
        plantId: '',
        plantname: '',
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
                setValues({ ...values, plotId: data._id, plantId: data.plant._id, plantname: data.plant.plantname, name: data.name, season: data.season, prePlantSeeds: data.prePlantSeeds, prePlantSeedsDate: data.prePlantSeedsDate, prePlantGerminated: data.prePlantGerminated, prePlantGerminatedDate: data.prePlantGerminatedDate, seedsTransferred: data.seedsTransferred, seedsTransferredDate: data.seedsTransferredDate, postedBy: data.postedBy._id })
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const setYieldData = (data) => {
        setYield(data)
    }

    const imageUrl = values.plotId
        ? `/api/plot/image/${values.plotId}?${new Date().getTime()}`
        : '/api/plot/defaultphoto'
    return (
        <div className={classes.root}>
            <Grid container spacing={10}>
                <Grid item xs={7} sm={7}>
                    <Card className={classes.card}>
                        <CardHeader
                            action={values.postedBy === jwt.user._id &&
                                <Link to={"/plants/" + values.plantId + '/' + values.plotId + "/edit"}>
                                    <IconButton aria-label="Edit" color="primary">
                                        <Edit />
                                    </IconButton>
                                </Link>
                            }
                            title={<Link to={'/plants/' + values.plantId} className={classes.link}><ArrowBackTwoTone />
                            </Link>}
                            subheader={values.name}
                        />
                        <div className={classes.flex}>
                            <CardMedia
                                className={classes.media}
                                image={imageUrl}
                                title={values.name}
                            />
                            <Typography component="div" variant="subtitle1" className={classes.text}>
                                Season: {values.season}
                            </Typography>
                            <Typography component="p" variant="subtitle1" className={classes.text}>
                                Preplant Seeds: {values.prePlantSeeds} on {values.prePlantSeedsDate}
                            </Typography>
                            <Typography component="p" variant="subtitle1" className={classes.text}>
                                Germinated Seeds: {values.prePlantGerminated} on {values.prePlantGerminatedDate}
                            </Typography>
                            <Typography component="p" variant="subtitle1" className={classes.text}>
                                Transferred: {values.seedsTransferred} on {values.seedsTransferredDate}
                            </Typography>
                            <Typography component="p" variant="subtitle1" className={classes.text}>
                                Total Yield: {totalYield}
                            </Typography>
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={5} sm={5}>
                    <HarvestList plantId={match.params.plantId} plotId={match.params.plotId} setYieldData={setYieldData} />
                </Grid>
            </Grid>
        </div>)
}
