const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' }
} , {
  toJSON: { virtuals: true }, // So `res.json()` and other `JSON.stringify()` functions include virtuals
  toObject: { virtuals: true } // So `console.log()` and other functions that use `toObject()` include virtuals
}, { timestamps: true });


personSchema.virtual("lessons",{
  ref:'Lesson',
  localField:'_id',
  foreignField:'person',
  justOne : false
})

const person = mongoose.model('Person', personSchema, 'persons')

module.exports = person;