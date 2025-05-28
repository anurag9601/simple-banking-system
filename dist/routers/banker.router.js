"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const banker_controllers_1 = require("../controllers/banker.controllers");
const bankerRoutes = express_1.default.Router();
bankerRoutes.get("/users", banker_controllers_1.handleGiveAllUsers);
bankerRoutes.post("/get-user-info", banker_controllers_1.handleGetUserInfo);
exports.default = bankerRoutes;
