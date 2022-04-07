const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

teacherSchema.virtual('persons', {
    ref: 'Person',
    localField: '_id',
    foreignField: 'teacher',
    justOne: false
});

const teacher = mongoose.model('Teacher', teacherSchema, 'teachers');

module.exports = teacher;