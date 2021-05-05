// import { CircularProgress } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core/styles';
// import { indexOf } from 'lodash';
// import React, { useEffect, useState } from 'react';
// import ReactGridLayout from 'react-grid-layout';
// import auth from '../auth/auth-helper';
// import { getOne } from './api-gardens';


// const useStyles = makeStyles(theme => ({
//     root: {

//         backgroundColor: '#efefef',
//         padding: `${theme.spacing(3)}px 0px 1px`
//     },
//     card: {
//         maxWidth: 600,
//         margin: 'auto',
//         marginBottom: theme.spacing(3),
//         backgroundColor: 'rgba(65, 150, 136, 0.09)',
//         boxShadow: 'none'
//     },
//     cardContent: {
//         backgroundColor: 'white',
//         paddingTop: 0,
//         paddingBottom: 0
//     },
//     cardHeader: {
//         paddingTop: 8,
//         paddingBottom: 8
//     },
//     photoButton: {
//         height: 30,
//         marginBottom: 5
//     },
//     input: {
//         display: 'none',
//     },
//     textField: {
//         marginLeft: theme.spacing(2),
//         marginRight: theme.spacing(2),
//         width: '90%'
//     },
//     submit: {
//         margin: theme.spacing(2)
//     },
//     filename: {
//         verticalAlign: 'super'
//     },
//     gridWrapper: {
//         display: 'flex',
//         flexWrap: 'wrap',
//         border: '1px solid black'
//     },
//     gardenGrid: {

//         // width: '200px',
//         margin: 'auto',
//         marginBottom: theme.spacing(3),
//         backgroundColor: 'rgba(65, 150, 136, 0.09)',
//         boxShadow: 'none',
//         border: '1px solid grey',
//         // borderRadius: '25%',
//         // backgroundColor: 'green',
//         padding: theme.spacing(3),
//         overflowY: 'scroll',
//         height: 500,
//         // flexWrap: 'wrap'
//         '&::-webkit-scrollbar': {
//             width: '0.4em',
//         },
//         '&::-webkit-scrollbar-track': {
//             // '-webkit-box-shadow': 'inset 0 0 6px #aaaaaa'
//             background: '#ffffff',
//             borderRadius: '10px',
//             boxShadow: 'inset 7px 10px 12px #f0f0f0'
//         },
//         '&::-webkit-scrollbar-thumb': {
//             // backgroundColor: 'rgba(0,0,0,.1)',
//             // outline: '1px solid slategrey'
//             background: 'linear-gradient(13deg, #D4FFEC 14%,#c7ceff 64%)',
//             borderRadius: '10px'
//         },
//         '&::-webkit-scrollbar-thumb:hover': {
//             background: `linear-gradient(13deg, #c7ceff 14%,#f9d4ff 64%)`
//         },
//     },
// }))

// const ResponsiveGridLayout = ReactGridLayout.WidthProvider(ReactGridLayout.Responsive);


// const initTiles = JSON.parse('[{"w":1,"h":1,"x":0,"y":0,"i":"a","moved":false,"static":false},{"w":1,"h":1,"x":0,"y":1,"i":"b","moved":false,"static":false},{"w":1,"h":1,"x":2,"y":0,"i":"c","moved":false,"static":false}]');

// // This one has an implicit return
// const TestComponent = ({ match }, props) => {
//     const [tiles, setTiles] = useState(initTiles);
//     const [columns, setColumns] = useState(3)
//     const classes = useStyles()
//     const [state, setState] = useState({
//         items: [0, 1, 2, 3, 4].map(function (i, key, list) {
//             return {
//                 i: i.toString(),
//                 x: i * 2,
//                 y: 1,
//                 w: 1,
//                 h: 1,
//                 add: i === (list.length - 1)
//             };
//         }),
//         newCounter: 0
//     })
//     const reset = () => {
//         setTiles(initTiles)
//         setColumns(1)
//     }

//     const onAddItem = () => {
//         /*eslint no-console: 0*/
//         console.log("adding", "n" + state.newCounter);
//         setState({
//             items: state.items.concat({
//                 i: "n" + state.newCounter,
//                 x: (state.items.length * 2) % (state.cols || 12),
//                 y: Infinity,
//                 w: 1,
//                 h: 1
//             }),
//             // Increment the counter to ensure key is always unique.
//             newCounter: state.newCounter + 1
//         });
//         console.log(state.items)
//         console.log(match)
//     }

//     const removeGarden = (post) => {
//         const updatedItems = [...gardens]
//         const index = updatedItems.indexOf(post)
//         updatedItems.splice(index, 1)
//         setTiles(updatedItems)
//     }

//     // We're using the cols coming back from this to calculate where to add new items.
//     const onBreakpointChange = (breakpoint, cols) => {
//         setState({
//             breakpoint: breakpoint,
//             cols: cols
//         });
//     }

//     const onDrop = (layout, layoutItem, _event) => {
//         layoutItem.i = "n" + state.newCounter,
//             alert(`Dropped element props:\n${JSON.stringify(layoutItem, ['x', 'y', 'w', 'h'], 2)}`);
//         setState({
//             items: state.items.concat(layoutItem),
//             newCounter: state.newCounter + 1
//         });
//         console.log(layoutItem)
//     };

//     return (
//         <div className={classes.gardenGrid}>
//             <input type="number" step="1" min="3" max="12" value={columns}
//                 onChange={evt => setColumns(Number(evt.target.value))} />
//             <button onClick={onAddItem}>Add Item</button>
//             <button onClick={reset}>Reset</button>
//             <div
//                 className="droppable-element"
//                 draggable={true}
//                 unselectable="on"
//                 onDragStart={e => e.dataTransfer.setData("text/plain", "")}
//             >
//                 Droppable Element (Drag me!)
//         </div>
//             <ResponsiveGridLayout
//                 isDraggable
//                 isDroppable
//                 isBounded
//                 breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
//                 cols={{ lg: columns, md: columns, sm: columns, xs: columns, xxs: columns }}
//                 onLayoutChange={(tiles, layouts) => {
//                     setTiles(tiles)
//                     console.log(tiles)
//                 }}
//                 rowHeight={150}
//                 onDrop={onDrop}
//             >

//                 {state.items ? state.items.map(tile => (
//                     <div className={classes.gridWrapper} key={tile.i} data-grid={tile}>
//                     </div>

//                 )) : <CircularProgress />}

//             </ResponsiveGridLayout>
//         </div>
//     );

// };

// export default function EditGaRden({ match }) {
//     const classes = useStyles()
//     const [currentGarden, setCurrentGarden] = useState({})

//     useEffect(() => {
//         const abortController = new AbortController()
//         const signal = abortController.signal
//         const jwt = auth.isAuthenticated()
//         getOne({
//             gardenId: match.params.gardenId
//         }, { t: jwt.token }, signal).then((data) => {
//             if (data & data.error) {
//                 setValues({ ...values, error: data.error })
//             } else {
//                 let parsed = JSON.parse(data.rows)
//                 data.rows = parsed
//                 const items = data.rows.map(function (i, key, list) {
//                     console.log(list)
//                     return {
//                         i: i[0].plantname,
//                         x: indexOf(i) * 2,
//                         y: 1,
//                         w: 1,
//                         h: 1,
//                         add: i === (list.length - 1)
//                     };
//                 })
//                 setCurrentGarden(items)
//                 console.log(items)
//             }
//         })
//     }, [])
//     return (
//         <div className={classes.root}>
//             <TestComponent
//                 currentGarden={currentGarden}
//             />
//         </div>
//     );
// }


