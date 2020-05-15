const Category = require("../model/category");
const Subject = require("../model/subject");

let SubjectController = {
    // //create a subject 
    create: async(req, res) => {

        const { title, description } = req.body;

        const cat = await Category.findById(req.params.categoryId);

        // Create subject
        const subject = await Subject.create({
            title,
            description,
            category: req.params.categoryId,
        });

        res.status(201).json({ success: true, data: subject });
    },
    getAllSubjectCategoryById: async(req, res) => {
        const subjects = await Subject.find({ category: req.params.categoryId })
            .populate('category', '-_id -description -__v -createdAt');

        res.status(200).json({ success: true, data: subjects });
    },
    getSubjectCategoryById: async(req, res) => {
        const subject = await Subject.findOne({
            _id: req.params.subjectId,
            category: req.params.categoryId,
        }).populate('category', '-_id -description -__v -createdAt');

        res.status(200).json({ succes: true, data: subject });

    },
    searchSubjectInCategory: async(req, res) => {
        const { title } = req.query;
        const searchSubject = await (await Subject.find({ $text: { $search: title } }))
            .sort({ title: 1 })
        res.status(200).json({ success: true, data: searchSubject });

    },
    deleteSubjectInCategoryById: async(req, res) => {
        let foundDelete = await Subject.findByIdAndDelete(req.params.subjectId)
        res.send({ status: true, message: 'deleted sucessfully', foundDelete });

    },
    updateSubjectByCategoryId: async(req, res) => {
        //2) Admin can update a subject in a category (by Id)
        const { title, description } = req.body;
        const subjectField = {
            title,
            description,
            category: req.params.categoryId

        };

        let foundUpdate = await Subject.findByIdAndDelete(req.params.subjectId, subjectField, { useFindAndModify: false, new: true })
            .populate('category')
        foundUpdate.save();
        res.json(foundUpdate);
        // console.log(foundUpdate);
    }







    // const subject = new Subject(req.body)
    // const savedCategory = new Category({
    //     name: req.body.name,
    //     description: req.body.description,
    //     subjects: req.params._id

    // })
    // savedCategory.subjects.push(subject);
    // await savedCategory.save();

    // const newSubjectInCategory = Subject.find({})
    //     .populate('category');
    // console.log(newSubjectInCategory)

    // res.status(201).json({ success: true, data: newSubjectInCategory });



    // newSubjectInCategory.save()
    // res.json(newSubjectInCategory)
    // const { categoryId } = req.param;
    // //create a new subject 
    // const newSubject = new Subject(req.body);
    // const category = await Category.findById(categoryId);

    // //Assign category as subject seller
    // newSubject.category = category;
    // await newSubject.save();
    // category.subjects.push(newSubject);
    // await category.save();

    // res.send(subject)


    // //create a subject 
    // create: async(req, res) => {
    //     const { title, description } = req.body;
    //     const subject = await Subject.create({
    //         title,
    //         description,
    //         category: req.params.categoryId
    //     });
    //     await subject.save();
    //     // const newSubject = await Category.findByIdAndUpdate({ _id: req.body.id }, { $push: { subjects: subject._id } }, { useFindAndModify: false, new: true })
    //     // { useFindAndModify: false, new: true });
    //     res.send(subject)

    // },
    // getSubject: async(req,res) =>{
    //     const find = await Subject
    // },
    // getAllSubjectCategoryById: async(req, res) => {
    //     const subjects = await Subject.find({ category: req.params.categoryId }).populate(
    //         'category'
    //     );

    //     res.status(200).json({ success: true, data: subjects });
    // },
    // // categoryBysubject: async(req, res) => {
    // //     const { _id } = req.body;
    // //     const categoryBysubject = await Subjects.find({ subject: req.body._id }).populate('category');
    // //     res.send(categoryBysubject);
    // // },
    // updateSubjectByCategoryId: async(req, res) => {
    //     //2) Admin can update a subject in a category (by Id)
    //     const { name, description } = req.body;
    //     const fieldToUpdate = {
    //         name,
    //         description,
    //         category: req.params.categoryId

    //     };

    //     let foundUpdate = await Category.findById(req.params.subjectId, { $push: { subjects: fieldToUpdate._id } }, { useFindAndModify: false, new: true })
    //         // { useFindAndModify: false, new: true });)
    //         .populate("subjects");
    //     foundUpdate.save();
    //     res.json(foundUpdate);
    //     // console.log(foundUpdate);
    // },
    // deleteSubjectByCategoryId: async(req, res) => {

    //     let foundDelete = await Subject.findByIdAndDelete({ _id: req.params.subject._id })
    //         // .populate("subjects");
    //     res.send({ status: true, message: 'deleted sucessfully', foundDelete });
    // },


}
module.exports = SubjectController;