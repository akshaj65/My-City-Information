import app  from "./app.js";
import dotenv from "dotenv";
import database from "./config/database.js";

//handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(`Error: ${err.message}`);
    console.log("shutting down the server due to uncaught exception");
    process.exit(1);
});
// //config
// dotenv.config({ path: "config/.env" });

//Connecting to the database
database();


const server= app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
})

//unhandled Promise Rejection
process.on("unhandledRejection", err => {
    console.log(` Error :${err.message}`);
    console.log("shutting down the server due to unhandled promise rejection")
    server.close(() => {
        process.exit(1);
    })
})

