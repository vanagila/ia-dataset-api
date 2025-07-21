import jwt from "jsonwebtoken";

export const createJwtAdapter = (secret, expireIn) => {
    const generateToken = (data) => {
        const token = jwt.sign(data, secret, {
        expiresIn: expireIn,
        });
        return token;
    };

    const decodeToken = (token) => {
        try {
            const data = jwt.verify(token, secret);
            return data;
        } catch (error) {
            return undefined
        }
    };

    return {
        generateToken,
        decodeToken,
    };
};