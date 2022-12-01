const { VolunteerModel } = require("../models/volunteer.model");

const validateVolunteer = async (req, res, next) => {
  const {
    name,
    email,
    mobileNumber,
    address,
    location,
    spokenLanguages,
    availability,
  } = req.body;

  if (
    name &&
    email &&
    mobileNumber &&
    address &&
    location &&
    spokenLanguages &&
    availability
  ) {
    let mobileLength = mobileNumber.toString();
    if (mobileLength.length === 10) {
      next();
    } else {
      res.send({ msg: "Please enter the 10 digit mobile number" });
    }
  } else {
    res.send({ msg: "error! please fill all the fields" });
  }
};

module.exports = {
  validateVolunteer,
};
