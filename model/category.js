const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
    name: {
        type: String
    },
    description: {
        type: String,
    },
    subjects: [{
        type: Schema.Types.ObjectId,
        ref: 'Subjects'
    }],

});
// Schema.method("toJSON", function() {
//     const { __v, _id, ...object } = this.toObject();
//     object.id = _id;
//     return object;
// });


module.exports = mongoose.model('Category', categorySchema)