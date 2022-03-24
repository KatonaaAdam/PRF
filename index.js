
// Importing http module
const express = require("express")

const app=express();

const port = process.env.PORT || 3000;  


app.get('/',(req,res)=>{
    res.send('My site!')
})
  
// Executing the server
app.listen(port,()=>{
    console.log("Server is Running!!! ");
})