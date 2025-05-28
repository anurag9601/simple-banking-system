"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const transaction_controller_1 = require("../controllers/transaction.controller");
const transactionRoutes = express_1.default.Router();
transactionRoutes.post("/deposit", transaction_controller_1.handleDepositMoney);
transactionRoutes.post("/withdrawal", transaction_controller_1.handleWithdrawMoney);
transactionRoutes.get("/transaction/all", transaction_controller_1.handleGiveAllTheTransactions);
exports.default = transactionRoutes;
