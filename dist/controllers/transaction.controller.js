"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDepositMoney = handleDepositMoney;
exports.handleWithdrawMoney = handleWithdrawMoney;
exports.handleGiveAllTheTransactions = handleGiveAllTheTransactions;
const jwt_1 = require("../_lib/jwt");
const prismaClient_1 = require("../_lib/prismaClient");
function handleDepositMoney(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { amount } = req.body;
            const token = req.cookies.authToken;
            if (!token) {
                res.status(400).json({ error: "Invalid request" });
                return;
            }
            const validToken = (0, jwt_1.verifyToken)(token);
            if (!validToken) {
                res.status(400).json({ error: "Invalid user" });
                return;
            }
            const transaction = yield prismaClient_1.prismaClient.transaction.create({
                data: {
                    action: "Deposit",
                    amount: Number(amount),
                    user: {
                        connect: {
                            id: validToken.id
                        }
                    }
                }
            });
            const updatedUser = yield prismaClient_1.prismaClient.user.update({
                where: {
                    email: validToken.email
                },
                data: {
                    balance: validToken.balance + Number(amount)
                }
            });
            const payload = {
                id: updatedUser.id,
                email: updatedUser.email,
                balance: updatedUser.balance
            };
            const newToken = (0, jwt_1.createToken)(payload);
            res.cookie("authToken", newToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            res.status(200).json({ success: true, user: payload, transaction });
        }
        catch (error) {
            console.log(`Error in /api/money/deposit route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function handleWithdrawMoney(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { amount } = req.body;
            const token = req.cookies.authToken;
            if (!token) {
                res.status(400).json({ error: "Invalid request" });
                return;
            }
            const validToken = (0, jwt_1.verifyToken)(token);
            if (!validToken) {
                res.status(400).json({ error: "Invalid user" });
                return;
            }
            const transaction = yield prismaClient_1.prismaClient.transaction.create({
                data: {
                    action: "Withdrawal",
                    amount: Number(amount),
                    user: {
                        connect: {
                            id: validToken.id
                        }
                    }
                }
            });
            const updatedUser = yield prismaClient_1.prismaClient.user.update({
                where: {
                    email: validToken.email
                },
                data: {
                    balance: validToken.balance - Number(amount)
                }
            });
            const payload = {
                id: updatedUser.id,
                email: updatedUser.email,
                balance: updatedUser.balance
            };
            const newToken = (0, jwt_1.createToken)(payload);
            res.cookie("authToken", newToken, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            res.status(200).json({ success: true, user: payload, transaction });
        }
        catch (error) {
            console.log(`Error in /api/money/withdraw route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function handleGiveAllTheTransactions(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.authToken;
            if (!token) {
                res.status(400).json({ error: "Invalid request" });
                return;
            }
            const validToken = (0, jwt_1.verifyToken)(token);
            if (!validToken) {
                res.status(400).json({ error: "Invalid user" });
                return;
            }
            const allTransactions = yield prismaClient_1.prismaClient.user.findUnique({
                where: { id: validToken.id },
                select: {
                    id: true,
                    email: true,
                    transactions: true
                }
            });
            res.status(200).json({ success: true, allTransactions });
        }
        catch (error) {
            console.log(`Error in /api/money/transaction/all route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
