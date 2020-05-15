const Tutor = require("../model/tutor");
// const Category = require("../models/categories");
// const Subjects = require("../models/subjects");


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = (req, res, next) => {
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const username = req.body.username
        // const category = req.body.category
        // const subject = req.body.subject
    const email = req.body.email;
    const password = req.body.password;


    if (!email || !password) {
        res.status(400).send({
            status: false,
            message: "All fields are required"
        })
        return;
    }
    Tutor.findOne({ email })
        .then(user => {
            if (user) {
                return res
                    .status(423)
                    .send({ status: false, message: "This email already exists" });
            }
        })
    bcrypt
        .hash(password, 12)
        .then(password => {
            let user = new Tutor({
                firstname,
                lastname,
                username,
                // category,
                // subject,
                email,
                password,
            });
            return user.save();
        })
        .then(() => res.status(200).send({ status: true, message: "User registered successfully" }))
        .catch(err => console.log(err));
};

exports.logIn = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Tutor.findOne({
            email
        })
        .then(user => {
            if (!user) {
                return res
                    .status(404)
                    .send("User not found, please provide valid credentials");
            }
            bcrypt.compare(password, user.password).then(valid => {
                if (!valid) {
                    return res
                        .status(403)
                        .send(
                            "Incorrect username or password, please review details and try again"
                        );
                }
                const token = jwt.sign({
                        email: user.email,
                        _id: user._id
                    },
                    "somesecretkey", {
                        expiresIn: "1hr"
                    }
                );
                res.status(200).send({
                    _id: user._id,
                    token
                });
            });
        })
        .catch(err => console.log(err));
};


exports.getAllTutors = async(req, res, next) => {
    const tutors = await Tutor.find({});

    res.status(200).json({ success: true, message: tutors });
};

exports.getTutorByFirstName = async(req, res, next) => {
    const { firstname } = req.query;

    const tutors = await Tutor.find({
        $text: { $search: firstname }
    }).sort({
        firstname: 1,
    });
    res.status(200).json({ success: true, message: tutors });
};

exports.deactivateTutor = async(req, res, next) => {
    const tutor = await User.findOneAndUpdate({ _id: req.params.tutorId }, { isActive: false }, { new: true, runValidators: true });

    res.status(200).json({ success: true, message: tutor });
};

exports.tutorRegisterSubject = async(req, res, next) => {
    const subject = await Tutor.findByIdAndUpdate(
        req.body._id, {
            $addToSet: { subjects: req.params.subjectId },
        }, { new: true, runValidators: true }
    ).populate('subjects');

    res.status(200).json({ success: true, message: subject });
};



exports.getAllTutorRegisteredSubjects = async(req, res, next) => {
    const subjectss = await Tutor.find({ _id: req.body._id })
        .populate('subjects')
        .select('subjects');

    res.status(200).json({ success: true, message: subjectss[0].subjects });
};

exports.deleteRegisteredSubject = async(req, res, next) => {
    const subjects = await Tutor.findByIdAndUpdate(
        req.body._id, {
            $pull: { subjects: req.params.subjectId },
        }, { new: true }
    );

    res.status(200).json({ success: true, message: subjects });
};







//     getTutorByFirstName: async(req, res) => {
//         const { firstname } = req.query;

//         const tutors = await Tutor.find({
//             $text: { $search: firstname }
//         }).sort({
//             firstname: 1,
//         });
//         res.status(200).json({ success: true, payload: tutors });
//     },

//     getAllTutors: async(req, res) => {
//         const tutors = await User.find({});

//         res.status(200).json({ success: true, payload: tutors });
//     }
// }

// exports.module = tutorHandler