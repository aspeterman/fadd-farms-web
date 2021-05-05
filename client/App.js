import { ThemeProvider } from '@material-ui/styles'
import React from 'react'
import { hot } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import MainRouter from './MainRouter'
import theme from './theme'

const App = () => {
  React.useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentNode.removeChild(jssStyles)
    }
  }, [])
  return (
    <BrowserRouter
      forceRefresh={true}
    >
      {/* <ScrollToTop /> */}
      <ThemeProvider theme={theme}>
        <MainRouter />
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default hot(module)(App)
