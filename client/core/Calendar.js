import { EditingState, IntegratedEditing, ViewState } from '@devexpress/dx-react-scheduler';
import { AppointmentForm, Appointments, AppointmentTooltip, ConfirmationDialog, DateNavigator, DayView, MonthView, Resources, Scheduler, TodayButton, Toolbar, ViewSwitcher, WeekView } from '@devexpress/dx-react-scheduler-material-ui';
import { CircularProgress, makeStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import auth from '../auth/auth-helper';
import { listPlotByUser } from '../plots/api-plot';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        margin: 30,
    },
}))

const jwt = auth.isAuthenticated()
export default function Calendar() {
    const classes = useStyles()
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(true)
    const [resources, setResources] = useState([])
    const [values, setValues] = useState({
        addedAppointment: '',
        appointmentChanges: '',
        editingAppointment: ''
    })
    const [currentDate, setDate] = useState(Date())

    useEffect(() => {
        loadPlots(jwt.user._id)

    }, [])

    const loadPlots = (user) => {
        let plotData = []
        listPlotByUser({
            userId: user
        }, {
            t: jwt.token
        }).then((data) => {
            if (data.error) {
                console.log(data.error)
            } else {
                let plotNames = []
                let plantNames = []
                data.map((plot) => {
                    const startingAddedId = plotData.length > 0 ? plotData[plotData.length - 1].id + 1 : 0;
                    plotNames.push({ text: plot.name, id: startingAddedId })
                    plantNames.push({ text: plot.plant.plantname, id: startingAddedId })
                    if (plot.prePlantGerminatedDate) {
                        let day = plot.prePlantGerminatedDate
                        let parsed = moment(day, "YYYY/MM/DD").utc().format('lll');
                        let germinated = { title: plot.plant.plantname + ' Germination', startDate: parsed, endDate: parsed, location: plot.name, notes: '(remember to document this event in the plant information page)' }
                        plotData.push(germinated)
                    }
                    if (plot.prePlantSeedsDate) {
                        let day = plot.prePlantSeedsDate
                        let parsed = moment(day, "YYYY/MM/DD").utc().format('lll');
                        let prePlant = { id: startingAddedId, title: plot.plant.plantname + ' Pre-Planting', startDate: parsed, endDate: parsed, notes: '(remember to document this event in the plant information page)' }
                        plotData.push(prePlant)
                    }
                    if (plot.seedsTransferredDate) {
                        let day = plot.seedsTransferredDate
                        let parsed = moment(day, "YYYY/MM/DD").utc().format('lll');
                        let transfer = { id: startingAddedId, title: plot.plant.plantname + ' Transplant', startDate: parsed, endDate: parsed, notes: '(remember to document this event in the plant information page)', plant: plot.plant.plantname }
                        plotData.push(transfer)
                    }
                })
                setState(plotData)
                setLoading(false)
                setResources(
                    [{
                        fieldName: 'plant',
                        title: 'Plant',
                        instances: [...new Set(plantNames)],
                    }]
                )
            }
        })

    }
    const currentDateChange = (currentDate) => { setDate(currentDate); };

    const changeAddedAppointment = (addedAppointment) => {
        setValues({ ...values, addedAppointment: addedAppointment });
    }

    const changeAppointmentChanges = (appointmentChanges) => {
        setValues({ ...values, appointmentChanges: appointmentChanges });
    }

    const changeEditingAppointment = (editingAppointment) => {
        setValues({ ...values, editingAppointment: editingAppointment });
    }
    const commitChanges = ({ added, changed, deleted }) => {
        let data = [...state];
        if (added) {
            const startingAddedId = data.length > 0 ? data[data.length - 1].id + 1 : 0;
            console.log(added)
            data = [...data, { id: startingAddedId, ...added }];
            setState(data)

        }
        if (changed) {
            data = data.map(appointment => (
                changed[appointment.id] ? { ...appointment, ...changed[appointment.id] } : appointment));
            setState(data)

        }
        if (deleted !== undefined) {
            data = data.filter(appointment => appointment.id !== deleted);
            setState(data)

        }
        return { data };
        // let data = [...state]
        // if (added) {
        //     added.id = 1
        //     data.push(added)
        //     console.log(data)
        // }
        // if (changed) {
        //     changed = changed
        //     console.log(changed.id)

        // }
        // setState(data)

    }
    if (loading) return <CircularProgress />
    else {
        return (
            <Paper className={classes.root}>
                <Scheduler
                    data={state}
                >
                    <ViewState
                        currentDate={currentDate}
                        onCurrentDateChange={currentDateChange}

                    />
                    <EditingState
                        onCommitChanges={commitChanges}

                        addedAppointment={values.addedAppointment}
                        onAddedAppointmentChange={changeAddedAppointment}

                        appointmentChanges={values.appointmentChanges}
                        onAppointmentChangesChange={changeAppointmentChanges}

                        editingAppointment={values.editingAppointment}
                        onEditingAppointmentChange={changeEditingAppointment}
                    />
                    <IntegratedEditing />
                    <ConfirmationDialog
                    />
                    <DayView
                        startDayHour={6}
                        endDayHour={12}
                    />
                    <WeekView
                        startDayHour={6}
                        endDayHour={12} />
                    <MonthView />
                    <Toolbar />
                    <DateNavigator />
                    <TodayButton

                    />
                    <ViewSwitcher />
                    <Appointments />
                    <AppointmentTooltip
                        showCloseButton
                        showOpenButton
                    />
                    <AppointmentForm
                        onAppointmentDataChange={commitChanges}
                    />
                    <Resources
                        data={resources}
                        mainResourceName="plantname"
                    />
                </Scheduler>
            </Paper>
        )
    }
}
