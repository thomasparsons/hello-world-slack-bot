const express = require("express")
const responses = require("./responses")

const router = new express.Router()

router.post("/slack/hello-world", async(req, res) =>
  responses.genericResponse(req.body).then((r) => res.json(r))
)

module.exports = router
