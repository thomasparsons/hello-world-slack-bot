const bodyParser = require("body-parser")
const slackRoutes = require("./slackRoutes")

module.exports = function(app) {
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({extended: true}))

  // Routes
  app.use(slackRoutes)

  // 404
  app.use((req, res) => {
    res.status(404).send({
      status: 404,
      message: "The requested resource was not found"
    })
  })

  // 5xx
  app.use((err, req, res) => {
    console.log(err.stack)
    const message = process.env.NODE_ENV === "production"
      ? "Something went wrong, we're looking into it..."
      : err.stack
    res.status(500).send({
      status: 500,
      message
    })
  })
}
