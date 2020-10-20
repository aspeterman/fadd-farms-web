import { Card, CardContent, CircularProgress, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Grid, makeStyles, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { toUpper } from 'lodash';
// import Highcharts from 'highcharts';
import React, { useEffect, useState } from 'react';
import auth from '../auth/auth-helper';
import { getOne } from './api-plant';
import Comments from './Comments';
import EditPlant from './EditPlant';
import HarvestChart from './HarvestChart';
import Plots from './Plots';

// require('highcharts/highcharts-more')(Highcharts);
// const HarvestList = props => (
//     <div style={{ paddingBottom: '1em' }}>
//         <Card
//             variant='light'>
//             <CardContent>
//                 <Typography>{props.harvest.weight} lbs on {props.harvest.date}</Typography>
//                 <Typography>Harvester noted: {props.harvest.notes}</Typography>
//             </CardContent>
//         </Card>
//     </div>
// )
// const Exercise = props => (


//     <div style={{ paddingBottom: "5px" }}>
//         <Card
//             variant="light"
//         >
//             <CardHeader>Date: {props.exercise.date.slice(0, 10)}</CardHeader>
//             <CardContent>
//                 <Typography>Season: {props.exercise.season}</Typography>
//                 <Typography>Description: {props.exercise.description}</Typography>
//                 <Typography>Pre Plant Seeds: {props.exercise.prePlantSeeds} on {props.exercise.prePlantSeedsDate}</Typography>
//                 <Typography>Pre Plant Seeds Germinated: {props.exercise.prePlantGerminated} on {props.exercise.prePlantGerminatedDate}</Typography>
//                 <Typography>Seeds Transferred: {props.exercise.seedsTransferred} on {props.exercise.seedsTransferredDate}</Typography>
//                 <Typography> <span>Total Yield: {props.exercise.harvestYieldTally} lbs</span><br />
//                     <span><TallyModal id={props.exercise._id} /></span></Typography>
//             </CardContent>
//             <TableFooter><ButtonGroup><Button variant="danger" onClick={() => { props.deleteExercise(props.exercise._id) }}>Delete</Button><EditModal id={props.exercise._id} /></ButtonGroup></TableFooter>
//         </Card>
//     </div>
// )

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        marginTop: 60,
        margin: 30,
    },
    title: {
        textAlign: 'center',
        fontSize: '3em'
    },
    expansion: {
        paddingLeft: `${theme.spacing(2)}px 0px`,
        paddingRight: `${theme.spacing(2)}px 0px`,
        scrollPaddingTop: theme.spacing(3),
        backgroundColor: theme.palette.primary.primary
        ,
    },
    card: {
        minWidth: '96%',
        // margin: 'auto',
        minHeight: 300,
        maxHeight: 600,
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        backgroundColor: 'rgba(0, 0, 0, 0.06)'
    },
    cardContent: {
        backgroundColor: 'white',
        padding: `${theme.spacing(2)}px 0px`
    },
    cardHeader: {
        paddingTop: theme.spacing(1),
        paddingBottom: theme.spacing(1)
    },
    text: {
        margin: theme.spacing(2)
    },
    photo: {
        textAlign: 'center',
        backgroundColor: '#f2f5f4',
        padding: theme.spacing(1)
    },
    media: {
        height: 100
    },
    button: {
        margin: theme.spacing(1),
    }
}))

