var express = require('express');
var router = express.Router();

const teacher = require('../models/teacher');

router.get('/all',function(request,response){
    teacher.find()
        .then(res=>{
            response.status(200).send({result:'ok',data:res})
        })
        .catch(err=>{
            response.status(403).send({result:'not_ok',data:err})
        })

})

router.get('/find/:id',function(request,response){
    const id = request.params.id;

    if(!id)
    {
        response.status(403).send({result:'not_ok',data:'No id paramater'})
    }
    teacher.findById(id)
        .then(res=>{
            response.status(200).send({result : 'ok',data:res})
        })
        .catch(err=>{
            response.status(403).send({result:'not_ok',data:err})
        })
})

module.exports = router;