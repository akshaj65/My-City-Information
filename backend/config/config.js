import dotenv from "dotenv";

dotenv.config({ path: "config/.env" });

export default{
    PORT:process.env.PORT || 5000,
    MONGODB_URL:process.env.MONGODB_URL,
    JWT_SECRET:process.env.JWT_SECRET,
    JWT_EXPIRE:process.env.JWT_EXPIRE,
    COOKIE_EXPIRE:process.env.COOKIE_EXPIRE

}