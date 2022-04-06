const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    firstName:  String,
    lastName: String
  });

const person = mongoose.model('Person', personSchema,'persons')

module.exports = person