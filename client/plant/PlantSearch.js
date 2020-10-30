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

import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Divider from '@material-ui/core/Divider'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import SearchIcon from '@material-ui/icons/Search'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { list } from './api-plant.js'
import Products from './Products'

const useStyles = makeStyles(theme => ({
    card: {
        margin: 'auto',
        textAlign: 'center',
        paddingTop: 10,
        backgroundColor: '#80808024'
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
        marginBottom: '20px'
    },
    searchButton: {
        minWidth: '20px',
        height: '30px',
        padding: '0 8px',
        marginBottom: '20px'
    }
}))

export default function PlantSearch(props) {
    const classes = useStyles()
    const [values, setValues] = useState({
        category: '',
        search: '',
        results: [],
        searched: false
    })
    const handleChange = name => event => {
        setValues({
            ...values, [name]: event.target.value,
        })
    }
    const search = () => {
        if (values.search) {
            list({
                search: values.search || undefined, category: values.category
            }).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    setValues({ ...values, results: data, searched: true })
                }
            })
        }
    }
    const enterKey = (event) => {
        if (event.keyCode == 13) {
            event.preventDefault()
            search()
        }
    }
    return (
        <div>
            <Card className={classes.card}>
                <TextField
                    id="select-category"
                    select
                    label="Select category"
                    className={classes.textField}
                    value={values.category}
                    onChange={props.handleChange('category')}
                    SelectProps={{
                        MenuProps: {
                            className: classes.menu,
                        },
                    }}
                    margin="normal">
                    <MenuItem value="All">
                        All
            </MenuItem>
                    {props.categories.map(option => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    id="search"
                    label="Search products"
                    type="search"
                    onKeyDown={enterKey}
                    onChange={handleChange('search')}
                    className={classes.searchField}
                    margin="normal"
                />
                <Button variant="contained" color={'primary'} className={classes.searchButton} onClick={props.handleSearch}>
                    <SearchIcon />
                </Button>
                <Divider />
                <Products products={values.results} searched={values.searched} />
            </Card>
        </div>
    )
}
Search.propTypes = {
    categories: PropTypes.array.isRequired
}