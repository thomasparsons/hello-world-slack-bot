const express = require("express");
const responses = require("./responses");

const router = new express.Router();

router.post("/notion", async (req, res) => {
  const r = await responses.genericResponse(req.body);
  return res.json(r);
});

module.exports = router;
