import { GridList, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Plant from './Plant';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: 500,
    // height: 550,
  },
}));

export default function PlantList(props) {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      {props.showing === 'all' ? props.plants.map((item, i) => {
        return (
          <GridList cellHeight={'auto'} className={classes.gridList} key={i} cols={3}>
            <Plant plant={item} key={i} onRemove={props.removeUpdate}
            // addUpdate={props.addUpdate} 
            />
          </GridList>
        )
      })
        :
        props.plants.filter(item => item.active === true).map((item, i) => {
          return (
            <GridList cellHeight={'auto'} className={classes.gridList} key={i} cols={3}>
              <Plant plant={item} key={i} onRemove={props.removeUpdate}
              // addUpdate={props.addUpdate} 
              />
            </GridList>
          )
        })
      }
    </div>
  )
}
PlantList.propTypes = {
  plants: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
