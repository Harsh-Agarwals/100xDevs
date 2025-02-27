const express = require("express");
const userMiddleWare = require("../middlewares/user.js");
const User = require("../models/UserSchema.js");
const bcrypt = require("bcrypt");
const Course = require("../models/CourseSchema.js");
const router = express.Router(); //define routes separately and attach them to the main app

router.post("/signup", async (req, res) => {
    try {
        const {username, email, password} = req.body;
        if (!username || !email || !password) {
            return res.status(401).json({
                'success': false,
                'message': 'Bad username or email or password'
            })
        }

        const findUser = await User.findOne({$or: [{username}, {email}]});

        if (findUser) return res.status(401).json({'status': false, 'message': 'User already exists!'});

        const hashedPwd = await bcrypt.hash(password, 10);
        const user = new User({
            username: username,
            password: hashedPwd,
            email: email
        });
        await user.save();

        return res.status(201).json({
            'status': true,
            'message': 'User created successfully'
        })
    } catch(e) {
        console.log(`Error: ${e}`);
        return res.status(404).json({
            'status': false,
            'message': `Error ${e}`
        })
    }
});

router.get("/courses", async (req, res) => {
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

router.post("/courses/:courseId", userMiddleWare, async (req, res) => {
    const {courseId} = req.params;
    const {username} = req.headers;

    await User.updateOne({
        username: username
    }, {
        "$push": {
            courses: courseId
        }
    })

    return res.status(201).json({
        'status': true,
        'message': 'Course purchased successfully'
    })
});

router.get("/purchasedCourse", userMiddleWare, async (req, res) => {
    const {username} = req.headers;
    const user = await User.findOne({username});
    
    const courses = await Course.find({
        "_id": {$in: user.courses}
    });
    
    return res.status(201).json({
        'success': true,
        'message': 'Courses list fetch successfully!',
        courses
    })
});

module.exports = router;