const Student = require("../model/student");
// const Category = require("../model/category");
// const Subjects = require("../model/subject");


const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signUp = (req, res, next) => {
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
    Student.findOne({ email })
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
            let user = new Student({
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

exports.login = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Student.findOne({
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
}