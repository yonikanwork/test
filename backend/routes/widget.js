const express = require("express");
const WidgetController = require("../controllers/widgets");
const checkAuth = require("../middleware/check-auth");


const router = express.Router();

router.get("", checkAuth, WidgetController.getWidgets);

router.get("/:id", checkAuth, WidgetController.getWidget);

module.exports = router;