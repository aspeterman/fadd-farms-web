import { ServerStyleSheets, ThemeProvider } from '@material-ui/styles'
import bodyParser from 'body-parser'
import compress from 'compression'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import path from 'path'
// modules for server side rendering
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import MainRouter from './../client/MainRouter'
import theme from './../client/theme'
import Template from './../template'
import authRoutes from './routes/auth.routes'
import gardenRoutes from './routes/garden.routes'
import harvestRoutes from './routes/harvest.routes'
import plantRoutes from './routes/plant.routes'
import plotRoutes from './routes/plot.routes.js'
import postRoutes from './routes/post.routes'
import userRoutes from './routes/user.routes'
const CURRENT_WORKING_DIR = process.cwd()
const app = express()

//comment out before building for production
// devBundle.compile(app)

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
// secure apps by setting various HTTP headers
app.use(helmet())
// enable CORS - Cross Origin Resource Sharing
app.use(cors())

app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))

// mount routes
app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', postRoutes)
app.use('/', plantRoutes)
app.use('/', plotRoutes)
app.use('/', harvestRoutes)
app.use('/', gardenRoutes)

app.get('*', (req, res) => {
  const sheets = new ServerStyleSheets()

  const context = {}
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  )
  // if (context.url) {
  //   return res.redirect(303, context.url)
  // }
  const css = sheets.toString()
  res.status(200).send(Template({
    markup: markup,
    css: css
  }))
})

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({ "error": err.name + ": " + err.message })
  } else if (err) {
    res.status(400).json({ "error": err.name + ": " + err.message })
    console.log(err)
  }
})

export default app
