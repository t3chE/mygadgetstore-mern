const jwt = require('jsonwebtoken');

function protectAdmin(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const token = authHeader.split(' ')[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded.isAdmin) {
            return res.status(403).json({ message: 'Admin access required' });
        }
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({ message: 'Invalid token' });
    }
}

module.exports = { protectAdmin };