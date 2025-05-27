import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routers/auth.router";

dotenv.config();

const app = express();

app.use(cookieParser())

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use("/api/auth", authRoutes);

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});