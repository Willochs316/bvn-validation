const mongoose = require("mongoose");

const userBvnSchema = new mongoose.Schema(
  {
    bvn: {
      type: String,
      required: true,
      unique: true,
    },
    imageDetail: String,
    basicDetail: {
      bvn: String,
      date_of_birth: String,
      email: String,
      enrollment_bank: String,
      enrollment_branch: String,
      first_name: String,
      gender: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserBvn", userBvnSchema);
