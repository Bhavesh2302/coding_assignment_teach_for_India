const { Router } = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const { UserModel } = require("../models/user.model");

const loginController = Router();

loginController.post("/", async (req, res) => {
  const { email, password } = req.body;

  let user = await UserModel.findOne({ email });
  const hash = user.password;

  bcrypt.compare(password, hash, function (err, result) {
    if (err) {
      res.send({ msg: "Something went wrong please try again" });
    }
    if (result === true) {
      const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
      res.send({ msg: "login successfull", token: token, user: user });
    } else {
      res.send({ msg: "Something went wrong please try again"});
    }
  });
});

module.exports = { loginController };
