var express = require("express");

var app = express();

const url = 'mongodb+srv://andry:andry@cluster0.pkqfu.mongodb.net/'
const dbName = 'nodetp';
const person = require('./models/person.js')
const mongoose = require('mongoose');

mongoose.connect(url + dbName, { useNewUrlParser: true, useUnifiedTopology: true });

db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log("connecté à Mongoose")
});

app.use(express.static("public"));
app.use(express.json())

app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(3000);

app.get("/", function (request, response) {

    response.render("home");
});

app.get("/create", function (request, response) {

    response.render("create");
});

app.put("/personne", function (request, response) {

    const firstName = request.body.firstName;
    const lastName = request.body.lastName;

    const newperson = {
        firstName: firstName,
        lastName: lastName
    }

    if(!firstName || !lastName)
    {
        response.status(403).send({ result: "not_ok", data:"error parameters" })
    }

    person.create(newperson).then(r => {
        response.status(200).send({ result: "ok", data: newperson })
    })
        .catch(err => {
            response.status(403).send({ result: "not_ok", data: err })
        })

})

app.get('/personne/:id',function(request,response){
    const id = request.params.id;

    if(!id){
        response.status(403).send({ result: "not_ok", data:"error id" })
    }

    person.findById(id).then(res=>{
        console.log(res)
       // response.status(200).send({ result: "ok", data: res })
        response.status(200).render("edit",res)
    })
    .catch(err=>{
        response.status(403).send({ result: "not_ok", data:err })
    })

})

app.patch("/personne/:id",function (request,response){
    
    const id = request.params.id;

    const firstName = request.body.firstName;
    const lastName = request.body.lastName;

    const _person = {
        firstName: firstName,
        lastName: lastName
    }

    person.findByIdAndUpdate(id,_person).then(res=>{
        response.status(200).send({ result: "ok", data: res })
    })
    .catch(err=>{
        response.status(403).send({ result: "not_ok", data:err })
    })

})

app.get('/personnes',function(request,response){
    person.find().then(res=>{
        console.log(res)
        response.render("list",{tab : res})
    })
    .catch(err=>{
        response.status(403).send({ result: "not_ok", data:err })
    })
})

app.delete('/personne/:id',function(request,response){

    const id = request.params.id;

    person.findByIdAndDelete(id).then(res=>{
        response.status(200).send({ result: "ok", data: res })
    })
    .catch(err=>{
        response.status(403).send({ result: "not_ok", data:err })
    })
})