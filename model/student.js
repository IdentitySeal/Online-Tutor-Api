const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Schema for the student
const studentSchema = new Schema({
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
    email: {
        type: String,
        unique: true,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
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





module.exports = mongoose.model('Student', studentSchema);