const users = require("./../Model/user-model");
const jwt = require("jsonwebtoken");

exports.singUpForm = async (req, res, next) => {
  res.status(200).render("regpage");
};

exports.singUp = async (req, res, next) => {
  const user = new users({
    email: req.body.email,
    password: req.body.password,
    confirmPass: req.body.cPassword,
    role: req.body.role,
  });
  const addUser = await user.save();

  const token = jwt.sign({ id: addUser._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP_IN,
  });

  res.cookie("jwt", token, {
    expires: new Date(Date.now() + 60 * 60 * 1000),
    httpOnly: true,
  });

  // console.log(token);
  // console.log(addUser.id);

  if (req.body.role === "doctor") {
    res.status(200).redirect("/doctor/add-doctor");
  } else {
    res.status(200).redirect("/patient/add-profile");
  }
};

exports.getUser = async (req, res, next) => {
  const user = await users.findById(req.params.id).populate({
    path: "userInfo patientInfo",
  });

  res.status(200).json({
    data: user,
  });
};

exports.logInform = async (req, res, next) => {
  try {
    res.status(200).render("logIn");
  } catch (error) {
    error.message;
  }
};

exports.authRoute = async (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        res.redirect("/");
      } else {
        // console.log(decode);
        next();
      }
    });
  } else {
    res.redirect("/user/log-In");
  }
};

exports.logIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userLogIn = await users.findOne({ email }).select("+password");
    if (
      !userLogIn ||
      !(await userLogIn.comparePass(password, userLogIn.password))
    ) {
      console.log("User Not registered");
      res.status(200).redirect("/user/log-In");
    } else {
      const token = jwt.sign({ id: userLogIn._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXP_IN,
      });

      res.cookie("jwt", token, {
        expires: new Date(Date.now() + 60 * 60 * 1000),
        httpOnly: true,
      });
      if (userLogIn.role === "doctor") {
        res.status(200).redirect("/doctor/profile");
      } else {
        res.status(200).redirect("/");
      }
    }
  } catch (error) {
    error.message;
  }
};

exports.regForm = async (req, res, next) => {
  try {
    res.status(200).render("docinput");
  } catch (error) {
    error.message;
  }
};

exports.authPer = (role) => {
  return async (req, res, next) => {
    const token = req.cookies.jwt;
    const tokenParts = token.split(".");
    const encodedPayload = tokenParts[1];
    const rawPayload = atob(encodedPayload);
    const user = JSON.parse(rawPayload);
    const userRole = await users.findById(user.id);
    if (role !== userRole.role) {
      // return next(new AppError('Request Denied', 403));
      return res.status(403).render("unauthorized");
    }

    next();
  };
};
