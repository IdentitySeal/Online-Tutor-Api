const router = require("express").Router();
const CategoryController = require("../controllers/category");
const SubjectController = require("../controllers/subject");
const getAllTutors = require("../controllers/tutor");


router.post("/category/create", CategoryController.create); //create a categpry
router.get("/category", CategoryController.findAll); //get all category
router.put("/category/:categoryId", CategoryController.updateCategory); //update category
router.delete("/category/:categoryId", CategoryController.deleteCategory) //delete category




router.post("/category/:categoryId/subjects", SubjectController.create) //create a subject
router.get("/category/:categoryId/subjects", SubjectController.getAllSubjectCategoryById)

router.get("/category/:categoryId/subjects/subjectId", SubjectController.getSubjectCategoryById)
router.put("/category/:categoryId/subjects/subjectId", SubjectController.updateSubjectByCategoryId)
router.delete("/category/:categoryId/subjects/subjectId", SubjectController.deleteSubjectInCategoryById)


// router.get("/tutor", getAllTutors) //create a subject



module.exports = router;


//  5ebb4fb7eeda8b191c93e7bb  category Id
//5eb35adfe3448914e483c221

//  5ebe44850e945227ecd1e8b4 subject ID
//5ebb4c5d99b2d7017c36bb79