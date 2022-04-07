const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  teacher: { type: Schema.Types.ObjectId, required: true, ref: 'Teacher' }
}, { timestamps: true });


const person = mongoose.model('Person', personSchema, 'persons')

module.exports = person