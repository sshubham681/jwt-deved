import express from "express";
import { connectToDB } from "./db/db.js";
import dotenv from "dotenv";
const app = express();

dotenv.config({
  path: "./.env",
});

// import Routes
import authRoute from "./routes/auth.js";

// Route Middleware
app.use("/api/user", authRoute);
connectToDB();

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
