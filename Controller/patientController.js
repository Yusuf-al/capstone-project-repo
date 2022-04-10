const { param } = require("../routs/viewRout");
const generalUser = require("./../Model/patients-model");

exports.getPatientForm = (req, res, next) => {
  console.log(req.user);
  res.status(200).render("patient-form");
};

exports.getProfile = async (req, res, next) => {
  const patient = await generalUser.findById(req.params.id).populate({
    path: "userDel",
  });
  res.status(200).json({
    data: patient,
  });
};

exports.addPatientForm = async (req, res, next) => {
  const token = req.cookies.jwt;
  const tokenParts = token.split(".");
  const encodedPayload = tokenParts[1];
  const rawPayload = atob(encodedPayload);
  const user = JSON.parse(rawPayload);
  console.log(token);

  const patient = await generalUser.create({
    name: req.body.userName,
    userDel: user.id,
    phoneNum: req.body.userPhone,
    address: req.body.userAddress,
    gender: req.body.gander,
    healthIssu: req.body.healthIssu,
  });

  console.log(patient);

  res.status(200).redirect("/");
};
