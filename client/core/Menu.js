// import { CssBaseline, Slide, useScrollTrigger } from '@material-ui/core'
// import AppBar from '@material-ui/core/AppBar'
// import Button from '@material-ui/core/Button'
// import IconButton from '@material-ui/core/IconButton'
// import Toolbar from '@material-ui/core/Toolbar'
// import Typography from '@material-ui/core/Typography'
// import HomeIcon from '@material-ui/icons/Home'
// import PropTypes from 'prop-types'
// import React from 'react'
// import { Link, NavLink as RouterNavLink, withRouter } from 'react-router-dom'
// import auth from './../auth/auth-helper'

// function HideOnScroll(props) {
//   const { children, window } = props;
//   // Note that you normally won't need to set the window ref as useScrollTrigger
//   // will default to window.
//   // This is only being set here because the demo is in an iframe.
//   const trigger = useScrollTrigger({ target: window ? window() : undefined });

//   return (
//     <Slide appear={false} direction="down" in={!trigger}>
//       {children}
//     </Slide>
//   );
// }

// HideOnScroll.propTypes = {
//   children: PropTypes.element.isRequired,
//   window: PropTypes.func,
// };

// const isActive = (history, path) => {
//   if (history.location.pathname == path)
//     return { color: '#ffa726', flexGrow: 1 }
//   else
//     return { color: '#ffffff', flexGrow: 1 }
// }

// const Menu = withRouter(({ history }, props) => (
//   <div >
//     <CssBaseline />
//     {/* <HideOnScroll {...props}> */}
//     <AppBar position="static">
//       <Toolbar>
//         <Typography variant="h6" color="inherit">
//           FADD
//       </Typography>
//         <Link as={RouterNavLink} to="/">
//           <IconButton aria-label="Home" style={isActive(history, "/")}>
//             <HomeIcon />
//           </IconButton>
//         </Link>
//         {
//           !auth.isAuthenticated() && (<span>
//             <Link as={RouterNavLink} to="/signup">
//               <Button style={isActive(history, "/signup")}>Sign up
//             </Button>
//             </Link>
//             <Link as={RouterNavLink} to="/signin">
//               <Button style={isActive(history, "/signin")}>Sign In
//             </Button>
//             </Link>
//           </span>)
//         }
//         {
//           auth.isAuthenticated() && (<div align="right">
//             <Link as={RouterNavLink} to="/plants">
//               <Button style={isActive(history, "/plants")}>Garden</Button>
//             </Link>
//             <Link as={RouterNavLink} to={"/user/" + auth.isAuthenticated().user._id}>
//               <Button style={isActive(history, "/user/" + auth.isAuthenticated().user._id)}>Profile</Button>
//             </Link>
//             <Button color="inherit" onClick={() => {
//               auth.clearJWT(() => history.push('/'))
//             }}>Sign out</Button>
//           </div>)
//         }
//       </Toolbar>
//     </AppBar>
//     {/* </HideOnScroll> */}
//   </div>
// ))

// export default Menu


import { Avatar, Menu, MenuItem } from '@material-ui/core'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import HomeIcon from '@material-ui/icons/Home'
import PopupState, { bindMenu, bindTrigger } from 'material-ui-popup-state'
import React from 'react'
import { Link, withRouter } from 'react-router-dom'
import useIsSsr from '../utils/useIsSsr'
import auth from './../auth/auth-helper'
import SideBar from './SideBar'

const isActive = (history, path) => {
  if (history.location.pathname == path)
    return { color: '#bef67a' }
  else
    return { color: '#ffffff' }
}


const MenuBar = withRouter(({ history }) => {
  const isSsr = useIsSsr()

  const screenWidth = isSsr ? null : window.innerWidth;
  return (
    screenWidth ?
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            FADD
      </Typography>
          <div>
            <Link to="/">
              <IconButton aria-label="Home" style={isActive(history, "/")}>
                <HomeIcon />
              </IconButton>
            </Link>
            <Link to="/news">
              <Button style={isActive(history, "/news")}>News</Button>
            </Link>
          </div>
          <div style={{ 'position': 'absolute', 'right': '10px' }}>
            <div style={{ 'float': 'right' }}>
              {
                !auth.isAuthenticated() && (<>
                  <Link to="/signup">
                    <Button style={isActive(history, "/signup")}>Sign up
            </Button>
                  </Link>
                  <Link to="/signin">
                    <Button style={isActive(history, "/signin")}>Sign In
            </Button>
                  </Link>
                </>)
              }
            </div>
            <div style={{ 'float': 'right' }}>
              {
                auth.isAuthenticated() && (<>
                  <PopupState variant="popover" popupId="demo-popup-menu">
                    {(popupState) => (
                      <>
                        <Button {...bindTrigger(popupState)}>
                          <Avatar src={'../images/profile-pic.png'} />
                        </Button>
                        <Menu {...bindMenu(popupState)}>
                          <MenuItem onClick={popupState.close}>
                            <Button>
                              <Link to={"/user/" + auth.isAuthenticated().user._id}>
                                My Profile
                              </Link>
                            </Button>
                          </MenuItem>
                          <MenuItem onClick={popupState.close}>
                            <Button color="inherit" onClick={() => {
                              auth.clearJWT(() => history.push('/'))
                            }}>Sign out</Button>
                          </MenuItem>
                          <MenuItem>
                            <SideBar />
                          </MenuItem>
                        </Menu>
                      </>
                    )}
                  </PopupState>



                </>)
              }
            </div>
          </div>
        </Toolbar>
      </AppBar>
      : <AppBar></AppBar>)
})

export default MenuBar
