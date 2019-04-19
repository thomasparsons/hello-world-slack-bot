const express = require("express")
const http = require("http")
const bodyParser = require("body-parser")

const slackRoutes = require("./slackRoutes")

const app = express()

app.start = async() => {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))
  app.use(slackRoutes)
  const server = http.createServer(app)
  server.listen(process.env.PORT || 5000)
  console.log(`Server started on port ${process.env.PORT || 5000}`)
}

app.start()

module.exports = app
