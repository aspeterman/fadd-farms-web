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
// import { listByPlant } from './../plots/api-plot.js'
// import DeletePlot from './../plots/DeletePlot'

// const useStyles = makeStyles(theme => ({
//   plots: {
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

// export default function MyPlots(props) {
//   const classes = useStyles()
//   const [plots, setPlots] = useState([])

//   useEffect(() => {
//     const abortController = new AbortController()
//     const signal = abortController.signal

//     listByPlant({
//       plantId: props.plantId
//     }, signal).then((data) => {
//       if (data.error) {
//         console.log(data.error)
//       } else {
//         setPlots(data)
//       }
//     })
//     return function cleanup() {
//       abortController.abort()
//     }
//   }, [])

//   const removePlot = (plot) => {
//     const updatedPlots = [...plots]
//     const index = updatedPlots.indexOf(plot)
//     updatedPlots.splice(index, 1)
//     setPlots(updatedPlots)
//   }

//   return (
//     <Card className={classes.plots}>
//       <Typography type="title" className={classes.title}>
//         Plots
//           <span className={classes.addButton}>
//           <Link to={"/plants/" + props.plantId + "/plots/new"}>
//             <Button color="primary" variant="contained">
//               <Icon className={classes.leftIcon}>add_box</Icon>  New Plot
//               </Button>
//           </Link>
//         </span>
//       </Typography>
//       <List dense>
//         {plots.map((plot, i) => {
//           return <span key={i}>
//             <ListItem>
//               <CardMedia
//                 className={classes.cover}
//                 image={'/api/plot/image/' + plot._id + "?" + new Date().getTime()}
//                 title={plot.name}
//               />
//               <div className={classes.details}>
//                 <Typography type="headline" component="h2" color="primary" className={classes.plotTitle}>
//                   {plot.name}
//                 </Typography>
//               </div>
//               <ListItemSecondaryAction>
//                 <Link to={"/plants/" + plot.plant._id + "/" + plot._id + "/edit"}>
//                   <IconButton aria-label="Edit" color="primary">
//                     <Edit />
//                   </IconButton>
//                 </Link>
//                 <DeletePlot
//                   plot={plot}
//                   plantId={props.plantId}
//                   onRemove={removePlot} />
//               </ListItemSecondaryAction>
//             </ListItem>
//             <Divider /></span>
//         })}
//       </List>
//     </Card>)
// }
// MyPlots.propTypes = {
//   plantId: PropTypes.string.isRequired
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
import { listByPlant } from './api-plot.js'
import DeletePlot from './DeletePlot'

const useStyles = makeStyles(theme => ({
  plots: {
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

export default function MyPlots(props) {
  const classes = useStyles()
  const [plots, setPlots] = useState([])

  useEffect(() => {
    const abortController = new AbortController()
    const signal = abortController.signal

    listByPlant({
      plantId: props.plantId
    }, signal).then((data) => {
      if (data.error) {
        console.log(data.error)
      } else {
        setPlots(data)
      }
    })
    return function cleanup() {
      abortController.abort()
    }
  }, [])

  const removePlot = (plot) => {
    const updatedPlotts = [...plots]
    const index = updatedPlotts.indexOf(plot)
    updatedPlotts.splice(index, 1)
    setPlots(updatedPlotts)
  }

  return (
    <Card className={classes.plots}>
      <Typography type="title" className={classes.title}>
        plots
          <span className={classes.addButton}>
          <Link to={"/plants/" + props.plantId + "/plots/new"}>
            <Button color="primary" variant="contained">
              <Icon className={classes.leftIcon}>add_box</Icon>  New plot
              </Button>
          </Link>
        </span>
      </Typography>
      <List dense>
        {plots.map((plot, i) => {
          return <span key={i}>
            <ListItem>
              <CardMedia
                className={classes.cover}
                image={'/api/plot/image/' + plot._id + "?" + new Date().getTime()}
                title={plot.name}
              />
              <div className={classes.details}>
                <Typography type="headline" component="h2" color="primary" className={classes.plotTitle}>
                  <Link to={`/plants/${plot.plant._id}/${plot._id}`}>{plot.name}</Link>
                </Typography>
              </div>
              <ListItemSecondaryAction>
                <Link to={"/plants/" + plot.plant._id + "/" + plot._id + "/edit"}>
                  <IconButton aria-label="Edit" color="primary">
                    <Edit />
                  </IconButton>
                </Link>
                <DeletePlot
                  plot={plot}
                  plantId={props.plantId}
                  onRemove={removePlot} />
              </ListItemSecondaryAction>
            </ListItem>
            <Divider /></span>
        })}
      </List>
    </Card>)
}
MyPlots.propTypes = {
  plantId: PropTypes.string.isRequired
}

