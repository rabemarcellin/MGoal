const express = require('express');
const cors = require("cors")
const goalRouter = require('./goal')
const doRouter = require('./do')

const app = express()
const apiRouter = express.Router()

app.use(cors())
app.use(express.json());

app.use('/api', apiRouter)
apiRouter.use('/goal', goalRouter)
apiRouter.use('/do', doRouter)

module.exports = app