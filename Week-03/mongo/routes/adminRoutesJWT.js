const express = require("express");
const adminMiddleware = require("../middlewares/admin.js");
const Admin = require("../models/AdminSchema.js");
const router = express.Router(); //define routes separately and attach them to the main app
const bcrypt = require('bcrypt');
const Course = require("../models/CourseSchema.js");
const AdminJWTmiddleware = require("../middlewares/adminJWT.js");
const jwt = require("jsonwebtoken");

router.post("/signup", async (req, res) => {
    try {
        let {username, email, password} = req.body;

        if (!username || !email || !password) {
            return res.status(404).json({
                "success": false,
                "message": "Bad username or email or password"
            })
        }

        const findUser = await Admin.findOne({$or: [{username}, {email}]});

        if (findUser) return res.status(404).json({"success": false, "message": "User with this username or email already exists!"});

        let encPwd = await bcrypt.hash(password, 10);
        const admin = new Admin({
            username: username,
            email: email,
            password: encPwd
        });
        await admin.save();
        return res.status(201).json({
            "success": true,
            "message": "Admin created successfully"
        })
    } catch (error) {
        console.log(`Error in signup: ${error}`);
        return res.status(400).json({
            "success": false,
            "message": `Error creating Admin: ${error.message}`
        })
    }
});

router.post("/signin", async (req, res) => {
    try {
        const {username, password} = req.body;
        if (!username || !password) {
            return res.status(404).json({
                'success': false,
                'message': "Missing username or password"
            });
        };

        const admin = await Admin.findOne({username});

        if (!admin) return res.status(404).json({'success': false, 'message': 'Bad credential, user DNE!'});

        const token = jwt.sign({
            username: username
        }, process.env.JWT_SECRET);

        return res.status(201).json({
            'success': true,
            'message': 'Authenticated successfully',
            "token": token
        });
    } catch (e) {
        console.log(`Error ${e}`);
        return res.status(404).json({
            'success': false,
            'message': `Error: ${e}`
        });
    };
});

// /admin/courses will require username and password via header, so admin middleware will provide those
router.post("/courses", AdminJWTmiddleware, async (req, res) => {
    try {
        const {username} = req.user;
        const {title, description, price} = req.body;
        if (!title || !description || !price) {
            return res.status(401).json({
                "success": false,
                "message": "Please provide title, description and price of the course."
            })
        }

        const findCourse = await Course.findOne({title});
        if (findCourse) return res.status(401).json({"success": false, "message": "Course with this title already exists!"});

        const admin = await Admin.findOne({username: username});

        const course = new Course({
            title: title,
            description: description,
            price: price,
            creator: admin._id
        });

        course.save();

        try {
            await Admin.updateOne({
                username: username
            }, {
                "$push": {
                    courses: course
                }
            })
            console.log("Successfully saved course to admin!");
        } catch (e) {
            console.log(`Error saving course to admin ${e}`);
        }

        return res.status(201).json({
            "success": true,
            "message": "Course created successfully!",
            "course ID": course._id
        })
    } catch (e) {
        console.log("Error creating course!!");
        return res.status(404).json({
            "success": false,
            "message": `Error creating course: ${e}`
        })
    }
});

// /admin/courses requires username and password
router.get("/courses", AdminJWTmiddleware, async (req, res) => {
    let courses = await Course.find({});
    courses = courses.map((item) => ({
        'title': item.title,
        'description': item.description,
        'price': item.price
    }))
    
    return res.status(201).json({
        courses
    })
});

module.exports = router;