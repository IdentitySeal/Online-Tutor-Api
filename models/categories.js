const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectIdSchema = Schema.ObjectId;


const categorySchema = new Schema({
    // _id: String,
    title:{
        type:String},
    description: {
        type:String},
    subjects : [
        {type: mongoose.Schema.Types.ObjectId,
         ref: 'Subjects'}],
    // date: Date
},{
    timestamps: true
});


module.exports = mongoose.model('Category',categorySchema);


// const subjectSchema = new Schema({
//     _id: String,
//     title    : String,
//     description: String,
//     source : {type: mongoose.Schema.Types.ObjectId, ref: 'Categories'}

//     // category_id: {type: mongoose.Schema.Types.ObjectId,
//     // ref: 'Subjects'}
// },
//    { timestamps: true}

// )

// module.exports = mongoose.model('Subjects',subjectSchema);

