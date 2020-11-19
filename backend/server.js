const http = require('http');
const express = require('express');

const cors = require('cors');
const app = express();

const server = http.createServer(app);
var mongoose = require('mongoose');
require('dotenv').config();
var bodyParser = require('body-parser')

// require("./models/user");



app.use(cors());
// mongodb connection 

try{

const uri = "mongodb+srv://admin:1234@cluster0.09j4d.mongodb.net/Matches?retryWrites=true&w=majority";
//const uri = "mongodb+srv://admin:1234@cluster0.d1cpf.mongodb.net/chat?retryWrites=true&w=majority";   
    mongoose.connect(uri, { useUnifiedTopology: true ,useNewUrlParser: true, useCreateIndex: true }
      );
      const connection = mongoose.connection;
      connection.once('open', () => {
        console.log("MongoDB database connection established successfully");
      });
    
    }catch (err) {
        console.error(err.message);
    }
  
    app.use(bodyParser.urlencoded({ extended: false }))

    // parse application/json
    app.use(bodyParser.json())

  

app.use("/api", require("./routes/router"));


var datetime = new Date();
console.log(datetime.toISOString().slice(0,10));

var time = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
console.log(time.slice(11))




app.use((req , res , next)=>{
  res.status(503).send("site is currently down , try later");
 })

 server.listen(8088);







// const Message = mongoose.model("Message");
// const User = mongoose.model("User");
// const chat = mongoose.model("Chatroom")













