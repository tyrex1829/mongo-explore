const express = require("express");
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose");
const jwtPassword = "123456";

const app = express();
app.use(express.json());

mongoose.connect("mongodb+srv://tyrex:pass@cluster0.znn3qjq.mongodb.net/userappnew");

const User = mongoose.model("Users", {
    name: String,
    email: String,
    password: String
});

// // function 

app.post("/signup", async(req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const name = req.body.name;

    const existingUser = await User.findOne({ email: username });

    if(existingUser){
        return res.status(400).send("Username already exists");
    }

    const user = new User({
        name: name,
        email: username,
        password: password
    });
    
    user.save();
    res.json({
        msg: "User created successfully"
    })
})

app.listen(3000);