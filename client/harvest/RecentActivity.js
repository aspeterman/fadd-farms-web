import { Card, Divider, IconButton, makeStyles, Typography } from '@material-ui/core'
import { ExpandMore } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import { listLatest } from './api-harvest'
import RecentList from './RecentList'

const useStyles = makeStyles(theme => ({
    card: {
        margin: 'auto',
        paddingTop: 0,
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        fontSize: '1em'
    },
    media: {
        minHeight: 330
    },
    expand: {
        margin: 'auto',
        paddingBottom: 0,
        '&:hover': { background: '#dbdbdb', },
    }
}))

const RecentActivity = () => {
    const classes = useStyles()
    const [harvests, setHarvests] = useState([])
    const [showing, setShowing] = useState(5)
    const [loading, setLoading] = useState(true)

    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listLatest({
            t: jwt.token
        }, signal).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setHarvests(data)
                setLoading(false)
            }
        })
        return function cleanup() {
            abortController.abort()
        }

    }, [])
    const removeHarvest = (harvest) => {
        const updatedHarvests = [...harvests]
        const index = updatedHarvests.indexOf(harvest)
        updatedHarvests.splice(index, 1)
        setHarvests(updatedHarvests)
    }
    const showMore = () => {
        setShowing(showing + 5)
    }

    return (
        <Card className={classes.card}>
            <Typography type="title" className={classes.title}>
                Recent Activity
          </Typography>
            <Divider />
            <RecentList removeUpdate={removeHarvest} harvests={harvests.slice(0, showing)} loading={loading} />
            <Divider />
            <div className={classes.expand} align="center" onClick={showMore} >
                <IconButton color="secondary" size="small" onClick={showMore}><ExpandMore size="small" disabled={harvests.slice(0, showing).length = harvests.length} /></IconButton>
            </div>
        </Card>

    )
}

export default RecentActivity