import { Card } from '@material-ui/core';
import React, { useState } from 'react';
import { Area, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';

export default function HarvestChart(props) {
    const [values, setValues] = useState({
        harvests: props.harvests
    })
    return (
        <Card>
            {props.harvests ?
                <ComposedChart
                    width={500}
                    height={400}
                    data={values.harvests}
                    margin={{
                        top: 20, right: 20, bottom: 20, left: 20,
                    }}
                >
                    <CartesianGrid stroke="#f5f5f5" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Area type="monotone" dataKey="yield" fill="#8884d8" stroke="#8884d8" />
                </ComposedChart>
                : <div>Loading...</div>}
        </Card>
    );
}
