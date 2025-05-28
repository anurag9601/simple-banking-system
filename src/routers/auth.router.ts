import express from "express";
import { handleBankerLogin, handleSendUserInfo, handleUserSignIn, handleUserSignOut, handleUserSignUp } from "../controllers/auth.controller";

const authRoutes = express.Router();

authRoutes.post("/banker", handleBankerLogin);

authRoutes.post("/sign-up", handleUserSignUp);

authRoutes.post("/sign-in", handleUserSignIn);

authRoutes.get("/sign-out", handleUserSignOut);

authRoutes.get("/me", handleSendUserInfo);

export default authRoutes;  