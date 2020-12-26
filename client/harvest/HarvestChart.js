import { Button, Card, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { Area, CartesianGrid, ComposedChart, Tooltip, XAxis, YAxis } from 'recharts';

const useStyles = makeStyles(theme => ({
    card: {
        margin: 'auto',
        textAlign: 'center',
        // marginTop: theme.spacing(2),
        paddingBottom: theme.spacing(2)
    }
}))

export default function HarvestChart(props) {
    const classes = useStyles()
    return (
        <Card className={classes.card}>
            <Button onClick={props.handleThisYear}>This Year</Button>
            <Button onClick={props.handleLastYear}>Last Year</Button>
            <Button onClick={props.handleShowAll}>Show All</Button>
            {props.harvests ?
                <ComposedChart
                    width={500}
                    height={400}
                    data={props.harvests}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Area type="monotone" dataKey="yield" fill="#8884d8" stroke="#8884d8" />
                </ComposedChart>
                : <div>Loading...</div>}
        </Card>
    );
}
HarvestChart.propTypes = {
    harvests: PropTypes.array.isRequired,
    handleShowAll: PropTypes.func.isRequired,
    handleThisYear: PropTypes.func.isRequired,
    handleLastYear: PropTypes.func.isRequired
}