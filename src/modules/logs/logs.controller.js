const { Router } = require("express");
const service = require("./logs.service");

const router = Router();

// Q7: POST /logs
router.post("/", async (req, res, next) => {
  try {
    res.status(201).json(await service.insertLog(req.body));
  } catch (error) {
    next(error);
  }
});

module.exports = router;