export default function PlantLog({ match }) {
    const classes = useStyles()
    const [values, setValues] = useState({
        plantId: '',
        plant: [],
        harvests: [],
        plots: [],
        comments: [],
        user: auth.isAuthenticated(),
        loading: true
    })

    const jwt = auth.isAuthenticated()

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        getOne({
            plantId: match.params.plantId
        }, { t: jwt.token }, signal).then((data) => {
            if (data & data.error) {
                setValues({ ...values, error: data.error })
            } else {
                setValues({ ...values, plantId: data._id, plant: data, harvests: data.harvests, plots: data.plots, comments: data.comments, loading: false })
            }
        })
        return function cleanup() {
            abortController.abort()
        }
    }, [match.params.plantId])

    const updatePlant = (plant) => {
        setValues({ ...values, plant: plant })
    }
    const updatePlots = (plots) => {
        setValues({ ...values, plots: plots })
    }

    const updateHarvests = (harvests) => {
        setValues({ ...values, harvests: harvests })
    }

    const updateComments = (comments) => {
        setValues({ ...values, comments: comments })
    }

    return (
        <div className={classes.root}>
            {values.loading ? <CircularProgress /> :
                <>
                    <Typography className={classes.title}>{toUpper(values.plant.plantname)}                                   <EditPlant plantId={values.plant._id} plant={values.plant} updatePlant={updatePlant} /></Typography>
                    <ExpansionPanel >
                        <ExpansionPanelSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                            className={classes.expansion}
                        >
                            <Typography className={classes.heading}>Show Details</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Card className={classes.card}
                            >
                                <CardContent>
                                    <Typography className={classes.text}><strong>Description: </strong>{values.plant.description}
                                    </Typography>
                                    <Typography className={classes.text}><strong>Common Pests Or Diseases: </strong>{values.plant.pests}
                                    </Typography>
                                    <Typography className={classes.text}><strong>Average Plant Height: </strong>{values.plant.plantHeight}
                                    </Typography>
                                    <Typography className={classes.text}><strong>Care During Growth: </strong>{values.plant.careDuringGrowth}
                                    </Typography>
                                    <Typography className={classes.text}><strong>When Should you Plant: </strong>{values.plant.whenToPlant}
                                    </Typography>
                                    <Typography className={classes.text}>
                                        <strong>Soil Requirements: </strong>{values.plant.soil}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </ExpansionPanelDetails>
                    </ExpansionPanel></>}
            <Grid container spacing={8}>
                <Grid item xs={8} sm={7}>
                    <Typography className={classes.text}>Plant Records</Typography>
                    {values.loading ? <CircularProgress /> :
                        <Plots plantId={values.plantId} plant={values.plant} plots={values.plots} updatePlots={updatePlots} harvests={values.harvests} updateHarvests={updateHarvests} />}
                </Grid>
                <Grid item xs={6} sm={5}>
                    <Typography className={classes.text}>General Comments</Typography>
                    {values.loading ? <CircularProgress /> :
                        <Comments plantId={values.plantId} comments={values.comments} updateComments={updateComments} />}
                </Grid>
                {values.loading ? <CircularProgress /> :
                    <HarvestChart harvests={values.harvests} />}
            </Grid>
        </div>

    )
}


// export default class PlantLog extends React.Component {
//   _isMounted = false
//   constructor(props) {
//     super(props)
//     this.state = {
//       _id: '',
//       defaultImage: '',
//       plantname: '',
//       description: '',
//       soil: '',
//       careDuringGrowth: '',
//       pests: '',
//       plantHeight: '',
//       whenToPlant: '',
//       spacing: 0,
//       harvestTotal: 0,
//       harvestFall: 0,
//       harvestSpring: 0,
//       totalSeeds: 0,
//       totalGerminated: 0,
//       exercises: [],
//       data: [],
//       harvests: [],
//       view: false,
//       first: 0,
//       last: 0
//     }
//     this.getSchedule = this.getSchedule.bind(this)
//     this.deletePlant = this.deletePlant.bind(this)
//     this.deleteExercise = this.deleteExercise.bind(this)
//     this.exerciseList = this.exerciseList.bind(this)
//     this.flatten = this.flatten.bind(this)
//     this.getHarvests = this.getHarvests.bind(this)
//     this.toggleView = this.toggleView.bind(this)
//   }
//   async componentDidMount() {

//     this.createTally()
//     this.createFall()
//     this.createSpring()
//     this.createSeeds()
//     this.createGerminated()
//     this.getData()
//   }

//   componentWillUnmount() {
//     this._isMounted = false;
//   }

//   createSeeds() {
//     let seedsTally = 0
//     this.state.prePlantSeeds ?
//       this.state.exercises.map(i => {
//         if (i.prePlantSeeds) {
//           seedsTally = seedsTally + Number(i.prePlantSeeds)
//         }
//         this.setState({ totalSeeds: seedsTally })
//         return seedsTally
//       })
//       : this.setState({ totalSeeds: 0 })
//   }

