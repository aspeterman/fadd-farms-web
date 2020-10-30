import { makeStyles } from '@material-ui/core';
import Pagination from 'material-ui-flat-pagination';
import React, { useState } from 'react';

const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 200,
        textAlign: 'center',
        float: 'left',
        backgroundColor: theme.palette.background.paper,
        margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
    },
}))
export default function Paginate(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        perPage: 10,
        pageCount: 0,
        offset: 0,
        currentPage: 0,
        options: [10, 20, 40]
    })

    // const handlePageSizeChange = (e) => {
    //     setValues({ ...values, perPage: e.target.value })
    //     console.log(values)
    // }

    // const handleClick = (offset, e) => {
    //     setValues({ ...values, offset: offset, currentPage: offset / 10 });
    //     let newData = props.data.slice(values.offset, values.offset + values.perPage)
    //     props.handlePagination(newData)
    //     console.log(values)
    //     console.log('props', props)
    // }

    return <div className={classes.root}>
        <strong>Items per Page:</strong>
        <select value={props.values.perPage} onChange={props.handlePageSizeChange}>
            <option>10</option>
            <option>20</option>
            <option>50</option>
            <option>100</option>
        </select>
        {props.data &&
            <Pagination
                limit={props.values.perPage}
                page={props.values.currentPage}
                offset={props.values.offset}
                total={props.data.length}
                onClick={(e, offset) => props.handleClick(offset)}
                currentPageColor="primary"
                otherPageColor="inherit"
            />
        }
    </div>
}