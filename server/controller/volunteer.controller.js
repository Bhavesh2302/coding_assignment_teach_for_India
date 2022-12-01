const { Router } = require("express");
const { authentication } = require("../middleware/authentication");
const { authorization } = require("../middleware/authorization");
const { validateVolunteer } = require("../middleware/validationMiddleware");
const { VolunteerModel } = require("../models/volunteer.model");

const volunteerController = Router();

volunteerController.get(
  "/get",
  authentication,
  authorization(["admin"]),
  async (req, res) => {
    const { userId } = req.body;

    const allVolunteers = await VolunteerModel.find();

    res.send({ allVolunteers: allVolunteers });
  }
);

volunteerController.post(
  "/add",
  authentication,
  validateVolunteer,
  async (req, res) => {
    try {
      const {
        name,
        email,
        mobileNumber,
        address,
        location,
        spokenLanguages,
        availability,
        userId,
      } = req.body;
      const volunteer = new VolunteerModel({
        name,
        email,
        mobileNumber,
        address,
        location,
        spokenLanguages,
        availability,
        userId,
      });
      await volunteer.save();
      res.status(201).send({ msg: "volunteer added successfully" });
    } catch (error) {
      res.status(401).send({ msg: "something went wrong please try again" });
    }
  }
);

module.exports = {
  volunteerController,
};