//   createGerminated() {
//     let germinated = 0
//     this.state.exercises.map(i => {
//       if (i.prePlantGerminated) {
//         germinated = germinated + Number(i.prePlantGerminated)
//       }
//       return germinated
//     })
//     this.setState({ totalGerminated: germinated })
//   }

//   createTally() {
//     let harvestTally = 0
//     this.state.exercises.map(i => {
//       if (i.harvestYield) {
//         harvestTally = harvestTally + Number(i.harvestYieldTally)
//       }
//       return harvestTally
//     })
//     this.setState({ harvestTotal: harvestTally })
//   }
//   createFall() {
//     let harvestTally = 0
//     this.state.exercises.map(i => {
//       if (i.harvestYield && i.season === 'Fall') {
//         harvestTally = harvestTally + Number(i.harvestYieldTally)
//       }
//       return harvestTally
//     })
//     this.setState({ harvestFall: harvestTally })
//   }
//   createSpring() {
//     let harvestTally = 0
//     this.state.exercises.map(i => {
//       if (i.harvestYield && i.season === 'Spring') {
//         harvestTally = harvestTally + Number(i.harvestYieldTally)
//       }
//       return harvestTally
//     })
//     this.setState({ harvestSpring: harvestTally })
//   }

//   exerciseList() {
//     return this.state.exercises.sort((a, b) => a.createdAt < b.createdAt ? 1 : -1).map(currentexercise => {
//       return <Exercise exercise={currentexercise} deleteExercise={this.deleteExercise} key={currentexercise._id}
//       />;
//     })
//   }


//   deletePlant(id) {
//     axios.delete(`/api/plants/${id}`)
//       .then(response => { console.log(response.data) });

//     this.setState({
//       plants: this.state.plants.filter(el => el._id !== id)
//     })
//   }
//   deleteExercise(id) {
//     axios.delete('/api/exercises/' + id)
//       .then(response => { console.log(response.data) });

//     this.setState({
//       exercises: this.state.exercises.filter(el => el._id !== id)
//     })
//   }
//   flatten(arr) {
//     const result = []

//     arr.forEach((i) => {
//       if (Array.isArray(i)) {
//         result.push(...this.flatten(i))
//       } else {
//         result.push(i)
//       }
//     })
//     return result.sort((a, b) => new moment(a.date).format('YYYYMMDD') > new moment(b.date).format('YYYYMMDD') ? 1 : -1)
//     // return result.sort((a, b) => new moment(a.date).format('YYYYMMDD') - new moment(b.date).format('YYYYMMDD'))
//   }

//   getHarvests() {
//     return this.state.harvests ?
//       this.flatten(this.state.harvests).map(currentHarvest => {
//         return <HarvestList harvest={currentHarvest} key={currentHarvest._id} />
//       }) :
//       <div>No harvests</div>
//   }

//   toggleView() {
//     this.setState({ view: !this.state.view })
//   }


//   getData() {
//     if (this.state.exercises !== undefined && this.state.exercises[0] !== undefined && this.state.harvests && this.state.exercises.harvestYieldDate !== undefined) {
//       console.log(this.state.harvests)
//       let flattened = this.flatten(this.state.harvests)
//       console.log(flattened)
//       console.log((moment(this.state.exercises[0].prePlantSeedsDate).format('M') / 12) * 10)
//       console.log(((moment(this.state.exercises[0].prePlantSeedsDate).format('M') / 12) * 10))
//       let first = `${parseInt((moment(this.state.exercises[0].prePlantSeedsDate).format('M') / 12) * 10)}.${parseInt((moment(this.state.exercises[0].prePlantSeedsDate).format('D') / 30) * 10)}`
//       let last = `${parseInt((moment(flattened[flattened.length - 1].date).format('M') / 12) * 10)}.${parseInt((moment(flattened[flattened.length - 1].date).format('D') / 30) * 10)}`
//       this.setState({
//         data: [first, last],
//         first: Number(first),
//         last: Number(last)
//       })
//     }
//   }

//   // getSchedule() {

//   //   { setTimeout(this.myFunc, 3000) }
//   // }

//   getSchedule() {
//     const chartOptions = {
//       chart: {
//         type: 'columnrange',
//         inverted: true
//       },

