var express = require('express');
var router = express.Router();

const lesson = require('../models/lesson');
const person = require('../models/person');


router.get('/',function(request,response){
    lesson.find({person : null})
        .then(res=>{
            person.find()
            .then(res_=>{
                response.render('assignLesson',{lessons:res,persons:res_})
            })
            .catch(err=>{
                response.status(404).send({result:"not_ok",data:err})
            })
        })
        .catch(err=>{
            response.status(404).send({result:"not_ok",data:err})
        })
})

router.put('/',async function(request,response){
    const personId = request.body.personId;
    const lessonName = request.body.lessonName;

    if(!personId ||!lessonName)
    {
        response.status(403).send({result:'not_ok',data:'error parameters missing'})
    }

    const assign = {
        name : lessonName,
        person : personId
    }

    const exist = await lesson.findOne(assign).lean().exec();

    if(!exist)
    {
        lesson.create(assign)
        .then(res=>{
            response.status(200).send({result:"ok",data:res})
        })
        .catch(err=>{
            response.status(403).send({result:"not_ok",data:err})
        })
    }

    else{
        response.status(403).send({result:"not_ok",data:'already registered '})
    }
})



module.exports = router;