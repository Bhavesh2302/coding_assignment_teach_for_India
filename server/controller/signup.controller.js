const { Router } = require("express");
const bcrypt = require("bcryptjs");
const { UserModel } = require("../models/user.model");

const signupController = Router();

signupController.post("/", (req, res) => {
  const { name, email, password, role } = req.body;

  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      res.status(401).send({ msg: "something went wrong, please try again" });
    }
    try {
      const user = new UserModel({ name, email, password: hash, role });
      await user.save();
      res.status(201).send({ msg: "signup successful" });
    } catch (error) {
      res.status(401).send({ msg: "something went wrong, please try again" });
    }
  });
});

module.exports = { signupController };
