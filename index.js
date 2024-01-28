import express from "express";
import mysql from "mysql"

const app = express()

const db = mysql.createConnection ({
    host:"localhost",
    user:"root",
    password:"alexandru95",
    database:"test"
})

app.get("/",(req,res) =>{
    res.json("hello im ovidiu")
})


app.get("/movies", (req,res) => {
    const q = "SELECT * FROM test.movies"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/movies", (req,res) =>{
    const q = "Insert into Movies('title','desc','cover') VALUES(?)"
    const values = ("title1","desc1","cover")

    db.query(q,[values], (err,data) =>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.listen(8000,() => {
    console.log("Connected to backend")
})