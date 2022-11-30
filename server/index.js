const express = require("express");
require("dotenv").config();
const app = express();
const { connection } = require("./configs/db");
const cors = require("cors");
const { signupController } = require("./controller/signup.controller");
const { loginController } = require("./controller/login.controller");
const { volunteerController } = require("./controller/volunteer.controller");


app.use(cors());
app.use(express.json());
app.use("/signup", signupController);
app.use("/login", loginController);
app.use("/volunteer",volunteerController)

const PORT = process.env.PORT || 7500;

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, async () => {
  try {
    await connection;
    console.log("running on port : http://localhost:7500");
  } catch (err) {
    console.log(err);
  }
});
