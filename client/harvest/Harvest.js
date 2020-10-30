import { Avatar, CardContent, Divider, IconButton } from '@material-ui/core'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import DeleteIcon from '@material-ui/icons/Delete'
import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../auth/auth-helper'
import { remove } from './api-harvest'


const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
    flex: {
        display: 'flex'
    },
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginBottom: theme.spacing(3),
        backgroundColor: 'rgba(0, 0, 0, 0.06)'
    },
    subheading: {
        margin: '24px',
        color: theme.palette.openTitle
    },
    cardContent: {
        backgroundColor: 'white',
        padding: `${theme.spacing(2)}px 0px`
    },
    cardHeader: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    plant: {
        padding: '16px',
        margin: '16px 0px',
        display: 'flex',
        backgroundColor: '#93c5ae3d',
        fontSize: '1.3em',
        color: '#375a53',
    },
    media: {
        height: 200,
        // display: 'inline-block',
        // width: 200,
        // marginLeft: '24px'
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
        margin: theme.spacing(1)
    }
}))

export default function Harvest(props) {
    const classes = useStyles()

    const jwt = auth.isAuthenticated()


    const deleteHarvest = () => {
        remove({
            plotId: props.harvest.plot,
            harvestId: props.harvest._id
        }, {
            t: jwt.token
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                props.removeUpdate(props.harvest)
            }
        })
    }


    const imageUrl = props.harvest._id
        ? `/api/harvest/image/${props.harvest._id}?${new Date().getTime()}`
        : '/api/harvest/defaultphoto'
    return (
        <div className={classes.root}>
            <Grid >
                <Grid >
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                                <Avatar src={imageUrl} />
                            }
                            action={
                                props.harvest.postedBy._id === auth.isAuthenticated().user._id &&
                                <IconButton onClick={deleteHarvest}>
                                    <DeleteIcon />
                                </IconButton>
                            }
                            title={<Link to={"/user/" + props.harvest.postedBy._id}>{props.harvest.postedBy.name}</Link>}
                            subheader={props.harvest.date ? props.harvest.date.slice(0, 10) : props.harvest.createdAt}
                            className={classes.cardHeader}
                        />
                        <Divider />
                        {/* <div className={classes.flex}> */}
                        <CardContent className={classes.cardContent}>

                            <CardMedia
                                className={classes.media}
                                image={imageUrl}
                                title={props.harvest.yield}
                            />
                            <Typography component="h4" variant="subtitle1" className={classes.price}>
                                Harvested From:<Link className={classes.price} to={`/plants/${props.harvest.plot.plant}/${props.harvest.plot._id}`}> {props.harvest.plant.plantname}</Link><br />
                            </Typography>
                            <Typography component="p" variant="subtitle1" className={classes.text}>
                                Yield: {props.harvest.yield}<br />
                            </Typography>
                            <Typography component="p" variant="subtitle1" className={classes.text}>
                                Notes: {props.harvest.observations}<br />
                            </Typography>
                        </CardContent>
                        {/* </div> */}
                    </Card>
                </Grid>
            </Grid>
        </div>)
}
