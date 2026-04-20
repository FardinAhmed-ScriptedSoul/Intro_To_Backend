import express from "express";


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes to imported here

import userRoutes from "./routes/user.route.js";
//routing direction
app.use("/api/v1/users", userRoutes);
//example route: http://localhost:3000/api/v1/users/register
export default app;