const Subjects = require("../models/subjects");
const Category = require("../models/categories");


let SubjectsController = {
  // find :async(req,res) => {
  //   let found = await Subjects.find()
  //   res.json(found)
  // },   
  // create: async(req,res) => {
  //   console.log(req.params);

  //   const {title,description} = (req.body);
  //   let savedSubject = await Subjects.create({
  //     title,
  //     description
  //   });
  //   savedSubject.save();
  //   res.json(savedSubject);
  // },
  create: async(req,res) =>{
    console.log(req.params);
    category = req.params;
    tutor = req.params;

    id = category.id;
    id = tutor.id
    const {title,description} =req.body;
    const savedSubject = await Subjects.create({
      id,    
      title,
      description,
      tutor
        }); 

  await savedSubject.save();
  const categoryById = await Category.findById(id);
  categoryById.subjects.push(savedSubject);
  await categoryById.save();
  return res.send(categoryById);
  },
  
  SubjectByCategory : async (req,res)=>{
    const { id } = req.params;
    const SubjectByCategory = await Category.findById(id)
    .populate('category');
    res.send(SubjectByCategory);
}
}


module.exports = SubjectsController;





