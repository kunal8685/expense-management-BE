import express from "express";

const PORT = process.env.PORT;
const app = express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.send("welcome to expense managment syastem")
})

app.listen(PORT,()=>{
    console.log(`app is listening at port http://localhost:${PORT}`)
})