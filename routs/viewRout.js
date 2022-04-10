const express = require("express");
const viewController = require("../Controller/viewController");
const authController = require("./../Controller/userController");
// const bookApp = require("./book-rout");

const router = express.Router();

// router.use("/:slug/book-appointment", bookApp);
// router.get("/limit", viewController.chamberInfo);

router.get("/", viewController.getall);
// router.get("/ad-doctor", viewController.docform);
// router.post("/ad-doctor", viewController.addDoctor);
// router.post('/:slug/book-appointment', viewController.appoint);
// router.post("/ad-patient", viewController.addPatients);
// router.get("/:slug/add-chamber", viewController.chmIn);
// router.post("/:slug/add-chamber", viewController.addCham);
// router.get("/all-appoinments", viewController.getAllAppoint);
// router.get("/:slug", viewController.getSingle);
// router.get("/:slug/book-appointment", viewController.bookForm);
// router.get("/:slug1/:slug2/book", viewController.chm);
// router.post('/:slug/book-appointment', viewController.bookapp);

module.exports = router;
