import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./configs/db.js";
import "dotenv/config";
import router from "./routes/indexRoutes.js";
import connectCloudinary from "./configs/cloudinary.js";

// import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000 || {};

await connectDB();
await connectCloudinary();

// const allowedOrigin = ['http://localhost:3000']

app.use(express.json());
app.use(cookieParser());

// app.use(cors({allowedOrigin: 'http://localhost:3000',Credentials: true}))

app.get("/", (req, res) => {
  res.send("Api is running");
});

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
