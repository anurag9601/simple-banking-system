import jwt from "jsonwebtoken";

export interface DataType {
    id: number,
    email: string,
    balance: number,
    banker?: boolean
}

export function createToken(data: DataType) {
    const token = jwt.sign(data, process.env.JWT_SECRET as string, {
        expiresIn: "1d"
    });

    return token;
};

export function verifyToken(token: string) {
    const validTokenStatus = jwt.verify(token, process.env.JWT_SECRET as string);

    return validTokenStatus;
}