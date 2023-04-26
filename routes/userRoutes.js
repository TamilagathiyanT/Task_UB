const express = require("express");
const userController = require("../controllers/userController");

const router = express.Router();

router
  .route("/")
  .post(userController.createUser)
  .get(userController.protect, userController.getAllUsers);

router.route("/otp-verify").post(userController.otpVerify);

router
  .route("/:id")
  .patch(userController.protect, userController.updateUser)
  .delete(userController.protect, userController.deleteUser);

module.exports = router;
