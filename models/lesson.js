const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    person: {
        type: Schema.Types.ObjectId,
        ref: 'Person'
    }
},
    {
        toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
        toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
    }, { timestamps: true })

const lesson = mongoose.model('Lesson', lessonSchema, 'lessons');

module.exports = lesson