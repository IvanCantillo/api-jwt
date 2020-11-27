const jwt = require('jsonwebtoken');

const token = {}

token.register = (user) => {
    const token = jwt.sign({
        id: user._id,
        name: user.name
    }, process.env.TOKEN_SECRET, { expiresIn: 60 * 60 * 24 });

    return token;
}

token.varify = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({
            error: true,
            message: 'Token undefine',
            data: null
        })
    }
    try {
        const verifyToken = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verifyToken;
        next();
    } catch (error) {
        console.log('catch');
        return res.status(401).json({
            error: true,
            message: `¡Access denied! ${error}`,
            data: null
        });
    }
}

module.exports = token;