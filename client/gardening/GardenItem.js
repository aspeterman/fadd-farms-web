import { Divider, IconButton, makeStyles, Typography } from "@material-ui/core";
import { ArrowLeft, ArrowRight, Info } from "@material-ui/icons";
import React from "react";
import { useHistory } from "react-router";
import CommentDrawer from "./GardenCommentDrawer";

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexGrow: 1,
    margin: 40,
    justifyContent: "space-around",
  },
  title: {
    margin: theme.spacing(2),
    color: theme.palette.protectedTitle,
    fontSize: '2em'
  },
  gardenGrid: {
    width: '200px',
    border: '1px solid grey',
    borderRadius: '25%',
    marginBottom: '2 px',
    padding: theme.spacing(3),
    overflow: 'hidden'
  },
  item: {
    display: 'flex',
    justifyContent: "space-around",
    margin: `${theme.spacing(1)}px `,
    border: '2px solid black',
    borderRadius: '5%',
    overflowX: 'hidden',
    backgroundColor: '#6CE666',
    '&:hover': {
      overflowX: 'visible'
    }
  },
  text: {
    marginLeft: `${theme.spacing(3)}px`,
    paddingRight: 20,
    display: "flex",
    maxWidth: 20,
    overflowX: 'clip',
  },
  button: {
    height: '30px',
    marginBottom: '20px'
  },
}))


export default function CurrentGarden(props) {
  const classes = useStyles()
  const history = useHistory()
  const handleGoForward = (id) => {
    const url = `/plants/${id}`
    history.push(url, { from: "GardenHome" })
  }




  if (props.values.loading) return <></>
  return (
    <>
      {props.currentGarden.rows &&
        <div style={{ textAlign: 'center' }}>
          <Typography type="headline" component="h2" className={classes.title}>
            {props.currentGarden.gardenName}</Typography>
          <CommentDrawer gardenId={props.currentGarden._id} comments={props.comments} updateComments={props.updateComments} />
          <IconButton disabled={props.values.currentPage === 1} onClick={props.pageDown}><ArrowLeft /></IconButton>
          {props.values.currentPage}
          <IconButton disabled={props.values.offset + 5 >= props.currentGarden.rows.length} onClick={props.pageUp}><ArrowRight /></IconButton>
        </div>
      }
      <div className={classes.root}>
        {props.currentGarden.rows && props.currentGarden.rows.slice(props.values.offset, props.values.offset + props.values.limit).map((el, ind) => (
          <div key={ind} >
            <Typography className={classes.text}>
              Row: {ind + 1}
            </Typography>
            {
              el.map((item, index) => (
                <div
                  key={item._id}
                  index={index}
                  className={classes.item}
                >
                  <div className={classes.cardContent}>
                    <Typography className={classes.text} style={{ fontSize: 20 }}>
                      {item.plantname}
                    </Typography>
                    <IconButton color='secondary' onClick={() => handleGoForward(item._id)}><Info /></IconButton>
                  </div>
                  <div
                    className={classes.root}                  >
                    <div className={classes.cardContent}>
                      {item.active ? <Typography className={classes.text} style={{ color: '#F1FCA1' }}>Active</Typography> : <Typography className={classes.text} style={{ color: 'red' }}>Inactive</Typography>}</div>
                    <Divider />
                  </div>
                </div>
              ))
            }
          </div>
        ))
        }
      </div>
    </ >
  )
}
