const mongoose = require('mongoose');
const Schema = mongoose.Schema;




const subjectSchema = new Schema({
        title: String,
        description: String,
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Category'
        },

        // tutor: {
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: 'Tutor'
        // },

    }, { timestamps: true }

)

module.exports = mongoose.model('Subject', subjectSchema);