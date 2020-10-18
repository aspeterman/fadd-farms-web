import { CssBaseline, Slide, useScrollTrigger } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import PropTypes from 'prop-types'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import auth from './../auth/auth-helper'

function HideOnScroll(props) {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

HideOnScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return { color: '#ffa726' }
  else
    return { color: '#ffffff' }
}
const Menu = withRouter(({ history }, props) => (
  <>
    <CssBaseline />
    <HideOnScroll {...props}>
      <AppBar position="fixed">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            FADD Farms
      </Typography>
          <Link to="/">
            <IconButton aria-label="Home" style={isActive(history, "/")}>
              <HomeIcon />
            </IconButton>
          </Link>
          {
            !auth.isAuthenticated() && (<span>
              <Link to="/signup">
                <Button style={isActive(history, "/signup")}>Sign up
            </Button>
              </Link>
              <Link to="/signin">
                <Button style={isActive(history, "/signin")}>Sign In
            </Button>
              </Link>
            </span>)
          }
          {
            auth.isAuthenticated() && (<span>
              <Link to="/plants">
                <Button style={isActive(history, "/plants")}>Garden</Button>
              </Link>
              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>My Profile</Button>
              </Link>
              <Button color="inherit" onClick={() => {
                auth.clearJWT(() => history.push('/'))
              }}>Sign out</Button>
            </span>)
          }
        </Toolbar>
      </AppBar>
    </HideOnScroll>
  </>
))

export default Menu
