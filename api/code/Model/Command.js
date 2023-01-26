const mongoose = require('mongoose');

var Schema = mongoose.Schema;

const CommandSchema = new Schema({
  name: String,
  flag: Number,
})

const Command = mongoose.model('Command', CommandSchema)

module.exports = {
    Command,
    CommandSchema
}