const z = require('zod');

const authValidate = (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            return res.status(400).json({
                'success': false,
                'message': 'Please fill all fields'
            })
        };

        const usernameSchema = z.string().min(5).max(12);
        const passwordSchema = z.string().min(8).max(20);

        const unSResult = usernameSchema.safeParse(username);
        const pwdSResult = passwordSchema.safeParse(password);

        const schemaResult = unSResult.success && pwdSResult.success;

        if (!schemaResult) return res.status(404).json({
            'success': false,
            'message': "Input data format invalid"
        });

        res.user = req.body;

        next();
    } catch (error) {
        console.log(`Error: ${error}`);
        res.status(404).json({
            'success': false,
            'message': `Error: ${error}`
        });
    }
}

module.exports = authValidate;