const mongoose = require('mongoose');
const { Schema } = mongoose;

const notes = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        requried: true,
    },
    description: {
        type: String,
        requried: true,
    },
    tag: {
        type: String,
        default: "Genral"
    },
    date: {
        type: Date,
        default: Date.now
    }


});

const Notes = mongoose.model("Notes", notes);
Notes.createIndexes();

module.exports = Notes;