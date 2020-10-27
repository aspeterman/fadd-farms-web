import { List } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import Harvest from './Harvest';


export default function RecentList(props) {
    return (
        <List dense>
            { props.harvests.map((harvest, i) => {
                return (
                    <Harvest removeUpdate={props.removeUpdate} harvest={harvest} key={i} />
                )
            })}
        </List>

    )
}
RecentList.propTypes = {
    harvests: PropTypes.array.isRequired,
}