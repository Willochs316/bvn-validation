const express = require("express");
const router = express.Router();
const {
  getUserBvn,
  setUserBvn,
  updateUserBvn,
  deleteUserBvn,
} = require("../controller/userBvnController");

router.route("/").get(getUserBvn).post(setUserBvn);
router.route("/:id").delete(deleteUserBvn).put(updateUserBvn);

module.exports = router;
