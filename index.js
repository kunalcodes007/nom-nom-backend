const cors = require("cors");
const express = require("express");
const app = express();
const mongodb = require("./db");
const corsOptions = {
  origin: "http://localhost:3000" // frontend URI (ReactJS)
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
