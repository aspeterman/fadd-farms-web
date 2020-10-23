import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import auth from '../auth/auth-helper'
import Harvests from '../harvest/harvests'
import { plot, unplot } from '../plant/api-plant.js'


const useStyles = makeStyles(theme => ({
    cardHeader: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    smallAvatar: {
        width: 25,
        height: 25
    },
    commentField: {
        width: '96%'
    },
    commentText: {
        backgroundColor: 'white',
        padding: theme.spacing(1),
        margin: `2px ${theme.spacing(2)}px 2px 2px`
    },
    commentDate: {
        display: 'block',
        color: 'gray',
        fontSize: '0.8em'
    },
    commentDelete: {
        fontSize: '1.6em',
        verticalAlign: 'middle',
        cursor: 'pointer'
    }
}))

export default function Plots(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        plotname: '',
        season: '',
        prePlantSeeds: '',
        prePlantGerminated: '',
        seedsTransferred: '',
        prePlantSeedsDate: '',
        prePlantGerminatedDate: '',
        seedsTransferredDate: '',
        error: '',
        user: {},
        harvests: props.harvests,
        harvestsView: false,
        showNew: false
    })
    const [open, setOpen] = useState(false)
    const jwt = auth.isAuthenticated()
    const handleChange = name => event => {
        const value = name === 'photo'
            ? event.target.files[0]
            : event.target.value
        setValues({ ...values, [name]: value })
    }

    const addPlot = (event) => {
        // let postData = new FormData()
        // postData.append('season', values.season)
        // postData.append('prePlantSeeds', values.prePlantSeeds)
        // postData.append('prePlantGerminated', values.prePlantGerminated)
        // postData.append('seedsTransferred', values.seedsTransferred)
        // postData.append('prePlantSeedsDate', values.prePlantSeedsDate)
        // postData.append('prePlantGerminatedDate', values.prePlantGerminatedDate)
        // postData.append('seedsTransferredDate', values.seedsTransferredDate)
        let postData = {
            plotname: values.plotname,
            season: values.season,
            prePlantSeeds: values.prePlantSeeds,
            prePlantGerminated: values.prePlantGerminated,
            seedsTransferred: values.seedsTransferred,
            prePlantSeedsDate: values.prePlantSeedsDate,
            prePlantGerminatedDate: values.prePlantGerminatedDate,
            seedsTransferredDate: values.seedsTransferredDate,
        }
        // if (event.keyCode == 13 && event.target.value) {
        event.preventDefault()
        plot({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.plantId, postData).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, plotname: '', season: '', prePlantSeeds: '', prePlantGerminated: '', seedsTransferred: '', prePlantGerminatedDate: '', prePlantSeedsDate: '', seedsTransferredDate: '', showNew: false })
                setOpen(false)
                props.updatePlots(data.plots)
            }
        })
        // }
    }

    const deletePlot = plot => event => {
        unplot({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.plantId, plot).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                props.updatePlots(data.plots)
                // props.updateHarvests(data.harvests)
            }
        })
    }

    const handleShow = event => {
        setValues({ ...values, showNew: !values.showNew })
    }

    const showHarvests = () => {
        setValues({ ...values, harvestsView: !values.harvestsView })
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const plotBody = item => {
        return (
            <>
                <Card
                >
                    <CardHeader
                        avatar={
                            <Avatar src={'/api/users/photo/' + props.plant.postedBy._id} />
                        }
                        action={props.plant.postedBy._id === auth.isAuthenticated().user._id &&
                            <IconButton onClick={deletePlot(item)}>
                                <DeleteIcon />
                            </IconButton>
                        }
                        title={<Link to={"/user/" + props.plant.postedBy._id}>{props.plant.postedBy.name}</Link>}
                        subheader={(new Date(props.plant.createdAt)).toDateString()}
                        className={classes.cardHeader}
                    />
                    <CardContent>
                        <Typography>Season: {item.season}</Typography>
                        {/* <Card.Text>Description: {props.exercise.description}</Card.Text> */}
                        <Typography>Pre Plant Seeds: {item.prePlantSeeds} on {item.prePlantSeedsDate}</Typography>
                        <Typography>Pre Plant Seeds Germinated: {item.prePlantGerminated} on {item.prePlantGerminatedDate}</Typography>
                        <Typography>Seeds Transferred: {item.seedsTransferred} on {item.seedsTransferredDate}</Typography>
                        {/* <Card.Text> <span>Total Yield: {props.exercise.harvestYieldTally} lbs</span><br />
                            <span><TallyModal id={props.exercise._id} /></span></Card.Text> */}
                        <Button color="primary" variant="outlined" size="small" onClick={showHarvests}>Show Harvests</Button>
                    </CardContent>
                    {/* <CardActionArea>
                        <span className={classes.commentDate}>
                            {(new Date(item.created)).toDateString()} |
            {auth.isAuthenticated().user._id === item.postedBy._id &&
                                <Icon onClick={deletePlot(item)} className={classes.commentDelete}>delete</Icon>}
                        </span>
                    </CardActionArea> */}
                    {values.harvestsView ?
                        <Harvests jwt={jwt} plantId={props.plantId} plotId={item._id} harvests={props.harvests.filter(harvest => harvest.harvestPlot === item._id)} updateHarvests={props.updateHarvests} /> : null}
                </Card>
                <Divider />
            </>
        )
    }
    return (<div>
        <Button variant="outlined" color="primary" size="small" onClick={handleClickOpen}>
            New Plot
      </Button>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">New Plot</DialogTitle>
            <DialogContent>
                <CardHeader
                    avatar={
                        <Avatar className={classes.smallAvatar} src={'/api/users/photo/' + auth.isAuthenticated().user._id} />
                    }
                    title={<Card className={classes.card}>
                        <CardHeader
                            title={values.user.name}
                            className={classes.cardHeader}
                        />
                        <CardContent className={classes.cardContent}>
                            <TextField
                                placeholder="Name your plot"
                                autoFocus
                                name='plotname'
                                value={values.plotname}
                                onChange={handleChange('plotname')}
                                className={classes.textField}
                                margin="normal"
                            />
                            <TextField
                                placeholder="Season"
                                name='season'
                                value={values.season}
                                onChange={handleChange('season')}
                                className={classes.textField}
                                margin="normal"
                            />
                            <div>
                                <TextField
                                    placeholder="prePlantSeeds"
                                    type="number"
                                    name='prePlantSeeds'
                                    value={values.prePlantSeeds}
                                    onChange={handleChange('prePlantSeeds')}
                                    className={classes.textField}
                                    margin="normal"
                                />
                                <TextField
                                    label="Pre-planted on"
                                    type="date"
                                    defaultValue={values.prePlantSeedsDate}
                                    name='prePlantSeedsDate'
                                    onChange={handleChange('prePlantSeedsDate')}
                                    className={classes.textField}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    placeholder="Pre plant germinated"
                                    type="number"
                                    name='prePlantGerminated'
                                    value={values.prePlantGerminated}
                                    onChange={handleChange('prePlantGerminated')}
                                    className={classes.textField}
                                    margin="normal"
                                />
                                <TextField
                                    label="Germinated On"
                                    type="date"
                                    defaultValue={values.prePlantGerminatedDate}
                                    name='prePlantGerminatedDate'
                                    onChange={handleChange('prePlantGerminatedDate')}
                                    className={classes.textField}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            <div>
                                <TextField
                                    type="number"
                                    placeholder="Seeds Transferred"
                                    name='seedsTransferred'
                                    value={values.seedsTransferred}
                                    onChange={handleChange('seedsTransferred')}
                                    className={classes.textField}
                                    margin="normal"
                                />
                                <TextField
                                    label="Transferred On"
                                    type="date"
                                    defaultValue={new Date()}
                                    name='seedsTransferredDate'
                                    onChange={handleChange('seedsTransferredDate')}
                                    className={classes.textField}
                                    margin="normal"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </div>
                            {values.error && (<Typography component="p" color="error">
                                <Icon color="error" className={classes.error}>error</Icon>
                                {values.error}
                            </Typography>)
                            }
                        </CardContent>
                    </Card>}
                    className={classes.cardHeader}
                />
                <DialogActions>
                    <Button color="primary" variant="contained" onClick={addPlot} className={classes.submit}>POST</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
        { props.plots.map((item, i) => {
            return <CardHeader
                // avatar={
                //     <Avatar className={classes.smallAvatar} src={'/api/users/photo/' + item.postedBy._id} />
                // }
                title={plotBody(item)}
                className={classes.cardHeader}
                key={i} />
        })
        }
    </div>)
}


Plots.propTypes = {
    plantId: PropTypes.string.isRequired,
    plots: PropTypes.array.isRequired,
    updatePlots: PropTypes.func.isRequired,
    harvests: PropTypes.array.isRequired,
    updateHarvests: PropTypes.func.isRequired
}