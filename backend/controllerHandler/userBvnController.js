const asyncHandler = require("express-async-handler");
const UserBvn = require("../modelHandler/bvnModel");
const Joi = require("@hapi/joi");
const { bvnValidateSchema } = require("../modelHandler/validationSchema");
const sdk = require("api")("@dojahinc/v1.0#62779ea25dfa1d0034110bf6");
const axios = require("axios");

const getUserBvn = asyncHandler(async (req, res) => {
  const userBvns = await UserBvn.find();

  res.status(200).json(userBvns);
});

const setUserBvn = asyncHandler(async (req, res) => {
  try {
    console.log(req.body);
    await bvnValidateSchema.validateAsync(req.body);

    // Use the SDK method to verify BVN
    const data = await sdk.verifyBvn(req.body.bvn);

    const response = {
      message: "success",
      bvn: req.body.bvn,
      imageDetail: data.entity.image,
      basicDetail: {
        bvn: data.entity.bvn,
        date_of_birth: data.entity.date_of_birth,
        email: data.entity.email,
        enrollment_bank: data.entity.enrollment_bank,
        enrollment_branch: data.entity.enrollment_branch,
        first_name: data.entity.first_name,
        gender: data.entity.gender,
      },
    };

    UserBvn.create({
      ...response,
    });
    // here we send the repsonse to the user
    res.status(200).json(response);
  } catch (error) {
    res.status(error.status ?? 400).json({
      message: error.message,
      bvn: req.body.bvn,
    });
  }
});

const updateUserBvn = asyncHandler(async (req, res) => {
  const userbvn = await UserBvn.findById(req.params.id);

  if (!userbvn) {
    res.status(400);
    throw new Error("Empty BVN in request");
  }

  const updatedUserBvn = await UserBvn.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedUserBvn);
});

const deleteUserBvn = asyncHandler(async (req, res) => {
  const userbvn = await UserBvn.findById(req.params.id);

  if (!userbvn) {
    res.status(400);
    throw new Error("Empty BVN in request");
  }

  await userbvn.remove();

  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = {
  getUserBvn,
  setUserBvn,
  updateUserBvn,
  deleteUserBvn,
};
