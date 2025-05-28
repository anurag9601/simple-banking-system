import { Request, Response } from "express";
import { createToken, DataType, verifyToken } from "../_lib/jwt";
import { prismaClient } from "../_lib/prismaClient";

export async function handleDepositMoney(req: Request, res: Response) {
    try {
        const { amount } = req.body;

        const token = req.cookies.authToken;

        if (!token) {
            res.status(400).json({ error: "Invalid request" });
            return;
        }

        const validToken = verifyToken(token) as DataType;

        if (!validToken) {
            res.status(400).json({ error: "Invalid user" });
            return;
        }

        const transaction = await prismaClient.transaction.create({
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

        const updatedUser = await prismaClient.user.update({
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
        }

        const newToken = createToken(payload);

        res.cookie("authToken", newToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ success: true, user: payload, transaction })

    } catch (error) {
        console.log(`Error in /api/money/deposit route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function handleWithdrawMoney(req: Request, res: Response) {
    try {
        const { amount } = req.body;

        const token = req.cookies.authToken;

        if (!token) {
            res.status(400).json({ error: "Invalid request" });
            return;
        }

        const validToken = verifyToken(token) as DataType;

        if (!validToken) {
            res.status(400).json({ error: "Invalid user" });
            return;
        }

        const transaction = await prismaClient.transaction.create({
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

        const updatedUser = await prismaClient.user.update({
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
        }

        const newToken = createToken(payload);

        res.cookie("authToken", newToken, {
            httpOnly: true,
            maxAge: 60 * 60 * 1000,
        });

        res.status(200).json({ success: true, user: payload, transaction })

    } catch (error) {
        console.log(`Error in /api/money/withdraw route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function handleGiveAllTheTransactions(req: Request, res: Response) {
    try {
        const token = req.cookies.authToken;

        if (!token) {
            res.status(400).json({ error: "Invalid request" });
            return;
        }

        const validToken = verifyToken(token) as DataType;

        if (!validToken) {
            res.status(400).json({ error: "Invalid user" });
            return;
        }

        const allTransactions = await prismaClient.user.findUnique({
            where: { id: validToken.id },
            select: {
                id: true,
                email: true,
                transactions: true 
            }
        });

        res.status(200).json({ success: true, allTransactions })
    } catch (error) {
        console.log(`Error in /api/money/transaction/all route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}