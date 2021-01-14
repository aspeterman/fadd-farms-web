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


  // let data = []
  // if (props.searched) {
  //   data = props.results
  // }
  // else if (props.values.added && props.values.added) {
  //   data = props.plants
  //   data.unshift(props.values.newPlant)
  // }
  // else if (props.values.removed && props.values.removed) {
  //   data = props.plants
  //   const index = data.indexOf(props.values.removedPlant)
  //   data.splice(index, 1)
  // }
  // else if (props.values.filtered && props.values.filtered === 'Active') {
  //   data = props.plants.filter(plant => plant.active === true)
  // }
  // else if (props.values.filtered && props.values.filtered === 'Inactive') {
  //   data = props.plants.filter(plant => plant.active === false)
  // }
  // else {
  //   data = props.plants
  // }

  return (
    <>
      {/* <NewPlant
        addUpdate={props.addUpdate}
      /> */}
      {/* {props.plants && */}
      <div className={classes.root}>
        {
          // props.showing === 'all' ? props.plants.map((item, i) => {
          //   return (
          //     <GridList cellHeight={'auto'} className={classes.gridList} key={i} cols={3}>
          //       <Plant plant={item} key={i} onRemove={props.removeUpdate}
          //       // addUpdate={props.addUpdate} 
          //       />
          //     </GridList>
          //   )
          // })
          //   :
          //   props.plants.filter(item => item.active === true).map((item, i) => {
          //     return (
          //       <GridList cellHeight={'auto'} className={classes.gridList} key={i} cols={3}>
          //         <Plant plant={item} key={i} onRemove={props.removeUpdate}
          //         // addUpdate={props.addUpdate} 
          //         />
          //       </GridList>
          //     )
          //   })
          props.plants.map((item, i) => {
            return (
              <GridList cellHeight={'auto'} className={classes.gridList} key={i} cols={4}>
                <Plant plant={item} key={i}
                  onRemove={props.removeUpdate}
                  currentPage={props.values.currentPage}
                  addUpdate={props.addUpdate}
                />
              </GridList>
            )
          })
        }
      </div>
      {/* } */}
    </>
  )
}
PlantList.propTypes = {
  plants: PropTypes.array.isRequired,
}
