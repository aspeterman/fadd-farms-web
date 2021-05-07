import { IconButton, makeStyles, Menu, MenuItem, Typography } from "@material-ui/core"
import { NotificationsActiveOutlined } from "@material-ui/icons"
import PopupState, { bindMenu, bindTrigger } from "material-ui-popup-state"
import moment from "moment"
import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import auth from "../auth/auth-helper"
import { listPlotByUser } from '../plots/api-plot'

const useStyles = makeStyles(theme => ({
    link: {
        color: '#3e4c54b3',
        fontSize: '0.9em'
    },
    menu: {
        paddingTop: theme.spacing(3)
    }
}))

export default function Reminders() {
    const classes = useStyles()
    const [plots, setPlots] = useState([])

    const jwt = auth.isAuthenticated()
    useEffect(() => {
        loadPlots(jwt.user._id)
    }, [])

    const loadPlots = (user) => {
        if (localStorage.getItem('tasks')) {
            const tasks = localStorage.getItem('tasks')
            setPlots(JSON.parse('tasks'))
        } else {
            listPlotByUser({
                userId: user
            }, {
                t: jwt.token
            }).then((data) => {
                if (data.error) {
                    console.log(data.error)
                } else {
                    isToday(data)

                }
            })
        }
    }

    const isToday = (array) => {
        let plotArray = []
        array.map((item) => {
            const today = new moment().format('YYYY-MM-DD').toString()
            const name = item.name
            const id = item._id
            const plant = item.plant
            const seeds = item.prePlantSeedsDate
            const germinated = item.prePlantGerminatedDate
            const transferred = item.seedsTransferredDate
            if (item.prePlantGerminatedDate === today) {
                plotArray.push({ done: false, plant: plant, task: 'Germinated', name: name, id: id, germinated })
            }
            if (item.prePlantSeedsDate === today) {
                plotArray.push({ done: false, plant: plant, task: 'Pre Planting', name: name, id: id, seeds })
            }
            if (item.seedsTransferredDate === today) {
                plotArray.push({ done: false, plant: plant, task: 'Transfer Seeds', name: name, id: id, transferred })
            }
            else {
                console.log('nothing today')
            }
            // localStorage.setItem('tasks', JSON.stringify(plotArray))
            if (plotArray.length > 0) setPlots(plotArray)
            else setPlots(undefined)
        })
    }

    const handleNavigate = (plot) => {

        const updatedPlots = [...plots]
        const index = updatedPlots.indexOf(plot)
        updatedPlots[index].done = true
        setPlots(updatedPlots)
    }

    if (!plots) return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <>
                    <IconButton {...bindTrigger(popupState)}>
                        <NotificationsActiveOutlined />
                    </IconButton>
                    <Menu {...bindMenu(popupState)}>
                        <MenuItem onClick={popupState.close}>
                            <Typography>No Events Today</Typography>
                        </MenuItem>
                    </Menu>
                </>
            )}
        </PopupState>
    )

    return (
        <PopupState variant="popover" popupId="demo-popup-menu">
            {(popupState) => (
                <>
                    <IconButton
                        {...bindTrigger(popupState)} >
                        <NotificationsActiveOutlined color='secondary' />
                    </IconButton>
                    <Menu
                        getContentAnchorEl={null}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        {...bindMenu(popupState)}>
                        {plots.map((item, key) => {
                            return (
                                <MenuItem onClick={popupState.close} key={key}>
                                    <Link className={classes.link} to={`/plants/${item.plant}/${item.id}`} onClick={() => handleNavigate(item)}>
                                        {item.name} - {item.task}
                                    </Link>
                                </MenuItem>
                            )
                        })}
                    </Menu>
                </>
            )}
        </PopupState>
    )
}

