import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";
dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        await connectDB();
        console.log("Server started successfully");
        app.on("error", (error) => {
            console.error(`Server error: ${error.message}`);
        });

        app.listen(process.env.PORT||8000,()=>{
            console.log(`Server is running on port ${process.env.PORT||8000}`);
        })
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
        process.exit(1);
    }
}

startServer();