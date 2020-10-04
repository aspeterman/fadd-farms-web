// import { Button, Card, CardActionArea, CardActions, CardContent, IconButton, Typography } from '@material-ui/core'
// import Avatar from '@material-ui/core/Avatar'
// import CardHeader from '@material-ui/core/CardHeader'
// import Icon from '@material-ui/core/Icon'
// import { makeStyles } from '@material-ui/core/styles'
// import TextField from '@material-ui/core/TextField'
// import { PhotoCamera } from '@material-ui/icons'
// import PropTypes from 'prop-types'
// import React, { useState } from 'react'
// import { Link } from 'react-router-dom'
// import auth from './../auth/auth-helper'
// import { createHarvest, unHarvest } from './api-plant.js'


// const useStyles = makeStyles(theme => ({
//     cardHeader: {
//         paddingTop: theme.spacing(1),
//         paddingBottom: theme.spacing(1)
//     },
//     smallAvatar: {
//         width: 25,
//         height: 25
//     },
//     commentField: {
//         width: '96%'
//     },
//     commentText: {
//         backgroundColor: 'white',
//         padding: theme.spacing(1),
//         margin: `2px ${theme.spacing(2)}px 2px 2px`
//     },
//     commentDate: {
//         display: 'block',
//         color: 'gray',
//         fontSize: '0.8em'
//     },
//     commentDelete: {
//         fontSize: '1.6em',
//         verticalAlign: 'middle',
//         cursor: 'pointer'
//     }
// }))

// export default function Harvests(props) {
//     const classes = useStyles()
//     const [values, setValues] = useState({
//         observations: '',
//         yield: '',
//         created: '',
//         photo: '',
//         error: '',
//         user: {}
//     })
//     const jwt = auth.isAuthenticated()
//     const handleChange = name => event => {
//         const value = name === 'photo'
//             ? event.target.files[0]
//             : event.target.value
//         setValues({ ...values, [name]: value })
//     }

//     const addHarvest = (event) => {
//         let harvestData = {
//             observations: values.observations,
//             yield: values.yield,
//             created: values.created
//         }
//         if (event.keyCode == 13 && event.target.value) {
//             event.preventDefault()
//             createHarvest({
//                 userId: jwt.user._id
//             }, {
//                 t: jwt.token
//             }, props.plantId, harvestData).then((data) => {
//                 if (data.error) {
//                     console.log(data.error)
//                 } else {
//                     setValues({ ...values, observations: '', yield: '', created: '' })
//                     props.updateHarvests(data.harvests)
//                 }
//             })
//         }
//     }

//     const deleteHarvest = harvest => event => {
//         unHarvest({
//             userId: jwt.user._id
//         }, {
//             t: jwt.token
//         }, props.plantId, harvest).then((data) => {
//             if (data.error) {
//                 console.log(data.error)
//             } else {
//                 props.updateHarvests(data.harvests)
//             }
//         })
//     }

//     const harvestBody = item => {
//         return (
//             <>
//                 <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br />
//                 <Card
//                 >
//                     <CardHeader>Record</CardHeader>
//                     <CardContent>
//                         <Typography>Season: {item.season}</Typography>
//                         {/* <Card.Text>Description: {props.exercise.description}</Card.Text> */}
//                         <Typography>Pre Plant Seeds: {item.prePlantSeeds} on {item.prePlantSeedsDate}</Typography>
//                         <Typography>Pre Plant Seeds Germinated: {item.prePlantGerminated} on {item.prePlantGerminatedDate}</Typography>
//                         <Typography>Seeds Transferred: {item.seedsTransferred} on {item.seedsTransferredDate}</Typography>
//                     </CardContent>
//                     <CardActionArea>
//                         <span className={classes.commentDate}>
//                             {(new Date(item.created)).toDateString()} |
//             {auth.isAuthenticated().user._id === item.postedBy._id &&
//                                 <Icon onClick={deleteHarvest(item)} className={classes.commentDelete}>delete</Icon>}
//                         </span>
//                     </CardActionArea>
//                 </Card>
//             </>
//         )
//     }
//     return (<div>
//         <CardHeader
//             avatar={
//                 <Avatar className={classes.smallAvatar} src={'/api/users/photo/' + auth.isAuthenticated().user._id} />
//             }
//             title={<Card className={classes.card}>
//                 <CardHeader
//                     title={values.user.name}
//                     className={classes.cardHeader}
//                 />
//                 <CardContent className={classes.cardContent}>
//                     <TextField
//                         placeholder="Observations"
//                         multiline
//                         rows="1"
//                         name='observations'
//                         value={values.prePlantSeeds}
//                         onChange={handleChange('observations')}
//                         className={classes.textField}
//                         margin="normal"
//                     />
//                     <TextField
//                         placeholder="Yield (lbs)"
//                         multiline
//                         rows="1"
//                         name='yield'
//                         value={values.prePlantSeedsDate}
//                         onChange={handleChange('yield')}
//                         className={classes.textField}
//                         margin="normal"
//                     />
//                     <TextField
//                         placeholder="MM/DD/YYYY"
//                         multiline
//                         rows="1"
//                         name='created'
//                         value={values.prePlantGerminated}
//                         onChange={handleChange('created')}
//                         className={classes.textField}
//                         margin="normal"
//                     />
//                     <input accept="image/*" onChange={handleChange('photo')} className={classes.input} id="icon-button-file" type="file" />
//                     <label htmlFor="icon-button-file">
//                         <IconButton color="secondary" className={classes.photoButton} component="span">
//                             <PhotoCamera />
//                         </IconButton>
//                     </label> <span className={classes.filename}>{values.photo ? values.photo.name : ''}</span>
//                     {values.error && (<Typography component="p" color="error">
//                         <Icon color="error" className={classes.error}>error</Icon>
//                         {values.error}
//                     </Typography>)
//                     }
//                 </CardContent>
//                 <CardActions>
//                     <Button color="primary" variant="contained" onClick={addHarvest} className={classes.submit}>POST</Button>
//                 </CardActions>
//             </Card>}
//             className={classes.cardHeader}
//         />
//         { props.plants.harvests.map((item, i) => {
//             return <CardHeader
//                 avatar={
//                     <Avatar className={classes.smallAvatar} src={'/api/users/photo/' + item.postedBy._id} />
//                 }
//                 title={harvestBody(item)}
//                 className={classes.cardHeader}
//                 key={i} />
//         })
//         }
//     </div>)
// }


