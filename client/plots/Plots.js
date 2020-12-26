import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile'
import GridListTileBar from '@material-ui/core/GridListTileBar'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React from 'react'
import { Link } from 'react-router-dom'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    background: theme.palette.background.paper,
    textAlign: 'left',
    padding: '0 8px'
  },
  container: {
    minWidth: '100%',
    paddingBottom: '14px'
  },
  gridList: {
    width: '100%',
    minHeight: 200,
    padding: '16px 0 10px'
  },
  title: {
    padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
    color: theme.palette.openTitle,
    width: '100%'
  },
  tile: {
    textAlign: 'center'
  },
  image: {
    height: '100%'
  },
  tileBar: {
    backgroundColor: 'rgba(0, 0, 0, 0.72)',
    textAlign: 'left'
  },
  tileTitle: {
    fontSize: '1.1em',
    marginBottom: '5px',
    color: 'rgb(189, 222, 219)',
    display: 'block'
  }
}))

export default function Plots(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {props.plots && props.plots.length > 0 ?
        (<div className={classes.container}>
          <GridList cellHeight={200} className={classes.gridList} cols={3}>
            {props.plots.map((plot, i) => (
              <GridListTile key={i} className={classes.tile}>
                <Link to={"/plot/" + plot._id}><img className={classes.image} src={'/api/plot/image/' + plot._id} alt={plot.name} /></Link>
                <GridListTileBar className={classes.tileBar}
                  title={<Link to={"/plot/" + plot._id} className={classes.tileTitle}>{plot.name}</Link>}
                />
              </GridListTile>
            ))}
          </GridList></div>) : props.searched && (<Typography variant="subheading" component="h4" className={classes.title}>No plots found! :(</Typography>)}
    </div>)
}
Plots.propTypes = {
  plots: PropTypes.array.isRequired,
  searched: PropTypes.bool.isRequired
}
