import React from 'react'
import { Route, Switch } from 'react-router-dom'
import PrivateRoute from './auth/PrivateRoute'
import Signin from './auth/Signin'
import Home from './core/Home'
import Menu from './core/Menu'
import PlantHome from './core/PlantHome'
import PlantLog from './plant/PlantInfo'
import EditProfile from './user/EditProfile'
import Profile from './user/Profile'
import Signup from './user/Signup'
import Users from './user/Users'

const MainRouter = () => {
  return (<div>
    <Menu />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/plants" component={PlantHome} />
      <Route exact path="/plants/:plantId" component={PlantLog} />
      <Route path="/users" component={Users} />
      <Route path="/signup" component={Signup} />
      <Route path="/signin" component={Signin} />
      <PrivateRoute path="/user/edit/:userId" component={EditProfile} />
      <Route path="/user/:userId" component={Profile} />
    </Switch>
  </div>)
}

export default MainRouter
