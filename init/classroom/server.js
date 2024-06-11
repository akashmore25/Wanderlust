const express = require("express");
const app =  express();

const session = require("express-session");

const sessionOptions ={
    secret: "mysupersecretstring",
    resave: false,
    saveUninitialized: true,
};

app.use(session(sessionOptions));


app.get("/register",(req,res)=>{
    const {name="anonymous"} = req.query;
     req.session.name = name;
     res.redirect("/Home");
     
})

app.get("/Home", (req,res)=>{
    res.send(`welcome , ${req.session.name}`);
});



app.listen(8080,()=>{
    console.log("listning on port 8080!")
})