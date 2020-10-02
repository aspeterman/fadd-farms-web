import PropTypes from 'prop-types'
import React from 'react'
import Plant from './Plant'

export default function PlantList(props) {
  return (
    <div style={{ marginTop: '24px' }}>
      {props.plants.map((item, i) => {
        return <Plant plant={item} key={i} onRemove={props.removeUpdate} />
      })
      }
    </div>
  )
}
PlantList.propTypes = {
  plants: PropTypes.array.isRequired,
  removeUpdate: PropTypes.func.isRequired
}
