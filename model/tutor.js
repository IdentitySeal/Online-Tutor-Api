const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for the student
const tutorSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    category: {
        type: Schema.Types.String,
        ref: 'Category'
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subject'
    }],

}, { timestamps: true });





module.exports = mongoose.model('Tutor', tutorSchema);