//       accessibility: {
//         description: ''
//       },

//       title: {
//         text: 'Time from planting to harvest'
//       },


//       xAxis: {
//         categories: []
//       },

//       yAxis: {
//         min: 0,
//         max: 11,
//         title: {
//           text: 'Time range from planting to harvest'
//         },
//         categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
//           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
//       },

//       tooltip: {
//         valueSuffix: ''
//       },

//       plotOptions: {
//         columnrange: {
//           dataLabels: {
//             enabled: false,
//           }
//         }
//       },

//       legend: {
//         enabled: false
//       },

//       series: [{
//         name: 'Dates',
//         data: [
//           [this.state.first, this.state.last]
//         ]
//       }],
//     }
//     return (
//       // this.state.first !== 0 && this.state.last !== 0 ?

//       <HighchartsReact
//         highcharts={Highcharts}
//         options={chartOptions}
//       />
//       // : <div></div>
//     )
//   }

//   render() {
//     return (
//       <div className="container-fluid">
//         <div style={{ padding: '1em' }}>
//           <h1 align='center'>{this.state.plantname}</h1>
//         </div>
//         <div className="row">
//           <div className="col-sm-6" height="35rem" >
//             <Card
//               style={{ paddingTop: '20px' }}
//               text="dark"
//             >
//               <Card.Title><h3 align="center">Plant Info</h3>
//               </Card.Title>
//               <Card.Body>
//                 <Typography><strong>Description: </strong>{this.state.description}
//                 </Typography>
//                 <Typography><strong>Common Pests Or Diseases: </strong>{this.state.pests}
//                 </Typography>
//                 <Typography><strong>Average Plant Height: </strong>{this.state.plantHeight}
//                 </Typography>
//                 <Typography><strong>Care During Growth: </strong>{this.state.careDuringGrowth}
//                 </Typography>
//                 <Typography><strong>When Should you Plant: </strong>{this.state.whenToPlant}
//                 </Typography>
//                 <Typography>
//                   <strong>Soil Requirements: </strong>{this.state.soil}
//                 </Typography>
//                 <EditPlantModal id={this.state._id} />
//               </Card.Body>
//             </Card>
//             <Card>
//               <Card.Title><h3 align="center">Plant Statistics</h3></Card.Title>
//               <Card.Body>
//                 <Typography><strong>Total number of seeds this year: </strong>{this.state.totalSeeds}</Typography>
//                 <Typography><strong>Total number of germinated seeds: </strong>{this.state.totalGerminated}</Typography>
//                 <Typography><strong>Total harvest yield this year: </strong>{this.state.harvestTotal} lbs </Typography>
//                 <Typography><strong>Total harvest yield this Fall: </strong>{this.state.harvestFall} lbs </Typography>
//                 <Typography><strong>Total harvest yield this Spring: </strong>{this.state.harvestSpring} lbs </Typography>
//               </Card.Body>
//             </Card>

//           </div>

//           <div className="col-sm-6" id="plant-activity-log" style={{ border: "1px solid black", height: '35em', overflowY: 'scroll' }}>
//             <div style={{ padding: '1em' }}>
//               <h3 align="center" >Activity Log</h3>
//             </div>
//             <div id="large-2" text-align="center" style={{ paddingBottom: '1em' }}>
//               <CreateModal plantname={this.state.plantname} />
//               <Button style={{ float: 'right' }} onClick={this.toggleView}>{this.state.view ? <>Activity Log</> : <>Harvest Log</>}</Button>
//             </div>
//             {this.state.view ?
//               this.getHarvests() :
//               this.exerciseList()
//             }
//           </div>
//           <div className="col-sm-6" >
//             <h4 style={{ color: 'springgreen', align: 'center' }}>Harvest Yield By Date</h4>
//             <HarvestCalendar harvests={this.state.harvests} /></div>
//           <div className="col-sm-6" text-align="center">
//             {/* <h4>Seasonal Planting TImeline</h4> */}
//             {/* <Schedule data={this.state.data} /> */}
//             <div>{this.state.first}, {this.state.last}</div>
//             {this.getSchedule()}
//           </div>
//         </div>
//       </div >
//     )
//   }
// }