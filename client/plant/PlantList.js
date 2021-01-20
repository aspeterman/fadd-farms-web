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
    transform: 'translateZ(0)',
  },
}));

export default function PlantList(props) {
  const classes = useStyles()

  return (
    <>
      <div className={classes.root}>
        {
          props.plants.map((item, i) => {
            return (
              <GridList cellHeight={'auto'} className={classes.gridList} key={i} cols={4}>
                <Plant plant={item} key={i}
                  onRemove={props.removeUpdate}
                  values={props.values}
                  addUpdate={props.addUpdate}
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
}
