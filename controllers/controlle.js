const Category = require("../models/categories");
const Subject = require("../models/subjects");
const Tutor = require("../models/tutors");



// let SubjectsController = {
//   find :async(req,res) => {
//     let found = await Subjects.find({title :req.params.title})
//     res.json(found)
//   },
//   create: async(req,res) => {
//     let newSubject = new Subjects(req.body);
//     let savedSubject = await newSubject.save();
//     res.json(savedSubject);
//   }
// }

let CategoryController = {
  // find: async(req,res) => {
  //   let found = await Category.find({category : req.body.category});
  //   res.json(found)
  // },

  //3
  findAll: async (req,res) => {
    const allCategory = await Category.find();
    res.json(allCategory);
  },

  //1
  getAllSubjectById: async (req,res) => {
    const { id } = req.params;

    let foundCategory = await Category.findById(id)
    .populate("subjects");
    res.json(foundCategory.subjects);
  },

  //2
  getAllSubject: async (req,res) => {
    let foundCategory = await Category.find({})
    .populate("subjects");
    res.json(foundCategory.subjects);
  },

  //4//
   getAllSubjectName: async (req,res) => {
    let foundCategory = await Subject.find({})
    res.json(foundCategory);
  },
  // getAllTutorName: async (req,res) => {
  //   let foundCategory = await Tutor.find({})
  //   res.json(foundCategory);
  // }

  //ADMIN
  //1
  create: async(req,res) => {
    console.log(req.params);
    const {title,description} = (req.body);
    let savedCategory = await Category.create({
      title,
      description
    });
    savedCategory.save();
    res.json(savedCategory);
  },
//2
  updateSubjectByCategoryId: async (req, res)=>{
    const { subject } = req.body;

    let foundUpdate = await Subject.findByIdAndUpdate({ _id: req.params.id }, { $set: { subject } })
    .populate("subjects");
    res.json(foundUpdate);
  },
  //3
  deleteSubjectByCategoryId: async (req, res)=>{

    let foundDelete = await Subject.findByIdAndDelete({ _id: req.params.id })
    .populate("subjects");
    res.json(foundDelete);
  },

  //4
  deleteCategory: async (req, res)=>{

    let CateDelete = await Subject.deleteMany({ category: req.params.category })
    .populate("subjects");
    res.json(CateDelete);
  },
  //5
  findAllTutor: async (req,res) => {
    const tutor = await Tutor.find();
    res.json(tutor);
  },
  //6
  findTutorById: async(req,res) => {
    let found = await Tutor.find({_id : req.body._id});
    res.json(found)
  },

  //7
  deactivateTutorById: async (req, res)=>{

    let foundDelete = await Tutor.findByIdAndDelete({ _id: req.params.id })
    .populate("subjects");
    res.json(foundDelete);
  },
}

module.exports = CategoryController;
// module.exports = SubjectsController;





// exports.categorySubjects = (req, res) => {
//     const subject = new Subjects();
//     subject._id = req.body._id;
//     subject.title = req.body.title;
//     subject.description = req.body.description;
//     subject.source = req.body.source;

//     // subject.category_id = req.body.category_id._id;
//     subject.save()
//     .then((subject) => {
//       res.json({ message: 'Subject created!', subject });
//   })
//  @stop
      // .then((result) => {
      //   Subjects.findOne( req.body.category_id._id , (err, user) => {
      //       if (user) {
      //           // The below two lines will add the newly saved review's 
      //           // ObjectID to the the User's reviews array field
      //           // user.push(req.body.category_id._id);
      //           user.save();
      //           res.json({ message: 'subject created!' });
      //       }
      //   });
      // })
      //@stop
//       .catch((error) => {
//         res.status(500).json({ error });
//       });
// };

// subject.username = req.body.username;
//     subject.rating = req.body.rating;
//     subject.body = req.body.body;
//     subject.save()

// exports.categories = (req, res) => {
//     const category = new Categories();
//     category._id = req.body._id;
//     category.category = req.body.category;
//     category.description = req.body.description;
//     category.subjects = req.body.subjects;
//     // category.date = Date.now()ss
//     category.save()
//         .then((result) => {
//              res.json({ message: 'Categories created!', result });
//          })
//          .catch((error) => {
//            res.status(500).json({ error });
//          });
//      };
 
 // . . .
 // returns the user object associated with the username if any
 // with the reviews field containing an array of review objects 
 // consisting of the reviews created by the user
//  exports.getSubject = (req, res) => {
//   const { id } = req.body;
//   Subjects.findById(id)
//        .populate('subjects')
//        .then((result) => {
//          res.json({ message: 'Get subject by ID', result });
//        })
//        .catch((error) => {
//          res.status(500).json({ error });
//        });
//    };
 
//    exports.getCategory = (req, res) => {
//     Categories.find({})
//         //  .populate('category')
//          .then((result) => {
//            res.json({ message: 'Get all ctaegories', result });
//          })
//          .catch((error) => {
//            res.status(500).json({ error });
//          });
//      };
   