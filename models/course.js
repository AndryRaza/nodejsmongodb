const { Timestamp } = require('mongodb');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    name:{
        type:String,
        required:true
    },
    person:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Person',
        required:true
    }
}, { timestamps: true })

const course = mongoose.model('Course',courseSchema,'courses');

module.exports = course