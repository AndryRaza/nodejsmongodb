const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teacherSchema = new Schema({
    name: {
        type: String,
        required: true
    }
},
    {
        toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
        toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
    }
    , { timestamp: true }
)

teacherSchema.virtual('persons', {
    ref: 'Person',
    localField: '_id',
    foreignField: 'teacher',
    justOne: false
});

const teacher = mongoose.model('Teacher', teacherSchema, 'teachers');

module.exports = teacher;