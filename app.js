const express = require("express");

const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");

const userRouter = require("./routes/userRoutes");
const app = express();
app.use(express.json());

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");

// 1) GLOBAL MIDDLEWARES
// Set security HTTP headers
app.use(helmet());

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// 3) ROUTES
app.use("/api/v1/users", userRouter);
app.use(globalErrorHandler);
module.exports = app;
