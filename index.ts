import express from "express";
import dotenv from "dotenv"
dotenv.config();

const PORT = process.env.PORT;
const app = express();

app.use(express.json())

app.listen(PORT,()=>{
    console.log(`app is listening at port http://localhost:${PORT}`)
})