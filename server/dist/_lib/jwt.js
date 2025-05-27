"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createToken = createToken;
exports.verifyToken = verifyToken;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createToken(data) {
    const token = jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
    return token;
}
;
function verifyToken(token) {
    const validTokenStatus = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
    return validTokenStatus;
}
