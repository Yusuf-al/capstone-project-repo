const chamber = require("./../Model/chamber-model");
const doctor = require("./../Model/doc-sec-model");
const appointTable = require("./../Model/appointments-model");
const userTable = require("./../Model/user-model");
const patient = require("./../Model/patients-model");

exports.getBookingForm = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    const doctorData = await doctor
      .findOne({ slug: req.params.slug })
      .populate({ path: "chambers" });
    const chamberData = await chamber.findById(req.params.id);
    // console.log(doctorData);
    // console.log(chamberData);
    // console.log(user);
    const doc = doctorData;
    const cham = chamberData;

    res.status(200).render("book-app", {
      doc,
      cham,
      title: "DocBook || Book Appoinment",
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.bookAppoint = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);

    const userData = await userTable
      .findById(user.id)
      .populate({ path: "patientInfo" });
    const patientId = userData.patientInfo[0].id;
    const doctorID = await doctor.findOne({ slug: req.params.slug });
    const chamberData = await chamber.findById(req.params.id);
    console.log(patientId);

    const docId = doctorID.id;
    const cham = chamberData;

    const appBook = await appointTable.create({
      date: req.body.appDate,
      address: req.body.patientAddress,
      contactNo: req.body.patientPhone,
      patientName: req.body.patientName,
      healthIssu: req.body.healthIssue,
      doctorData: docId,
      patientData: patientId,
      chamberData: req.params.id,
    });

    console.log(appBook);
    res.redirect("/");
  } catch (error) {
    res.send(error.message);
  }
};
