import cors from "cors";
import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import register from "./routes/register.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

dotenv.config(); // load .env file

// create app
const app = express();

// allow cors
app.use(cors());

// connect to DB
connectDB();

// accept form data submission
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// PORT
const PORT = process.env.PORT || 8000;

// register route
register(app);

app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(
    `Server is running on http://localhost:${PORT}`.bold.cyan.underline
  )
);
