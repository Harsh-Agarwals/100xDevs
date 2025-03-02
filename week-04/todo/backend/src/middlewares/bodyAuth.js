const zod = require('zod');

const signUpAuth = (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        console.log(username, email, password);

        if (!username || !email || !password) {
            return res.status(401).json({
                'success': false,
                'message': 'Please provide all the required fields'
            });
        }
        
        const schema = zod.object({
            username: zod.string().min(6).max(14),
            email: zod.string().email(),
            password: zod.string().min(8),
        });
        const validationResult = schema.safeParse({
            username: username,
            email: email,
            password: password 
        })

        if (!validationResult.success) {
            return res.status(401).json({
                'success': false,
                'message': 'Bad Validation',
            });
        }
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(401).json({
            'success': false,
            'message': 'Please rectify the data provided'
        })
    }
};

const bodyAuth = (req, res, next) => {
    try {
        const { username, password } = req.body;
        console.log(username, password);

        if (!username || !password) {
            return res.status(401).json({
                'success': false,
                'message': 'Please provide all the required fields'
            });
        }
        
        const schema = zod.object({
            username: zod.string().min(6).max(14),
            password: zod.string().min(8),
        });
        const validationResult = schema.safeParse({
            username: username,
            password: password 
        });

        if (!validationResult.success) {
            return res.status(401).json({
                'success': false,
                'message': 'Bad Validation',
            });
        };
        
        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(401).json({
            'success': false,
            'message': 'Please rectify the data provided'
        })
    }
};

module.exports = bodyAuth;
module.exports = signUpAuth;