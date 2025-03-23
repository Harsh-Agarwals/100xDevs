const z = require('zod');

const signupValidate = (req, res, next) => {
    try { 
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({
                'success': false,
                'message': 'Please fill all fields'
            })
        };

        const userSchema = z.object({
            username: z.string().min(5).max(12),
            email: z.string().email(),
            password: z.string().min(8).max(20)
        })

        const schemaResult = userSchema.safeParse({
            username, email, password
        });

        if (!schemaResult.success) return res.status(404).json({
            'success': false,
            'message': "Input data format invalid"
        });

        next();
    } catch (e) {
        console.log(`Error: ${e}`);
        return res.status(401).json({
            'success': false,
            'message': 'Please rectify the data provided'
        })
    }
}

module.exports = signupValidate;