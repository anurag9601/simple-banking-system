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
exports.handleGiveAllUsers = handleGiveAllUsers;
exports.handleGetUserInfo = handleGetUserInfo;
const jwt_1 = require("../_lib/jwt");
const prismaClient_1 = require("../_lib/prismaClient");
function handleGiveAllUsers(req, res) {
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
            if (!validToken.banker) {
                res.status(400).json({ error: "You can't access this route" });
                return;
            }
            ;
            const allUsers = yield prismaClient_1.prismaClient.user.findMany();
            res.status(200).json({ success: true, allUsers });
        }
        catch (error) {
            console.log(`Error in /api/bank/users route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function handleGetUserInfo(req, res) {
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
            if (!validToken.banker) {
                res.status(400).json({ error: "You can't access this route" });
                return;
            }
            ;
            const { userId } = req.body;
            const userAllInfo = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    id: Number(userId),
                },
                select: {
                    id: true,
                    email: true,
                    balance: true,
                    transactions: true
                }
            });
            res.status(200).json({ success: true, userAllInfo });
        }
        catch (error) {
            console.log(`Error in /api/bank/get-user-info route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
