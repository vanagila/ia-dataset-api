import bcrypt from "bcrypt";

export const createBcryptAdapter = (salt) => {
    const generateHash = async (password) => {
        const hash = await bcrypt.hash(password, salt);
        return hash;
    };

    const matchesHash = async (password, hash) => {
        const matches = await bcrypt.compare(password, hash);
        return matches;
    };

    return {
        generateHash,
        matchesHash,
    };
};