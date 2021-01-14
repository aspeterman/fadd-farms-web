// import { Grid, makeStyles, MenuItem, Select, Typography } from '@material-ui/core';
// import Pagination from 'material-ui-flat-pagination';
// import PropTypes from 'prop-types';
// import React from 'react';

// const useStyles = makeStyles(theme => ({
//     root: {
//         minWidth: 200,
//         textAlign: 'center',
//         float: 'left',
//         backgroundColor: theme.palette.background.paper,
//         margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
//     },
//     pagination: {
//         margin: `${theme.spacing(3)}px ${theme.spacing(1)}px ${theme.spacing(2)}px`,
//         borderRadius: '3px 0 0 3px',
//         boxShadow: 'none'
//     },
//     grid: {
//         direction: "row",
//         justify: "space-between",
//         alignItems: "center",
//     },
// }))
// export default function Paginate(props) {
//     const classes = useStyles()

//     return <div className={classes.root}>
//         <Grid container direction="column" justify="center" alignItems="stretch" className={classes.pagination}>
//             <Grid item>
//                 <Grid
//                     container
//                     className={classes.grid}
//                     spacing={2}
//                 >
//                     <Grid item>
//                         <Typography
//                             display="inline"
//                             variant="subtitle2"
//                             color="textSecondary"
//                             component="p"
//                         >
//                             Items Per Page
//               </Typography>
//                     </Grid>
//                     <Grid item>
//                         <div>
//                             <Select value={props.values.perPage} onChange={props.handlePageSizeChange}>
//                                 <MenuItem value={10}>10</MenuItem>
//                                 <MenuItem value={20}>20</MenuItem>
//                                 <MenuItem value={50}>50</MenuItem>
//                                 <MenuItem value={100}>100</MenuItem>
//                             </Select>
//                         </div>
//                     </Grid>
//                 </Grid>
//                 <Grid item >
//                     {props.data &&
//                         <Pagination
//                             limit={props.values.perPage}
//                             page={props.values.currentPage}
//                             offset={props.values.offset}
//                             total={props.data.length}
//                             onClick={(e, offset) => props.handleClick(offset)}
//                             currentPageColor="primary"
//                             otherPageColor="inherit"
//                             reduced
//                         />
//                     }
//                 </Grid>
//             </Grid>
//         </Grid>
//     </div>
// }

// Paginate.propTypes = {
//     values: PropTypes.object.isRequired,
//     data: PropTypes.array.isRequired,
//     handlePageSizeChange: PropTypes.func.isRequired,
//     handleClick: PropTypes.func.isRequired
// }

import { makeStyles, MenuItem, Select } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles(theme => ({
    numbers: {
        textAlign: 'center',
        marginTop: '20px',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left'
    },

    link: {
        textDecoration: 'none',
        fontSize: '20px',
        padding: '5px 10px',
        border: '1px solid #ccc',
        background: '#ccc',
        color: '#fff',
        margin: '5px',
        "&:active": {
            backgroundColor: "#7f7373"
        },
    },

    active: {
        backgroundColor: '#7f7373'
    }
}))

const Pagination = (props) => {
    const classes = useStyles()
    const pages = [...Array(props.totalPages).keys()].map(number => number + 1);

    return (
        <div className={classes.numbers}>
            <Select value={props.values.perPage} onChange={props.handlePageSizeChange}>
                <MenuItem value={30}>30</MenuItem>
                <MenuItem value={60}>60</MenuItem>
                <MenuItem value={90}>90</MenuItem>
            </Select>
            {pages.map(number => (
                <a
                    key={number}
                    href="/#"
                    onClick={() => props.handleClick(number)}
                    className={classes.link}
                >
                    {number}
                </a>
            ))}
        </div>
    );
};

export default Pagination;