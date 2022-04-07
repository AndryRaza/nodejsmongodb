var express = require('express');
var router = express.Router();

const person = require('../models/person')
const teacher = require('../models/teacher');
const lesson = require('../models/lesson');
var mongoose = require('mongoose');

router.get("/create", function (request, response) {

     teacher.find()
        .then(res=>{
            lesson.find().then(res_=>{
                response.render("create",{tab : res,lessons : res_});
            })
        })

});

router.put("/personne", function (request, response) {

    const firstName = request.body.firstName;
    const lastName = request.body.lastName;
    const teacher = request.body.teacher || null;
    const lessonName = request.body.lessonName || null; 

    const newperson = {
        firstName: firstName,
        lastName: lastName,
        teacher : teacher
    }

    if(!firstName || !lastName)
    {
        response.status(403).send({ result: "not_ok", data:"error parameters" })
    }

    person.create(newperson).then(r => {
        if(!lessonName || lessonName=="")
        {
            response.status(200).send({result:"ok",data:r})
        }
        else{
            const assign = {
                name : lessonName,
                person : mongoose.Types.ObjectId(r.id)
            }
            lesson.create(assign)
                .then(res=>{
                    response.status(200).send({result:"ok",data:res})
                })
                .catch(err=>{
                    response.status(403).send({result:"not_ok_lesson",data:err})
                })
        }
      
    })
        .catch(err => {
            response.status(403).send({ result: "not_ok_person", data: err })
        })

})

router.get('/personne/:id',function(request,response){
    const id = request.params.id;

    if(!id){
        response.status(403).send({ result: "not_ok", data:"error id" })
    }

    person.findById(id)
        .populate('teacher')
        .then(res=>{
            teacher.find().then(res_ =>{
                response.status(200).render("edit",{person : res, teachers : res_})
            })
        //response.send(res)

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