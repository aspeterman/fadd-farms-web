import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import Icon from '@material-ui/core/Icon'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import FileUpload from '@material-ui/icons/AddPhotoAlternate'
import React from 'react'

const useStyles = makeStyles(theme => ({
    root: {
        // backgroundColor: '#efefef',
        // padding: `${theme.spacing(3)}px 0px 1px`
    },
    card: {
        maxWidth: 600,
        margin: 'auto',
        marginBottom: theme.spacing(3),
        backgroundColor: 'rgba(65, 150, 136, 0.09)',
        boxShadow: 'none'
    },
    cardContent: {
        backgroundColor: 'white',
        paddingTop: 0,
        paddingBottom: 0
    },
    cardHeader: {
        paddingTop: 8,
        paddingBottom: 8
    },
    photoButton: {
        height: 30,
        marginBottom: 5
    },
    input: {
        display: 'none',
    },
    textField: {
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        width: '90%'
    },
    submit: {
        margin: theme.spacing(2)
    },
    filename: {
        verticalAlign: 'super'
    },
    button: {
        marginBottom: theme.spacing(2)
    }
}))

export default function NewGarden(props) {
    const classes = useStyles()
    // const [values, setValues] = useState({
    //     season: '',
    //     image: ''
    // })
    // const [open, setOpen] = useState(false)


    // const jwt = auth.isAuthenticated()
    // const clickSubmit = () => {

    //     let gardenData = new FormData()
    //     props.gardenScheme && gardenData.append('gardenScheme', props.gardenScheme)
    //     values.season && gardenData.append('season', values.season)
    //     values.season && gardenData.append('season', values.season)
    //     values.image && gardenData.append('image', values.image)
    //     console.log(gardenData)
    //     create({
    //         userId: jwt.user._id
    //     }, {
    //         t: jwt.token
    //     }, gardenData).then((data) => {
    //         if (data.error) {
    //             setValues({ ...values, error: data.error })
    //         } else {
    //             setOpen(false)
    //         }
    //     })
    // }

    // const handleChange = name => event => {
    //     const value = name === 'image'
    //         ? event.target.files[1]
    //         : event.target.value
    //     setValues({ ...values, [name]: value })
    // }

    // const handleClickOpen = () => {
    //     setOpen(true)
    //     setValues({ ...values, gardenScheme: props.gardenScheme })
    // }
    // const handleClose = () => {
    //     setOpen(false)
    // }

    return (<>
        <Button variant="outlined" color="primary" className={classes.button} onClick={props.handleClickOpen}>
            Save Layout
      </Button>
        <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Save</DialogTitle>
            <DialogContent>
                <div className={classes.textField}>
                    <InputLabel id="season-select">Season</InputLabel>
                    <Select labelId="season-select" name='season' onChange={props.handleChange('season')} >
                        <MenuItem value={'Fall'}>Fall</MenuItem>
                        <MenuItem value={'Spring'}>Spring</MenuItem>
                    </Select>
                </div>
                <div className={classes.textField}>
                    <TextField
                        placeholder="Year"
                        type="number"
                        name='year'
                        // value={props.values.year}
                        onChange={props.handleChange('year')}
                        // className={classes.textField}
                        margin="normal"
                    />
                </div>
                <input accept="image/*" onChange={props.handleChange('image')} className={classes.input} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <Button variant="contained" color="secondary" component="span">
                        Upload Photo
              <FileUpload />
                    </Button>
                </label> <span className={classes.filename}>{props.values.image ? props.values.image.name : ''}</span><br />
                {props.values.error && (<Typography component="p" color="error">
                    <Icon color="error" className={classes.error}>error</Icon>
                    {props.values.error}
                </Typography>)
                }
            </DialogContent>
            <DialogActions>
                <Button color="primary" variant="contained" onClick={props.clickUpdate} className={classes.submit}>Submit</Button>
            </DialogActions>
        </Dialog>
    </>
    )
}