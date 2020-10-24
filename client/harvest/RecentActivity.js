import { Card, Divider, makeStyles, Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import { listHarvestFeed } from './api-harvest'
import RecentList from './RecentList'

const useStyles = makeStyles(theme => ({
    card: {
        margin: 'auto',
        paddingTop: 0,
        paddingBottom: theme.spacing(3)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.openTitle,
        fontSize: '1em'
    },
    media: {
        minHeight: 330
    }
}))

const RecentActivity = (props) => {
    const classes = useStyles()
    const [harvests, setHarvests] = useState([])

    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        listHarvestFeed({
            // userId: jwt.user._id
        }, {
            t: jwt.token
        }, signal).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                setHarvests(data)
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
    return (
        <Card className={classes.card}>
            <Typography type="title" className={classes.title}>
                Recent Activity
          </Typography>
            <Divider />
            <RecentList removeUpdate={removeHarvest} harvests={harvests} />
        </Card>

    )
}

export default RecentActivity