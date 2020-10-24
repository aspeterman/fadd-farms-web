import { List } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';


export default function RecentList(props) {
    return (
        <List dense>
            {props.harvest && props.harvests.map((harvest, i) => {
                if (i < 10)
                    return (<span key={i}>
                        {harvest.yield}
                    </span>)
            })}
        </List>

    )
}
RecentList.propTypes = {
    harvests: PropTypes.array.isRequired,
}