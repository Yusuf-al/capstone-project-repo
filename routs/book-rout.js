const express = require("express");
const viewController = require("../Controller/viewController");

const router = express.Router({ mergeParams: true });

router.post("/", viewController.appoint);

module.exports = router;
