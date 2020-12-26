import { Button, Dialog, DialogContent, DialogTitle, makeStyles } from '@material-ui/core';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles({
    media: {
        height: 300,
        // display: 'inline-block',
        // width: 200,
        // marginLeft: '24px'
    },
    gallery: {
        display: 'flex'
    },
    images: {
        marginLeft: '3px',
        flexGrow: 'row'
    }
})

export default function HarvestGallery(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>Gallery</Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Harvest Photos</DialogTitle>
                <DialogContent>
                    <div className={classes.gallery}>
                        {props.harvests.map(harvest => {
                            return (
                                <span className={classes.images} key={harvest._id}>
                                    <img className={classes.media} src={'/api/harvest/image/' + harvest._id + "?" + new Date().getTime()} />
                                    {harvest.date.slice(0, 10)}
                                </span>
                            )
                        })}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

HarvestGallery.propTypes = {
    harvests: PropTypes.array.isRequired,
}