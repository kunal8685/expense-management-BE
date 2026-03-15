import express from "express";

const app = express();

app.get('/',(req,res)=>{
    res.send("welcome to expense managment syastem")
})

app.listen(8000,()=>{
    console.log("app is listening at port 8000")
})