// Harvests.propTypes = {
//     plantId: PropTypes.string.isRequired,
//     harvests: PropTypes.array.isRequired,
//     updateHarvests: PropTypes.func.isRequired
// }

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
import { createHarvest, unHarvest } from './api-plant.js'


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

export default function Harvests(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        observations: '',
        yield: '',
        created: '',
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

    const addHarvest = (event) => {
        let postData = {
            observations: values.observations,
            yield: values.yield,
            created: values.created
        }
        // if (event.keyCode == 13 && event.target.value) {
        //     event.preventDefault()
        createHarvest({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.plantId, postData).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setValues({ ...values, season: '', prePlantSeeds: '', prePlantGerminated: '', seedsTransferred: '', prePlantGerminatedDate: '', prePlantSeedsDate: '', seedsTransferredDate: '' })
                props.updateHarvests(data.harvests)
            }
        })
        // }
    }

    const deleteHarvest = harvest => event => {
        unHarvest({
            userId: jwt.user._id
        }, {
            t: jwt.token
        }, props.plantId, harvest).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                props.updateHarvests(data.harvests)
            }
        })
    }

    const harvestBody = item => {
        return (
            <>
                <Link to={"/user/" + item.postedBy._id}>{item.postedBy.name}</Link><br />
                <Card
                >
                    <CardHeader>{item.created}</CardHeader>
                    <CardContent>
                        <Typography>Harvester Noted: {item.observations}</Typography>
                        <Typography>Yield(lbs) {item.yield}</Typography>
                    </CardContent>
                    <CardActionArea>
                        <span className={classes.commentDate}>
                            {(new Date(item.created)).toDateString()} |
                    {auth.isAuthenticated().user._id === item.postedBy._id &&
                                <Icon onClick={deleteHarvest(item)} className={classes.commentDelete}>delete</Icon>}
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
                        placeholder="Observations"
                        multiline
                        rows="1"
                        name='observations'
                        value={values.prePlantSeeds}
                        onChange={handleChange('observations')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        placeholder="Yield (lbs)"
                        multiline
                        rows="1"
                        name='yield'
                        value={values.prePlantSeedsDate}
                        onChange={handleChange('yield')}
                        className={classes.textField}
                        margin="normal"
                    />
                    <TextField
                        placeholder="MM/DD/YYYY"
                        multiline
                        rows="1"
                        name='created'
                        value={values.prePlantGerminated}
                        onChange={handleChange('created')}
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
                    <Button color="primary" variant="contained" onClick={addHarvest} className={classes.submit}>POST</Button>
                </CardActions>
            </Card>}
            className={classes.cardHeader}
        />
        { props.harvests.map((item, i) => {
            return <CardHeader
                avatar={
                    <Avatar className={classes.smallAvatar} src={'/api/users/photo/' + item.postedBy._id} />
                }
                title={harvestBody(item)}
                className={classes.cardHeader}
                key={i} />
        })
        }
    </div>)
}


Harvests.propTypes = {
    plantId: PropTypes.string.isRequired,
    harvests: PropTypes.array.isRequired,
    updateHarvests: PropTypes.func.isRequired
}