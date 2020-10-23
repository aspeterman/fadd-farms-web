import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { Link } from 'react-router-dom'

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

export default function Harvest(props) {
    const classes = useStyles()


    const imageUrl = harvest._id
        ? `/api/harvest/image/${harvest._id}?${new Date().getTime()}`
        : '/api/harvest/defaultphoto'
    return (
        <div className={classes.root}>
            <Grid container spacing={10}>
                <Grid item xs={4} sm={4}>
                    <Card className={classes.card}>
                        <CardHeader
                            title={harvest.date}
                        />
                        <div className={classes.flex}>
                            <CardMedia
                                className={classes.media}
                                image={imageUrl}
                                title={harvest.name}
                            />
                            <Typography component="p" variant="subtitle1" className={classes.subheading}>
                                {harvest.yield}<br />
                                <Link to={'/plants/' + harvest.plot._id} className={classes.link}>
                                </Link>
                            </Typography>

                        </div>
                    </Card>
                </Grid>
            </Grid>
        </div>)
}
