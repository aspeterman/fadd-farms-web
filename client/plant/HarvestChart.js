import moment from 'moment';
import React, { PureComponent } from 'react';
import { Area, CartesianGrid, ComposedChart, Legend, Tooltip, XAxis, YAxis } from 'recharts';


function flatten(arr) {
    const result = []

    arr.forEach((i) => {
        if (Array.isArray(i)) {
            result.push(...flatten(i))
        } else {
            result.push(i)
        }
    })
    return result.sort((a, b) => new moment(a.date).format('YYYY,MM,DD') - new moment(b.date).format('YYYY,MM,DD'))
}

export default class HarvestCalendar extends PureComponent {
    render() {
        let data
        this.props.harvests ?
            data = flatten(this.props.harvests)
            : data = [{}]
        return (
            <ComposedChart
                width={500}
                height={400}
                data={data}
                margin={{
                    top: 20, right: 20, bottom: 20, left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="weight" fill="#8884d8" stroke="#8884d8" />
            </ComposedChart>
        );
    }
}
