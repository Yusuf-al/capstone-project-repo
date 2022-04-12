const express = require("express");
const docController = require("./../Controller/doctorController");
const authController = require("./../Controller/userController");

const router = express.Router();
router
  .route("/doctor/add-doctor")
  .get(
    authController.authRoute,
    authController.authPer("doctor"),
    docController.getform
  )
  .post(docController.addProfile);
router
  .route("/doctor/profile")
  .get(
    authController.authRoute,
    authController.authPer("doctor"),
    docController.getDoc
  );
router
  .route("/doctor/add-chamber")
  .get(
    authController.authRoute,
    authController.authPer("doctor"),
    docController.getChamberForm
  )
  .post(docController.addChamber);
router.route("/doctor/:slug").get(docController.getDetails);

module.exports = router;
