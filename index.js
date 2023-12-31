require('dotenv').config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: process.env.HOST,
    user: process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/api/get", (req, res) => {
    const sqlGet = "Select * FROM personaltask_db";
    db.query(sqlGet, (error, result)=>{
        res.send(result);
    });
});

app.post("/api/post", (req, res) => {
    const{task, discription} = req.body;
    const sqlInsert = "INSERT INTO personaltask_db(task, discription) VALUES (?, ?)";
    db.query(sqlInsert, [task, discription], (error, result) => {
        if(error){
            console.log(error);
        }
    })
})

app.delete("/api/remove/:id", (req, res) => {
    const{ id } = req.params;
    const sqlRemove = "DELETE FROM personaltask_db WHERE id = ?";
    db.query(sqlRemove, id, (error, result) => {
        if(error){
            console.log(error);
        }
    })
})

app.get("/api/get/:id", (req, res) => {
    const {id} = req.params;
    const sqlGet = "Select * FROM personaltask_db where id = ?";
    db.query(sqlGet,id,  (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:id", (req, res) => {
    const { id } = req.params;
    const {task, discription} = req.body;
    const sqlUpdate = "UPDATE personaltask_db SET task = ?, discription = ? WHERE id = ? ";
    db.query(sqlUpdate, [task, discription, id],  (error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.listen(process.env.PORT, () => {
    console.log("Server is running on port 5000");
});
