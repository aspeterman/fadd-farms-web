import { GridList, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import NewPlant from './NewPlant';
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


  let data = []
  if (props.searched) {
    data = props.results
  }
  else if (props.values.added) {
    data = props.plants
    data.unshift(props.values.newPlant)
  }
  else if (props.values.removed) {
    data = props.plants
    const index = data.indexOf(props.values.removedPlant)
    data.splice(index, 1)
  }
  else {
    data = props.plants
  }

  return (
    <>
      <NewPlant
        addUpdate={props.addUpdate}
      />
      <div className={classes.root}>
        {props.showing === 'all' ? data.map((item, i) => {
          return (
            <GridList cellHeight={'auto'} className={classes.gridList} key={i} cols={3}>
              <Plant plant={item} key={i} onRemove={props.removeUpdate}
              // addUpdate={props.addUpdate} 
              />
            </GridList>
          )
        })
          :
          data.filter(item => item.active === true).map((item, i) => {
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
    </>
  )
}
PlantList.propTypes = {
  plants: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
