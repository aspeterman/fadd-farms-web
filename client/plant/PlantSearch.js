// import { IconButton, InputAdornment, TextField } from '@material-ui/core'
// import { Cancel, Search } from '@material-ui/icons'
// import React from 'react'

// export default function PlantSearch(props) {
//     // const [searchedPlants, setsearchedPlants] = useState([])
//     // const [query, setQuery] = useState('')

//     // const handleChange = (e) => {
//     //     setQuery(e.target.value)
//     // }

//     // const handleCancel = () => {
//     //     setsearchedPlants([])
//     //     setQuery('')
//     //     props.handleSearch(props.plants)
//     // }

//     // const handleSearch = () => {
//     //     let newArray = []
//     //     props.plants.filter((item) => {
//     //         if (item.plantname.toLowerCase().includes(query.toLocaleLowerCase())) {
//     //             newArray.push(item)
//     //         }
//     //         setsearchedPlants(newArray)
//     //         console.log(searchedPlants)
//     //         props.handleSearch(newArray)
//     //     })
//     // }

//     return (
//         <>
//             <TextField
//                 value={props.query}
//                 onChange={props.handleChange}
//                 id="input-with-icon-textfield"
//                 placeholder="Search By Plant"
//                 InputProps={{
//                     endAdornment: (
//                         <InputAdornment position="end">
//                             <IconButton hidden={!props.query} onClick={props.handleCancel}>{props.query && <Cancel />}</IconButton>
//                             <IconButton onClick={props.handleSearch}><Search /></IconButton>
//                         </InputAdornment>
//                     ),
//                 }}
//             />
//         </>
//     )
// }

import { Divider, Icon, IconButton, InputBase, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState } from 'react';
import { useHistory, withRouter } from 'react-router';
import auth from '../auth/auth-helper.js';

const useStyles = makeStyles(theme => ({
    card: {
        margin: 'auto',
        textAlign: 'center',
        width: 600
        // paddingTop: 10,
        // backgroundColor: '#80808024'
    },
    menu: {
        width: 200,
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 130,
        verticalAlign: 'bottom',
        marginBottom: '20px'
    },
    searchField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 300,
        marginBottom: '20px',
    },
    searchButton: {
        minWidth: '20px',
        height: '30px',
        padding: '0 8px',
        marginBottom: '20px'
    },
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
}))

const PlantSearch = withRouter((props) => {
    const classes = useStyles()
    const history = useHistory()
    const [values, setValues] = useState({
        category: '',
        search: '',
        results: [],
        searched: false,
        active: true,
        showing: 'all'
    })
    const [anchorEl, setAnchorEl] = useState(false)
    const handleChange = name => event => {
        setValues({
            ...values, [name]: event.target.value,
        })
    }

    const jwt = auth.isAuthenticated()
    const search = () => {
        if (values.search) {
            let url = `/search=${values.search}`
            // list({
            //     search: values.search || undefined, category: values.category, active: values.active,
            //     userId: jwt.user._id
            // }, { t: jwt.token }).then((data) => {
            //     if (data.error) {
            //         console.log(data.error)
            //     } else {
            //         setValues({ ...values, results: data, searched: true })
            //         props.handleSearch(data)
            //         handleClose()
            //         history.push(url)
            //     }
            // })
            history.push(url)

        }
    }
    const enterKey = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault()
            search()
        }
    }

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Paper component="form" className={classes.root}>
            <IconButton className={classes.iconButton} aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >
                <MenuIcon />
            </IconButton>
            <InputBase
                id="search"
                placeholder="Search"
                type="text"
                size='small'
                value={values.search}
                onKeyDown={enterKey}
                onChange={handleChange('search')}
                className={classes.input}
                margin="dense"
            />
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton className={classes.iconButton} onClick={search}>
                <Icon >search</Icon>
            </IconButton>

            {/* <StyledMenu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>
                    <TextField
                        id="select-category"
                        select
                        label="Select category"
                        className={classes.textField}
                        value={values.category}
                        onChange={handleChange('category')}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal">
                        <MenuItem value="All">All</MenuItem>
                        {props.values.categories.map(option => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                </MenuItem>
            </StyledMenu> */}
        </Paper>
    )
})

export default PlantSearch