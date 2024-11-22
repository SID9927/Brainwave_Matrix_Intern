const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user; // Ensure this is correctly set
        next();
    } catch (err) {
        console.error('Token verification error:', err); // Log the error
        res.status(401).json({ message: 'Token is not valid' });
    }
};

module.exports = auth;