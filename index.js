const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv").config();
const mongodb = require("mongodb");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {v4:uuidv4}=require("uuid")
const mongoClient = mongodb.MongoClient;

const URL = process.env.DB;
const SECRET = process.env.SECRET;

//const URL ="mongodb+srv://PRAKASH7708:<>@cluster0.2n5s99z.mongodb.net/?retryWrites=true&w=majority";
app.use(express.json());
app.use(
  cors({
    origin: "*",
  })
);



app.post("/register", async function (req, res) {
    try {
      const connection = await mongoClient.connect(URL);
      const db = connection.db("vivirti");
      await db.collection("users").insertOne(req.body);
      await connection.close();
       let message=req.body
      res.json({
        message
      });
    } catch (error) {
      res.status(500).json({
        message: "Error",
      });
    }
});

app.put("/:id", async function (req, res) {
  //console.log(req.body.Firstname)
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("vivirti");
    let newname=req.body.Firstname
    await db.collection("users").updateOne({_id:mongodb.ObjectId(req.params.id)},{$set:{Firstname:`${newname}`}});
    let updated_data=await db.collection("users").findOne({_id:mongodb.ObjectId(req.params.id)});
    await connection.close();
    res.json({
      updated_data
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
});
 

app.delete("/:id", async function (req, res) {
  //console.log(req.body.Firstname)
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("vivirti");
    await db.collection("users").deleteOne({_id:mongodb.ObjectId(req.params.id)})
    await connection.close();
    res.json({
      Message:"User Deleted Successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
});

app.get("/list", async function (req, res) {
  //console.log(req.body.Firstname)
  try {
    const connection = await mongoClient.connect(URL);
    const db = connection.db("vivirti");
    let Employeelist=await db.collection("users").find().toArray()
    await connection.close();
    let average=Employeelist.length
    res.json({
      average,
      Employeelist
    });
  } catch (error) {
    res.status(500).json({
      message: "Error",
    });
  }
});

app.listen(process.env.PORT || 3001);