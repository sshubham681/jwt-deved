import express from "express";
import { connectToDB } from "./db/db.js";
import dotenv from "dotenv";
import authRoute from "./routes/auth.js";
import postRoute from './routes/posts.js'

const app = express();

dotenv.config({
  path: "./.env",
});

// connect to DB
connectToDB();

// middleware
app.use(express.json());

// Route Middleware
app.use("/api/user", authRoute);
app.use('/api/posts',postRoute)

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
