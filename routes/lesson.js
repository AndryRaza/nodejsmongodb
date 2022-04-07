var express = require('express');
var router = express.Router();

const lesson = require('../models/lesson')

router.put('/assign',function(request,response){
    const personId = request.body.personId;
    const lessonName = request.body.lessonName;

    if(!personId ||!lessonId)
    {
        response.status(403).send({result:'not_ok',data:'error parameters missing'})
    }

    const assign = {
        name : lessonName,
        person : personId
    }

    lesson.create(assign)
        .then(res=>{
            response.status(200).send({result:"ok",data:res})
        })
        .catch(err=>{
            response.status(403).send({result:"not_ok",data:err})
        })
})



module.exports = router;