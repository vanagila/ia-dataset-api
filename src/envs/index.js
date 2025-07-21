import "dotenv/config";

export const envs = {
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DDATABASE_URL,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN,
    BCRYPT_SALT: process.env.BCRYPT_SALT
}