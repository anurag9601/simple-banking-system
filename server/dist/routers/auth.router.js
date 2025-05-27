"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const authRoutes = express_1.default.Router();
authRoutes.post("/banker", auth_controller_1.handleBankerLogin);
authRoutes.post("/sign-up", auth_controller_1.handleUserSignUp);
authRoutes.post("/sign-in", auth_controller_1.handleUserSignIn);
authRoutes.get("/sign-out", auth_controller_1.handleUserSignOut);
authRoutes.get("/me", auth_controller_1.handleSendUserInfo);
exports.default = authRoutes;
