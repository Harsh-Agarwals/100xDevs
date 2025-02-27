const express = require("express");
const adminMiddleware = require("../middlewares/admin.js");
const Admin = require("../models/AdminSchema.js");
const router = express.Router(); //define routes separately and attach them to the main app
const bcrypt = require('bcrypt');
const Course = require("../models/CourseSchema.js");

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

// /admin/courses will require username and password via header, so admin middleware will provide those
router.post("/courses", adminMiddleware, async (req, res) => {
    try {
        const {title, description, price} = req.body;
        if (!title || !description || !price) {
            return res.status(401).json({
                "success": false,
                "message": "Please provide title, description and price of the course."
            })
        }

        const findCourse = await Course.findOne({title});
        if (findCourse) return res.status(401).json({"success": false, "message": "Course with this title already exists!"});

        const course = new Course({
            title: title,
            description: description,
            price: price
        });

        course.save();

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
router.get("/courses", adminMiddleware, async (req, res) => {
    let courses = await Course.find({});
    courses = courses.map((item) => ({
        'title': item.title,
        'description': item.description,
        'price': item.price
    }))
    console.log(courses);
    
    return res.status(201).json({
        courses
    })
});

module.exports = router;