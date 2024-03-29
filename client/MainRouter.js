import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Signin from './auth/Signin'
import EventCalendar from './core/Calendar'
import GardenHome from './core/GardenHome'
import Home from './core/Home'
import MenuBar from './core/Menu'
import NotFound from './core/NotFound'
import RecentHome from './core/RecentHome'
import EditHarvest from './harvest/EditHarvest'
import NewHarvest from './harvest/NewHarvest'
import PlantLog from './plant/PlantInfo'
import Search from './plant/Search'
import EditPlot from './plots/EditPlot'
import NewPlot from './plots/NewPlot'
import PlotInfo from './plots/PlotInfo'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import Signup from './user/Signup'
import Users from './user/Users'

const MainRouter = () => {
  return (<>
    <MenuBar />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/page=:page" component={Home} />
      <PrivateRoute path="/search=:search" component={Search} />
      {/* <PrivateRoute exact path="/news" component={DiscussionHome} /> */}
      <PrivateRoute exact path="/calendar" component={EventCalendar} />
      <PrivateRoute exact path="/activity" component={RecentHome} />
      <PrivateRoute exact path='/plan' component={GardenHome} />
      {/* <PrivateRoute exact path='/garden/edit/:gardenId' component={EditGarden} /> */}
      <PrivateRoute exact path="/plants/:plantId" component={PlantLog} />
      <PrivateRoute path="/plants/:plantId/plots/new" component={NewPlot} />
      <PrivateRoute path="/plants/:plantId/:plotId/edit" component={EditPlot} />
      <PrivateRoute exact path="/plants/:plantId/:plotId" component={PlotInfo} />
      <PrivateRoute path="/plants/:plantId/:plotId/new" component={NewHarvest} />
      <PrivateRoute path="/plants/:plantId/:plotId/:harvestId/edit" component={EditHarvest} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <PrivateRoute path="/user/:userId" component={Profile} />
      <Route path="*" component={NotFound} />
    </Switch>
  </>
  )
}

export default MainRouter
