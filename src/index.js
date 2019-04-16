const express = require("express")
const http = require("http")

const setUp = require("./setUp")

const PORT = process.env.PORT || 8000

const app = express()

app.start = async() => {
  setUp(app)
  const server = http.createServer(app)
  server.listen(PORT)
}

app.start()

module.exports = app
