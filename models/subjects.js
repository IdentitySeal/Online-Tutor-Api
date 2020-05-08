const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectIdSchema = Schema.ObjectId;




const subjectSchema = new Schema({
    // _id: String,
    title: String,
    description: String,
    category : {type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category'},
    tutor:{type: mongoose.Schema.Types.ObjectId,
        ref :'Tutor'},
    

},
   { timestamps: true}

)

module.exports = mongoose.model('Subjects',subjectSchema);

