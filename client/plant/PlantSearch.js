import { IconButton, InputAdornment, TextField } from '@material-ui/core'
import { Cancel, Search } from '@material-ui/icons'
import React, { useState } from 'react'

export default function PlantSearch(props) {
    const [searchedPlants, setsearchedPlants] = useState([])
    const [query, setQuery] = useState('')

    const handleChange = (e) => {
        setQuery(e.target.value)
        console.log(query)
    }

    const handleCancel = () => {
        setsearchedPlants([])
        setQuery('')
    }

    const handleSearch = () => {
        let newArray = []
        props.plants.filter((item) => {
            if (item.plantname.toLowerCase().includes(query.toLocaleLowerCase())) {
                newArray.push(item)
            }
            setsearchedPlants(newArray)
            console.log(searchedPlants)
        })
    }

    return (
        <>
            <TextField
                value={query}
                onChange={handleChange}
                id="input-with-icon-textfield"
                placeholder="Search By Plant"
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton hidden={!query} onClick={handleCancel}>{query && <Cancel />}</IconButton>
                            <IconButton onClick={handleSearch}><Search /></IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </>
    )
}