import { Request, Response } from "express";
import { DataType, verifyToken } from "../_lib/jwt";
import { prismaClient } from "../_lib/prismaClient";

export async function handleGiveAllUsers(req: Request, res: Response) {
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

        if (!validToken.banker) {
            res.status(400).json({ error: "You can't access this route" });
            return;
        };

        const allUsers = await prismaClient.user.findMany();

        res.status(200).json({ success: true, allUsers });

    } catch (error) {
        console.log(`Error in /api/bank/users route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}

export async function handleGetUserInfo(req: Request, res: Response) {
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

        if (!validToken.banker) {
            res.status(400).json({ error: "You can't access this route" });
            return;
        };

        const { userId } = req.body;

        const userAllInfo = await prismaClient.user.findUnique({
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
    } catch (error) {
        console.log(`Error in /api/bank/get-user-info route ${error}`);
        res.status(500).json({ error: "Internal server error" });
    }
}