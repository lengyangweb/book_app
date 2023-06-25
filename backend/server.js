import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // load .env file
import colors from 'colors';
import cookieParser from 'cookie-parser';
import register from './routes/register.js';
import { errorHandler, notFound } from './middlewares/errorMiddleware.js';
import connectDB from './config/db.js';

// create app
const app = express();

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

app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`.bold.cyan.underline));
