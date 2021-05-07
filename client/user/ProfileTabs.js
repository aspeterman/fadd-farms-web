import { GridList } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Tab from '@material-ui/core/Tab'
import Tabs from '@material-ui/core/Tabs'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, { useState } from 'react'
import Plant from '../plant/Plant'
import FollowGrid from './../user/FollowGrid'

export default function ProfileTabs(props) {
  const [tab, setTab] = useState(0)

  const handleTabChange = (event, value) => {
    setTab(value)
  }

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs
          value={tab}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          {/* <Tab label="Posts" /> */}
          <Tab label="Following" />
          <Tab label="Followers" />
          <Tab label="Plants" />
        </Tabs>
      </AppBar>
      {/* {tab === 0 && <TabContainer><PostList removeUpdate={props.removePostUpdate} posts={props.posts} /></TabContainer>} */}
      {tab === 0 && <TabContainer><FollowGrid people={props.user.following} /></TabContainer>}
      {tab === 1 && <TabContainer><FollowGrid people={props.user.followers} /></TabContainer>}
      {tab === 2 && <TabContainer>
        {props.plants.map((item, i) => {
          return (
            <GridList cellHeight={'auto'} key={i} >
              <Plant plant={item} key={i}
              />
            </GridList>
          )
        })}
      </TabContainer>}
    </div>)

}

ProfileTabs.propTypes = {
  user: PropTypes.object.isRequired,
  removePostUpdate: PropTypes.func.isRequired,
  posts: PropTypes.array.isRequired,
  plants: PropTypes.array.isRequired
}

const TabContainer = (props) => {
  return (
    <Typography component="div" style={{ padding: 8 * 2 }}>
      {props.children}
    </Typography>
  )
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
}
