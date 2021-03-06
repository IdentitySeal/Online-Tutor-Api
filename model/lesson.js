const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
    subjects: {
        type: Schema.Types.String,
        ref: 'Subjects'
    },
    category: {
        type: Schema.Types.String,
        ref: 'Category'
    },
    tutor: {
        type: Schema.Types.String,
        ref: 'Tutor'
    },


}, { timestamps: true });

module.exports = mongoose.model('Lesson', lessonSchema);