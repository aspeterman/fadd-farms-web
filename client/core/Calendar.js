// import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
// import { AppointmentForm, Appointments, AppointmentTooltip, DateNavigator, DayView, MonthView, Scheduler, TodayButton, Toolbar, ViewSwitcher, WeekView } from '@devexpress/dx-react-scheduler-material-ui';
// import { CircularProgress } from '@material-ui/core';
// import Paper from '@material-ui/core/Paper';
// import React, { useEffect, useState } from 'react';
// import auth from '../auth/auth-helper';
// import { listPlotByUser } from '../plots/api-plot';

// const schedulerData = [
//     { startDate: '2018-11-01T09:45', endDate: '2018-11-01T11:00', title: 'Meeting' },
//     { startDate: '2018-11-01T12:00', endDate: '2018-11-01T13:30', title: 'Go to a gym' },
// ];

// const jwt = auth.isAuthenticated()
// export default function Calendar() {
//     const [state, setState] = useState([])
//     const [loading, setLoading] = useState(true)
//     const [values, setValues] = useState({
//         addedAppointment: '',
//         appointmentChanges: '',
//         editingAppointment: ''
//     })

//     useEffect(() => {
//         loadPlots(jwt.user._id)

//     }, [])

//     const loadPlots = (user) => {
//         if (localStorage.getItem('tasks')) {
//             const tasks = localStorage.getItem('tasks')
//             setPlots(JSON.parse('tasks'))
//         } else {
//             listPlotByUser({
//                 userId: user
//             }, {
//                 t: jwt.token
//             }).then((data) => {
//                 if (data.error) {
//                     console.log(data.error)
//                 } else {
//                     console.log(data)
//                     let plotData = []
//                     data.map((plot) => {
//                         if (plot.prePlantGerminatedDate) {
//                             let germinated = { title: plot.plant.plantname + ' Germination', startDate: Date(plot.prePlantGerminatedDate), endDate: Date(plot.prePlantGerminatedDate) }
//                             plotData.push(germinated)
//                         }
//                         if (plot.prePlantSeedsDate) {
//                             let prePlant = { title: plot.plant.plantname + ' Pre-Planting', startDate: Date(plot.prePlantSeedsDate), endDate: Date(plot.prePlantSeedsDate) }
//                             plotData.push(prePlant)
//                         }
//                         if (plot.prePlantGerminatedDate) {
//                             let transfer = { title: plot.plant.plantname + ' Transplant', startDate: Date(plot.seedsTransferredDate), endDate: Date(plot.seedsTransferredDate) }
//                             plotData.push(transfer)
//                         }
//                     })
//                     console.log(plotData)
//                     setState(plotData)
//                     setLoading(false)
//                 }
//             })
//         }
//     }

//     const changeAddedAppointment = (addedAppointment) => {
//         console.log(addedAppointment)
//         setValues({ ...values, addedAppointment: addedAppointment });
//     }

//     const changeAppointmentChanges = (appointmentChanges) => {
//         console.log(appointmentChanges)
//         setValues({ ...values, appointmentChanges: appointmentChanges });
//     }

//     const changeEditingAppointment = (editingAppointment) => {
//         console.log(editingAppointment)
//         setValues({ ...values, editingAppointment: editingAppointment });
//     }
//     const commitChanges = ({ added, changed, deleted }) => {
//         let { data } = state;
//         if (added) {
//             const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
//             data = [...data, { id: startingAddedId, ...added }];
//         }
//         if (changed) {
//             data = data.map(appointment => (
//                 changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
//         }
//         if (deleted !== undefined) {
//             data = data.filter(appointment => appointment.id !== deleted);
//         }
//         setState(data)
//         return { data };
//     }
//     if (loading) return <CircularProgress />
//     else {
//         return (
//             <Paper>
//                 <Scheduler
//                     data={state}
//                 >
//                     <ViewState
//                         currentDate={Date()}
//                     />
//                     <EditingState
//                         onCommitChanges={commitChanges}

//                         addedAppointment={values.addedAppointment}
//                         onAddedAppointmentChange={changeAddedAppointment}

//                         appointmentChanges={values.appointmentChanges}
//                         onAppointmentChangesChange={changeAppointmentChanges}

//                         editingAppointment={values.editingAppointment}
//                         onEditingAppointmentChange={changeEditingAppointment}
//                     />
//                     <IntegratedEditing />
//                     <DayView
//                         startDayHour={0}
//                         endDayHour={24}
//                     />
//                     <WeekView
//                         startDayHour={0}
//                         endDayHour={24} />
//                     <MonthView />
//                     <Toolbar />
//                     <DateNavigator />
//                     <TodayButton />
//                     <ViewSwitcher />
//                     <Appointments />
//                     <AppointmentTooltip
//                         showCloseButton
//                         showOpenButton
//                     />
//                     <AppointmentForm
//                         onAppointmentDataChange={commitChanges}

//                     />
//                 </Scheduler>
//             </Paper>
//         )
//     }
// }
