const cors = require("cors");
const express = require("express");
const app = express();
const mongodb = require("./db");

app.use(cors({
    origin:["https://nomnom-frontend.vercel.app"],
    methods:["GET","POST"],
    credentials:true,
}))

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','https://nomnom-frontend.vercel.app');
//     res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept','HTTP/1.1 200 ok');
//     next();
// })

app.use(express.json());
app.use("/api", require("./Routes/create-user"));
app.use("/api", require("./Routes/display-data"));
mongodb();
app.get("/", (req, res) => {
  res.send("hello devloper");
});
