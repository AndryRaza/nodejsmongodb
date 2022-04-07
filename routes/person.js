var express = require('express');
var router = express.Router();

const person = require('../models/person')

router.get("/create", function (request, response) {

    response.render("create");
});

router.put("/personne", function (request, response) {

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

router.get('/personne/:id',function(request,response){
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

router.patch("/personne/:id",function (request,response){
    
    const id = request.params.id;

    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const teacher = request.body.teacher;

    const _person = {
        firstName: firstName,
        lastName: lastName,
        teacher : teacher
    }

    person.findByIdAndUpdate(id,_person).then(res=>{
        response.status(200).send({ result: "ok", data: res })
    })
    .catch(err=>{
        response.status(403).send({ result: "not_ok", data:err })
    })

})

router.get('/personnes',function(request,response){
    person.find().then(res=>{
        response.render("list",{tab : res})
    })
    .catch(err=>{
        response.status(403).send({ result: "not_ok", data:err })
    })
})

router.delete('/personne/:id',function(request,response){

    const id = request.params.id;

    person.findByIdAndDelete(id).then(res=>{
        response.status(200).send({ result: "ok", data: res })
    })
    .catch(err=>{
        response.status(403).send({ result: "not_ok", data:err })
    })
})

module.exports = router;