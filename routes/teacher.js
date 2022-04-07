var express = require('express');
var router = express.Router();

const teacher = require('../models/teacher');
const lesson = require('../models/lesson')
router.get('/', function (request, response) {
    teacher.find()
        .populate({
            path: 'persons',
            populate: { 
                path: 'lessons' }
        })
        .then(res => {
            response.render('listTeacher', { tab: res })
        })
        .catch(err => {
            response.status(403).send({ result: 'not_ok', data: err })
        })

})

router.get('/:id', function (request, response) {
    const id = request.params.id;

    if (!id) {
        response.status(403).send({ result: 'not_ok', data: 'No id paramater' })
    }
    teacher.findById(id)
        .populate('persons')
        .then(res => {
            response.status(200).send({ result: 'ok', data: res })
        })
        .catch(err => {
            response.status(403).send({ result: 'not_ok', data: err })
        })
})

module.exports = router;