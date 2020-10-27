// import Button from '@material-ui/core/Button'
// import Card from '@material-ui/core/Card'
// import CardMedia from '@material-ui/core/CardMedia'
// import Divider from '@material-ui/core/Divider'
// import Icon from '@material-ui/core/Icon'
// import IconButton from '@material-ui/core/IconButton'
// import List from '@material-ui/core/List'
// import ListItem from '@material-ui/core/ListItem'
// import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
// import { makeStyles } from '@material-ui/core/styles'
// import Typography from '@material-ui/core/Typography'
// import Edit from '@material-ui/icons/Edit'
// import PropTypes from 'prop-types'
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom'
// import { listByPlot } from './../harvests/api-harvest.js'
// import Deleteharvest from './../harvests/Deleteharvest'

// const useStyles = makeStyles(theme => ({
//   harvests: {
//     padding: '24px'
//   },
//   addButton: {
//     float: 'right'
//   },
//   leftIcon: {
//     marginRight: "8px"
//   },
//   title: {
//     margin: theme.spacing(2),
//     color: theme.palette.protectedTitle,
//     fontSize: '1.2em'
//   },
//   subheading: {
//     marginTop: theme.spacing(2),
//     color: theme.palette.openTitle
//   },
//   cover: {
//     width: 110,
//     height: 100,
//     margin: '8px'
//   },
//   details: {
//     padding: '10px'
//   },
// }))

// export default function MyHarvests(props) {
//   const classes = useStyles()
//   const [harvests, setharvests] = useState([])

//   useEffect(() => {
//     const abortController = new AbortController()
//     const signal = abortController.signal

//     listByPlot({
//       harvestId: props.harvestId
//     }, signal).then((data) => {
//       if (data.error) {
//         console.log(data.error)
//       } else {
//         setharvests(data)
//       }
//     })
//     return function cleanup() {
//       abortController.abort()
//     }
//   }, [])

//   const removeHarvest = (harvest) => {
//     const updatedharvests = [...harvests]
//     const index = updatedharvests.indexOf(harvest)
//     updatedharvests.splice(index, 1)
//     setharvests(updatedharvests)
//   }

//   return (
//     <Card className={classes.harvests}>
//       <Typography type="title" className={classes.title}>
//         harvests
//           <span className={classes.addButton}>
//           <Link to={"/plants/" + props.harvestId + "/harvests/new"}>
//             <Button color="primary" variant="contained">
//               <Icon className={classes.leftIcon}>add_box</Icon>  New harvest
//               </Button>
//           </Link>
//         </span>
//       </Typography>
//       <List dense>
//         {harvests.map((harvest, i) => {
//           return <span key={i}>
//             <ListItem>
//               <CardMedia
//                 className={classes.cover}
//                 image={'/api/harvest/image/' + harvest._id + "?" + new Date().getTime()}
//                 title={harvest.name}
//               />
//               <div className={classes.details}>
//                 <Typography type="headline" component="h2" color="primary" className={classes.harvestTitle}>
//                   {harvest.name}
//                 </Typography>
//               </div>
//               <ListItemSecondaryAction>
//                 <Link to={"/plants/" + harvest.plant._id + "/" + harvest._id + "/edit"}>
//                   <IconButton aria-label="Edit" color="primary">
//                     <Edit />
//                   </IconButton>
//                 </Link>
//                 <Deleteharvest
//                   harvest={harvest}
//                   harvestId={props.harvestId}
//                   onRemove={removeHarvest} />
//               </ListItemSecondaryAction>
//             </ListItem>
//             <Divider /></span>
//         })}
//       </List>
//     </Card>)
// }
// MyHarvests.propTypes = {
//   harvestId: PropTypes.string.isRequired
// }



import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import Divider from '@material-ui/core/Divider'
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Edit from '@material-ui/icons/Edit'
import PropTypes from 'prop-types'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listByPlot } from './api-harvest.js'
import DeleteHarvest from './DeleteHarvest.js'
import HarvestChart from './HarvestChart.js'

const useStyles = makeStyles(theme => ({
    harvests: {
        padding: '24px',
        // maxHeight: 500,
        // overflowY: 'scroll'
    },
    addButton: {
        float: 'right'
    },
    leftIcon: {
        marginRight: "8px"
    },
    title: {
        margin: theme.spacing(2),
        color: theme.palette.protectedTitle,
        fontSize: '1.2em'
    },
    subheading: {
        marginTop: theme.spacing(2),
        color: theme.palette.openTitle
    },
    cover: {
        width: 110,
        height: 100,
        margin: '8px'
    },
    details: {
        padding: '10px'
    },
}))

export default function MyHarvests(props) {
    const classes = useStyles()
    const [harvests, setHarvests] = useState([])

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listByPlot({
            plotId: props.plotId
        }, signal).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setHarvests(data)
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [])

    const removeHarvest = (harvest) => {
        const updatedharvestts = [...harvests]
        const index = updatedharvestts.indexOf(harvest)
        updatedharvestts.splice(index, 1)
        setHarvests(updatedharvestts)
    }

    return (
        <>
            <HarvestChart harvests={harvests} />
            <Divider />
            <Card className={classes.harvests}>
                <Typography type="title" className={classes.title}>
                    harvests
          <span className={classes.addButton}>
                        <Link to={`/plants/${props.plantId}/${props.plotId}/new`}>
                            <Button color="primary" variant="contained">
                                <Icon className={classes.leftIcon}>add_box</Icon>  New harvest
              </Button>
                        </Link>
                    </span>
                </Typography>
                <List dense>
                    {harvests.map((harvest, i) => {
                        return <span key={i}>
                            <ListItem>
                                <CardMedia
                                    className={classes.cover}
                                    image={'/api/harvest/image/' + harvest._id + "?" + new Date().getTime()}
                                    title={harvest.name}
                                />
                                <div className={classes.details}>
                                    <Typography type="headline" component="h2" color="primary" className={classes.harvestTitle}>
                                        Yield(lbs): {harvest.yield}
                                    </Typography>
                                </div>
                                <ListItemSecondaryAction>
                                    <Link to={"/plants/" + props.plantId + '/' + props.plotId + "/" + harvest._id + "/edit"}>
                                        <IconButton aria-label="Edit" color="primary">
                                            <Edit />
                                        </IconButton>
                                    </Link>
                                    <DeleteHarvest
                                        harvest={harvest}
                                        plotId={harvest.plot._id}
                                        harvestId={harvest._id}
                                        onRemove={removeHarvest} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <Divider /></span>
                    })}
                </List>
            </Card>
        </>)
}
MyHarvests.propTypes = {
    plantId: PropTypes.string.isRequired,
    plotId: PropTypes.string.isRequired
}

