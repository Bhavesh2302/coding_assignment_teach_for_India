const mongoose = require("mongoose");

const classroomSchema = new mongoose.Schema({
  classroomID: { type: String },
  capacity: { type: String },
  requirement: { type: String },
  subjects: { type: Array },
  languageRequirement: { type: Array },
  location: { type: String },
  volunteer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "volunteer",
  },
});

const ClassroomModel = mongoose.model("classroom", classroomSchema);

module.exports = {
  ClassroomModel,
};
