const express = require('express');
const router = express.Router();
const User = require("../Schema/userSchema");
const upload = require('../Middleware/image_upload');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const jwt_secrate = process.env.JWT_SECREATE_KEY;
const fecthuser = require("../Middleware/authenticate_user");




//**Register Route start here**//
//**Method:POST**//
//**Register Route no user authentication require **//
router.post("/userdetail", upload.single('image'), [
    body("name", "Name cannot be empty").isLength({ min: 1 }),
    body("name").custom((value, { req }) => {
        const containsOnlyLetters = /^[a-zA-Z\s]+$/;

        if (containsOnlyLetters.test(value)) {
            return true;
        }
        else {
            throw new Error("name only include [a-z] && [A-Z] pattern")
        }
    }),
    body("email", "Enter a valid email").isEmail(),
    body("password").custom((value, { req }) => {
        const isUpper = /[A-Z]/;
        const isLower = /[a-z]/;
        const isNumeric = /[0-9]/;
        const special = /[!@#$%^&*(),.?":{}|<>]/;

        if (value.length < 5) {
            throw new Error("password must contain 5 characters");
        }
        if (!isUpper.test(value)) {
            throw new Error("password must contain 1 Uppercase alphabet");
        }
        if (!isNumeric.test(value)) {
            throw new Error("password must contain 1 Number");
        }
        if (!isLower.test(value)) {
            throw new Error("password must contain 1 lowercase character");
        }
        if (!special.test(value)) {
            throw new Error("password must contain 1 special character");
        }
        return true;
    }),

    body("mobile", "Mobile Number format invalid!").isNumeric(),
    body("mobile").custom((value, { req }) => {
        console.log(value.length)
        if (value.length === 10) {

            return true;
        }
        else {
            throw new Error("mobile number must be in 10 digit");
        }
    }),
     body("gender","select gender field").isLength({ min: 1 }),
    body("dob","date of birth cannot be empty").isLength({ min: 1 }),
        body("dob").custom((value, { req }) => {
        if (new Date() <= new Date(value)) {
            throw new Error("Enter a valid birthdate");
        }
        return true; // Return true if validation passes
    }),
        body('image').custom((value, { req }) => {
        if (!req.file) {
            throw new Error("please Choose an image");
        }
        return true;
    }),
], async (req, res) => {
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ "validationError": errors.array(), success });
    }
    const fileImagename = req.file.filename;
    console.log(fileImagename)
    console.log(req.body)

    const check_user = await User.findOne({ email: req.body.email });
    if (check_user) {
        return res.status(401).json({ "error": "email is already exist !!", "type": "backend-user.js /userdetail", success })
    }

    try {

        const salt = await bcrypt.genSalt(10);
        console.log(salt);
        const securePassword = await bcrypt.hash(req.body.password, salt);
        console.log(securePassword);
        const response = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: securePassword,
            mobile: req.body.mobile,
            gender: req.body.gender,
            role: req.body.role,
            dob: new Date(req.body.dob),
            experience: req.body.experience,
            profile: fileImagename,
        });

        const data = {

            user: {
                id: response._id
            }

        };
        const jwt_data = jwt.sign(data, jwt_secrate);
        console.log(jwt_data);
        success = true;
        res.status(201).json({ "jwt_token": jwt_data, success });


    } catch (error) {
        return res.status(500).json({ "error": "500 Error in internal server", "type": "user.js -> /userdetail", "message": error.message });
    }

});
//**Register Route end here**//







//**login Route Start here**//
//**Method:POST**//
//**login Route No user authentication require **//
router.post("/login", [
    body("email", "Enter a valid email").isEmail(),
    body("password").custom((value, { req }) => {
        const isUpper = /[A-Z]/;
        const isLower = /[a-z]/;
        const isNumeric = /[0-9]/;
        const special = /[!@#$%^&*(),.?":{}|<>]/;

        if (value.length < 5) {
            throw new Error("password must contain 5 characters");
        }
        if (!isUpper.test(value)) {
            throw new Error("password must contain 1 Uppercase alphabet");
        }
        if (!isNumeric.test(value)) {
            throw new Error("password must contain 1 Number");
        }
        if (!isLower.test(value)) {
            throw new Error("password must contain 1 lowercase character");
        }
        if (!special.test(value)) {
            throw new Error("password must contain 1 special character");
        }
        return true;
    }),
], async (req, res) => {
    let success = false;
    console.log("clickmmlogin")
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(500).json({ "validationError": errors.array(), success });
    }

    const { email, password } = req.body
    const check_user = await User.findOne({ email: email });

    try {
        if (!check_user) {
            return res.status(500).json({ "error": "login credentials invalid", "type 1": "user.js -> /login", success });
        }

        const match_password = await bcrypt.compare(password, check_user.password);

        if (!match_password) {
            return res.status(500).json({ "error": "login credentials invalid", "type 2": "user.js -> /login", success });
        }
        const data = {
            user: {
                id: check_user._id
            }
        }
        const jwt_data = jwt.sign(data, jwt_secrate);
        console.log(jwt_data);
        success = true;
        res.status(201).json({ "jwt_token": jwt_data, success });
    } catch (error) {

        return res.status(500).json({ "error": "500 Error in internal server", "type": "user.js -> /login", "message": error.message });
    }

})
//**login Route end here**// 






//**This Route use to get all the user's information**//
//**user Authentication is required**//
//**Method:GET**//
//**userdetail route start here**//
router.get("/userdetail", fecthuser, async (req, res) => {
    let success = false;
    const user_id = req.user.id;
    if (!user_id) {
        return res.status(404).json({ "error": "current user id bad request 404 not found", "type": "user.js-> /userdetail", success })
    }
    try {

        const user = await User.find({ "_id": user_id }).select('-password');
        success = true;
        res.status(201).json({ user, success });
    } catch (error) {
        return res.status(500).json({ "error": "internal server Error", "type": "user.js -> /userdetail " })
    }
});
//**userdetail route start here**//





module.exports = router; 
