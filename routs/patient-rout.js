const express = require("express");
const patientController = require("./../Controller/patientController");
const authController = require("./../Controller/userController");

const router = express.Router();

router
  .route("/patient/add-profile")
  .get(authController.authRoute,authController.authPer("g-user"), patientController.getPatientForm)
  .post(patientController.addPatientForm);

router.route("/patient/:id").get(patientController.getProfile);
module.exports = router;
