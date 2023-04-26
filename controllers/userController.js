const User = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const catchAsync = require("./../utils/catchAsync");
const otpHandlers = require("./../utils/otp");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.cookie("jwt", token, cookieOptions);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.createUser = catchAsync(async (req, res) => {
  const otp = await otpHandlers.generateOTP(); //default 9999
  await otpHandlers.sendOTP(otp);
  req.body.otp = otp;

  const user = await User.findOne({ mobile: req.body.mobile });
  if (!user) {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: {
        user: newUser,
      },
    });
  } else {
    user.otp = otp;
    const updateUser = await user.save();
    res.status(200).json({
      status: "success",
      data: {
        user: updateUser,
      },
    });
  }
});

exports.otpVerify = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ mobile: req.body.mobile });
  if (!user) {
    return next(new AppError("Mobile Number is not found in DB!", 404));
  }
  if (user.otp !== req.body.otp) {
    return next(new AppError("Invalid OTP!", 401));
  }

  createSendToken(user, 200, res);
});

exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2) Verification token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();
  // SEND RESPONSE
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
