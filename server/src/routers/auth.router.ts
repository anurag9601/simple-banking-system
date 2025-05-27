import express from "express";
import { handleSendUserInfo, handleUserSignIn, handleUserSignOut, handleUserSignUp } from "../controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/sign-up", handleUserSignUp);

authRoutes.post("/sign-in", handleUserSignIn);

authRoutes.get("/sign-out", handleUserSignOut);

authRoutes.get("/me", handleSendUserInfo);

export default authRoutes;  