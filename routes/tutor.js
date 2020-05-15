const router = require("express").Router();

const { signUp, login } = require("../controllers/student");

const { signup, logIn, getAllTutors } = require("../controllers/tutor");

// const Student = require("../controllers/student");
// const Tutor = require("../controllers/tutor");

router.post("/signup/student", signUp); //
router.post("/login/student", login); //

router.post("/signup/tutor", signup); //
router.post("/login/tutor", logIn); //

router.get("/tutor", getAllTutors) //create a subject

module.exports = router;


//  5ebb4fb7eeda8b191c93e7bb  category Id
//5eb35adfe3448914e483c221

//  5ebe44850e945227ecd1e8b4 subject ID
//5ebb4c5d99b2d7017c36bb79