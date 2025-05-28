import express from "express";
import { handleDepositMoney, handleGiveAllTheTransactions, handleWithdrawMoney } from "../controllers/transaction.controller";

const transactionRoutes = express.Router();

transactionRoutes.post("/deposit", handleDepositMoney);

transactionRoutes.post("/withdrawal", handleWithdrawMoney);

transactionRoutes.get("/transaction/all", handleGiveAllTheTransactions);

export default transactionRoutes;