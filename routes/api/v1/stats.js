const express = require('express');
const router = express.Router();
const statsController = require('../../../controllers/api/v1/stats');

router.get("/", statsController.getAll);
router.post("/add", statsController.create);
//router.put("/updateStats", statsController.update);

module.exports = router;