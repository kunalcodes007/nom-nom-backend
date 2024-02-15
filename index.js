const express=require('express');
const app=express();
const mongodb=require('./db');
var cors = require('cors')

app.use(cors({
    origin:'https://nomnom-frontend.vercel.app',
    methods:'GET,POST,PUT,DELETE',
    credentials:true
}));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','https://nomnom-frontend.vercel.app');
    res.header('Access-Control-Allow-Headers','Origin,X-Requested-With,Content-Type,Accept');
    next();
})

app.use(express.json());
app.use('/api',require('./Routes/create-user'));
app.use('/api',require('./Routes/display-data'));

mongodb();
app.listen(5000,()=>{
    console.log('Server on port 5000')
})

app.get('/',(req,res)=>{
    res.send('hello devloper')
})