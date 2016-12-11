import api from './api/'
import compression from 'compression'
import express from 'express'
import proxy from 'express-http-proxy'
import url from 'url'
import { spawn } from 'child_process'

const next_bin = `${__dirname}/node_modules/next/dist/bin/next`
// const next = spawn('node', [next_bin], { cwd: process.__dirname })

const node = express()
.use(compression())
.use('/api', api)
.use('*', proxy('http://localhost:3000', {
  forwardPath: (request) => request.baseUrl,
}))
.listen(8080, () => {
  console.log('Express server running on port 8080')
})

function shutdown() {
  node.close(() => {
    console.log('Shutting down next.js server')
    // next.exit()
    console.log('Shutting down express server')
    process.exit()
  })
}

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)
