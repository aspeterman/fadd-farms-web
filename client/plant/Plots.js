import { Button, Card, CardActionArea, CardActions, CardContent, Typography } from '@material-ui/core'
import Avatar from '@material-ui/core/Avatar'
import CardHeader from '@material-ui/core/CardHeader'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import auth from './../auth/auth-helper'
import { plot, unplot } from './api-plant.js'


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
        season: '',
        prePlantSeeds: '',
        prePlantGerminated: '',
        seedsTransferred: '',
        prePlantSeedsDate: '',
        prePlantGerminatedDate: '',
        seedsTransferredDate: '',
        error: '',
        user: {}
    })
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
            season: values.season,
            prePlantSeeds: values.prePlantSeeds,
            prePlantGerminated: values.prePlantGerminated,
            seedsTransferred: values.seedsTransferred,
            prePlantSeedsDate: values.prePlantSeedsDate,
            prePlantGerminatedDate: values.prePlantGerminatedDate,
            seedsTransferredDate: values.seedsTransferredDate
        }
        // if (event.keyCode == 13 && event.target.value) {
        //     event.preventDefault()
        plot({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.plantId, postData).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, season: '', prePlantSeeds: '', prePlantGerminated: '', seedsTransferred: '', prePlantGerminatedDate: '', prePlantSeedsDate: '', seedsTransferredDate: '' })
                props.updatePlots(data.plots)
            }
        })
        // }
    }

    const deletePlot = comment => event => {
        unplot({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.plantId, plot).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                props.updatePlots(data.plots)
            }
        })
    }

    const plotBody = item => {
        return (
            <>
                <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br />
                <Card
                >
                    <CardHeader>Record</CardHeader>
                    <CardContent>
                        <Typography>Season: {item.season}</Typography>
                        {/* <Card.Text>Description: {props.exercise.description}</Card.Text> */}
                        <Typography>Pre Plant Seeds: {item.prePlantSeeds} on {item.prePlantSeedsDate}</Typography>
                        <Typography>Pre Plant Seeds Germinated: {item.prePlantGerminated} on {item.prePlantGerminatedDate}</Typography>
                        <Typography>Seeds Transferred: {item.seedsTransferred} on {item.seedsTransferredDate}</Typography>
                        {/* <Card.Text> <span>Total Yield: {props.exercise.harvestYieldTally} lbs</span><br />
                            <span><TallyModal id={props.exercise._id} /></span></Card.Text> */}
                    </CardContent>
                    {/* <Card.Footer><ButtonGroup><Button variant="danger" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</Button><EditModal id={props.exercise._id} /></ButtonGroup></Card.Footer> */}
                    <CardActionArea>
                        <span className={classes.commentDate}>
                            {(new Date(item.created)).toDateString()} |
            {auth.isAuthenticated().user._id === item.postedBy._id &&
                                <Icon onClick={deletePlot(item)} className={classes.commentDelete}>delete</Icon>}
                        </span>
                    </CardActionArea>
                </Card>
            </>
        )
    }
    return (<div>
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
                        placeholder="prePlantSeeds"
                        multiline
                        rows="1"
                        name='prePlantSeeds'
                        value={values.prePlantSeeds}
                        onChange={handleChange('prePlantSeeds')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        placeholder="MM/DD/YYYY"
                        multiline
                        rows="1"
                        name='prePlantSeedsDate'
                        value={values.prePlantSeedsDate}
                        onChange={handleChange('prePlantSeedsDate')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        placeholder="Pre plant germinated"
                        multiline
                        rows="1"
                        name='prePlantGerminated'
                        value={values.prePlantGerminated}
                        onChange={handleChange('prePlantGerminated')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        placeholder="MM/DD/YYYY"
                        multiline
                        rows="1"
                        name='prePlantGerminatedDate'
                        value={values.prePlantGerminatedDate}
                        onChange={handleChange('prePlantGerminatedDate')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        placeholder="Seeds Transferred"
                        multiline
                        rows="1"
                        name='seedsTransferred'
                        value={values.seedsTransferred}
                        onChange={handleChange('seedsTransferred')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        placeholder="MM/DD/YYYY"
                        multiline
                        rows="1"
                        name='seedsTransferredDate'
                        value={values.seedsTransferredDate}
                        onChange={handleChange('seedsTransferredDate')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        placeholder="Season"
                        multiline
                        rows="1"
                        name='season'
                        value={values.season}
                        onChange={handleChange('season')}
                        className={classes.textField}
                        margin="normal"
                    />
                    {values.error && (<Typography component="p" color="error">
                        <Icon color="error" className={classes.error}>error</Icon>
                        {values.error}
                    </Typography>)
                    }
                </CardContent>
                <CardActions>
                    <Button color="primary" variant="contained" onClick={addPlot} className={classes.submit}>POST</Button>
                </CardActions>
            </Card>}
            className={classes.cardHeader}
        />
        { props.plots.map((item, i) => {
            return <CardHeader
                avatar={
                    <Avatar className={classes.smallAvatar} src={'/api/users/photo/' + item.postedBy._id} />
                }
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
    updatePlots: PropTypes.func.isRequired
}