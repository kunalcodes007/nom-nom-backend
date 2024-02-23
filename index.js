const cors = require("cors");
const express = require("express");
const app = express();
const mongodb = require("./db");
const {CreateProxyMiddleware}=require('http-proxy-middleware');
const corsOptions = {
  origin: "https://nomnom-frontend.vercel.app" ,
  credentials: true,
}
app.use(cors(corsOptions));

// app.use((req, res, next) => {
//     res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//     res.header(
//       "Access-Control-Allow-Headers",
//       "Origin, X-Requested-With, Content-Type, Accept"
//     );
//     next();
//   });
// app.use(cors({
//     origin:["https://nomnom-frontend.vercel.app"],
//     methods:["GET","POST"],
//     credentials:true,
// }))

// app.use((req,res,next)=>{
//     res.setHeader('Access-Control-Allow-Origin','https://nomnom-frontend.vercel.app');
//     res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept','HTTP/1.1 200 ok');
//     next();
// })

module.exports=function(app){
  app.use('/api', CreateProxyMiddleware({ target: 'https://nomnom-frontend.vercel.app', changeOrigin: true }));
}

app.use(express.json());
app.use("/api", require("./Routes/create-user"));
app.use("/api", require("./Routes/display-data"));
mongodb();
app.get("/", (req, res) => {
  res.send("hello devloper");
});

app.listen("3000",()=>{
  console.log("Server has started")
})
