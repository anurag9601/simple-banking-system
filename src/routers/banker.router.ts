import express from "express";
import { handleGetUserInfo, handleGiveAllUsers } from "../controllers/banker.controllers";

const bankerRoutes = express.Router();

bankerRoutes.get("/users", handleGiveAllUsers);

bankerRoutes.post("/get-user-info", handleGetUserInfo)

export default bankerRoutes;