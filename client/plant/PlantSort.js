import { IconButton, makeStyles, MenuItem, TextField } from '@material-ui/core'
import { SortOutlined } from '@material-ui/icons'
import React from 'react'
import StyledMenu from '../utils/StyledMenu'

const useStyles = makeStyles(theme => ({

    iconButton: {
        padding: 10,
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
    }
}))

export default function PlantSort(props) {
    const classes = useStyles()
    return (
        <>
            <IconButton className={classes.iconButton} aria-controls="simple-menu" aria-haspopup="true" onClick={props.handleClickOpen} >
                <SortOutlined />
            </IconButton>
            <StyledMenu
                id="simple-menu"
                anchorEl={props.anchorEl}
                keepMounted
                open={Boolean(props.anchorEl)}
                onClose={props.handleClose}
            >
                <MenuItem>
                    <TextField
                        id="select-active"
                        select
                        label="Filter"
                        className={classes.textField}
                        value={props.values.filtered}
                        onChange={props.handleFilter}
                        SelectProps={{
                            MenuProps: {
                                className: classes.menu,
                            },
                        }}
                        margin="normal">
                        <MenuItem value="All" onClick={props.handleClose}>All</MenuItem>
                        <MenuItem value='Active' onClick={props.handleClose}>
                            Active
        </MenuItem>
                        <MenuItem value='Inactive' onClick={props.handleClose}>
                            Inactive
        </MenuItem>
                    </TextField>
                </MenuItem>
            </StyledMenu>
        </>
    )
}