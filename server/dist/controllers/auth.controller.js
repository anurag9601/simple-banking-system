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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleBankerLogin = handleBankerLogin;
exports.handleUserSignUp = handleUserSignUp;
exports.handleUserSignIn = handleUserSignIn;
exports.handleUserSignOut = handleUserSignOut;
exports.handleSendUserInfo = handleSendUserInfo;
const prismaClient_1 = require("../_lib/prismaClient");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_1 = require("../_lib/jwt");
function handleBankerLogin(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            if (email !== process.env.BANKER_EMAIL) {
                res.status(400).json({ error: "User not found." });
                return;
            }
            ;
            if (password !== process.env.BANKER_PASSWORD) {
                res.status(400).json({ error: "Invalid email or password" });
                return;
            }
            const user = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    email
                }
            });
            if (!user) {
                res.status(400).json({ error: "User not found." });
                return;
            }
            const payload = {
                id: user.id,
                email: user.email,
                balance: user.balance,
                banker: true,
            };
            const token = (0, jwt_1.createToken)(payload);
            res.cookie("authToken", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            res.status(200).json({ success: true });
        }
        catch (error) {
            console.log(`Error in /api/auth/banker route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function handleUserSignUp(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const existingUser = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    email,
                }
            });
            if (existingUser) {
                res.status(400).json({ error: "User alreay exist." });
                return;
            }
            const salt = yield bcrypt_1.default.genSalt(10);
            const hashPassword = yield bcrypt_1.default.hash(password, salt);
            const newUser = yield prismaClient_1.prismaClient.user.create({
                data: {
                    email,
                    password: hashPassword,
                }
            });
            const payload = {
                id: newUser.id,
                email: newUser.email,
                balance: newUser.balance
            };
            const token = (0, jwt_1.createToken)(payload);
            res.cookie("authToken", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000
            });
            res.status(200).json({ success: true });
        }
        catch (error) {
            console.log(`Error in /api/auth/sign-in route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function handleUserSignIn(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const existingUser = yield prismaClient_1.prismaClient.user.findUnique({
                where: {
                    email
                }
            });
            if (!existingUser) {
                res.status(400).json({ error: "User not found." });
                return;
            }
            ;
            const validPassword = yield bcrypt_1.default.compare(password, existingUser.password);
            if (!validPassword) {
                res.status(400).json({ error: "Invalid email or password" });
                return;
            }
            const payload = {
                id: existingUser.id,
                email: existingUser.email,
                balance: existingUser.balance
            };
            const token = (0, jwt_1.createToken)(payload);
            res.cookie("authToken", token, {
                httpOnly: true,
                maxAge: 60 * 60 * 1000,
            });
            res.status(200).json({ success: true });
        }
        catch (error) {
            console.log(`Error in /api/auth/sign-in route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function handleUserSignOut(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            res.cookie("authToken", "", {
                maxAge: 0
            });
            res.status(200).json({ success: true });
        }
        catch (error) {
            console.log(`Error in /api/auth/sign-out route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
function handleSendUserInfo(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const token = req.cookies.authToken;
            if (!token) {
                res.status(400).json({ message: "Token not found" });
            }
            const validToken = (0, jwt_1.verifyToken)(token);
            if (!validToken) {
                res.status(401).json({ error: "Unauthorized token" });
                return;
            }
            if (validToken.banker) {
                res.status(200).json({
                    user: {
                        id: validToken.id,
                        email: validToken.email,
                        balance: validToken.balance,
                        banker: validToken.banker
                    }
                });
                return;
            }
            res.status(200).json({
                user: {
                    id: validToken.id,
                    email: validToken.email,
                    balance: validToken.balance,
                    banker: validToken.banker
                }
            });
        }
        catch (error) {
            console.log(`Error in /api/auth/me route ${error}`);
            res.status(500).json({ error: "Internal server error" });
        }
    });
}
