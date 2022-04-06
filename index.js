var express = require("express");

var app = express();

const url = 'mongodb+srv://andry:andry@cluster0.pkqfu.mongodb.net/'
const dbName = 'nodetp';
const person = require('./models/person.js')
const mongoose = require('mongoose');

mongoose.connect(url+dbName, {useNewUrlParser: true, useUnifiedTopology: true});

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("connecté à Mongoose")
});

app.use(express.static("public"));
app.use(express.json())

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);

app.get("/", function(request, response)  {
   
    response.render("home");
});

app.get("/create", function(request, response)  {
   
    response.render("create");
});



app.put("/personne",function(request,response){
    
    const firstName = request.body.firstName;
    const lastName = request.body.lastName;

    const newperson = {
        firstName : firstName,
        lastName : lastName
    }

    person.create(newperson).then(r =>{
        response.status(200).send({"result": "ok","data":newperson})
    })
    .catch(err=>{
        response.status(403).send({"result": "not_ok","data":newperson})
    })

})

