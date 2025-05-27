import { Request, Response } from "express";
import { prismaClient } from "../_lib/prismaClient";
import bcrypt from "bcrypt";
import { createToken, DataType, verifyToken } from "../_lib/jwt";

export async function handleBankerLogin(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        if (email !== process.env.BANKER_EMAIL as string) {
            res.status(400).json({ error: "User not found." });
            return;
        };

        if (password !== process.env.BANKER_PASSWORD as string) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }

        const user = await prismaClient.user.findUnique({
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
        }

        const token = createToken(payload);

        res.cookie("authToken", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.log(`Error in /api/auth/banker route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function handleUserSignUp(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const existingUser = await prismaClient.user.findUnique({
            where: {
                email,
            }
        });

        if (existingUser) {
            res.status(400).json({ error: "User alreay exist." });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = await prismaClient.user.create({
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

        const token = createToken(payload);

        res.cookie("authToken", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.log(`Error in /api/auth/sign-in route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function handleUserSignIn(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const existingUser = await prismaClient.user.findUnique({
            where: {
                email
            }
        });

        if (!existingUser) {
            res.status(400).json({ error: "User not found." });
            return;
        };

        const validPassword = await bcrypt.compare(password, existingUser.password);

        if (!validPassword) {
            res.status(400).json({ error: "Invalid email or password" });
            return;
        }

        const payload = {
            id: existingUser.id,
            email: existingUser.email,
            balance: existingUser.balance
        }

        const token = createToken(payload);

        res.cookie("authToken", token, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.log(`Error in /api/auth/sign-in route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function handleUserSignOut(req: Request, res: Response) {
    try {
        res.cookie("authToken", "", {
            maxAge: 0
        });

        res.status(200).json({ success: true })
    } catch (error) {
        console.log(`Error in /api/auth/sign-out route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function handleSendUserInfo(req: Request, res: Response) {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            res.status(400).json({ message: "Token not found" });
        }

        const validToken = verifyToken(token) as DataType;

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
            return
        }

        res.status(200).json({
            user: {
                id: validToken.id,
                email: validToken.email,
                balance: validToken.balance,
                banker: validToken.banker
            }
        });
    } catch (error) {
        console.log(`Error in /api/auth/me route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}