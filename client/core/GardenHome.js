import { Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'
import auth from '../auth/auth-helper'
import GardenFeed from '../gardening/GardenFeed'
import useIsSsr from '../utils/useIsSsr'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 30,
    },
    Grid: {
        display: 'flex',
        alignItems: 'center',
        alignContent: 'center',
        paddingLeft: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        paddingRight: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        justifyContent: 'center'
    },
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    title: {
        padding: `${theme.spacing(3)}px ${theme.spacing(2.5)}px ${theme.spacing(2)}px`,
        color: theme.palette.text.secondary
    },
    media: {
        minHeight: 400
    },
    credit: {
        padding: 10,
        textAlign: 'right',
        backgroundColor: '#ededed',
        borderBottom: '1px solid #d0d0d0',
        '& a': {
            color: '#3f4771'
        }
    }
}))

export default function GardenHome({ history }) {
    const classes = useStyles()
    const [defaultPage, setDefaultPage] = useState(false)

    useEffect(() => {
        setDefaultPage(auth.isAuthenticated())
        const unlisten = history.listen(() => {
            setDefaultPage(auth.isAuthenticated())
        })
        return () => {
            unlisten()
        }
    }, [])

    const isSsr = useIsSsr()

    const screenWidth = isSsr ? null : window.innerWidth;

    return (
        screenWidth &&
        <div className={classes.root}>
            {defaultPage &&
                <Grid>
                    <GardenFeed />
                </Grid>
            }

        </div>
    )
}
