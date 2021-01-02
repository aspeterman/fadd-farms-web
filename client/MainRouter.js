import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Signin from './auth/Signin'
import DiscussionHome from './core/DiscussionHome'
import Home from './core/Home'
import MenuBar from './core/Menu'
import NotFound from './core/NotFound'
import RecentHome from './core/RecentHome'
import EditHarvest from './harvest/EditHarvest'
import NewHarvest from './harvest/NewHarvest'
import PlantLog from './plant/PlantInfo'
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
      <Route exact path="/news" component={DiscussionHome} />
      <Route exact path="/activity" component={RecentHome} />
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
