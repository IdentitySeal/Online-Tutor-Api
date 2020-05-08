const router = require("express").Router();
//USERS ROUTE
const {signUp,login,StudentAcess} = require("../controllers/student");

// const {
//     categorySubjects,categories,getSubject,getCategory

// } =
const CategoryController= require("../controllers/controlle");
const SubjectsController = require("../controllers/subjects");
router.get("/", (req, res) => {
    res.send("This is the express app. You have now entered express");
});

//Student
router.post('/signup/student', signUp);
// router.post('/find/category', StudentAcess.find);

router.post("/login/student", login);
// router.post('/admin',adminSchema);

// router.post('/categorysubjects', categorySubjects);

// router.post("/categories", categories);
// router.get('/getsubject',getSubject);
// router.get('/getcategory',getCategory);


router.post("/categories/create",CategoryController.create);
router.get("/categories",CategoryController.findAll);
router.get("/categories/find/subject/:id",CategoryController.getAllSubject);

//Subjects Route
router.post("/subjects/create/:id",SubjectsController.SubjectByCategory);

router.post("/subjects/populate",SubjectsController.create);



// router.get ("/categories/:find/subjects", CategoryController.getAllSubject);


// router.get("/subjects", SubjectsController.findAll);
// router.post("/subjects/:find/create",SubjectsController.create);



module.exports = router;



