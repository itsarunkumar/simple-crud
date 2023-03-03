const express = require("express");
const router = express.Router();
const { authenticate } = require("../util/apiKey");
const { cache } = require("../util/cache");

const taskController = require("../controller/taskController");

// router.get("/test", authenticate, taskController.test);
router.get("/all", authenticate, cache(20), taskController.all);
router.post("/create", authenticate, taskController.create);
router.delete("/delete/:id", authenticate, taskController.delete);

module.exports = router;
