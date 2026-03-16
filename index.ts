import express from "express";
import dotenv from "dotenv"
import mainRouter from "./routes/mainRouter"
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json())

app.use("/api/v1",mainRouter)

app.listen(PORT,()=>{
    console.log(`app is listening at port http://localhost:${PORT}`)
})