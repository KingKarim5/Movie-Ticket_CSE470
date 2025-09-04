import jwt from 'jsonwebtoken';

export const protectLocal = (req, res, next) => {
    try {
        const header = req.headers.authorization || '';
        const [, token] = header.split(' ');
        if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        req.user = payload; // { userId, email, role }
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};

export const protectAdmin = (req, res, next) => {
    try {
        const header = req.headers.authorization || '';
        const [, token] = header.split(' ');
        if (!token) return res.status(401).json({ success: false, message: 'No token provided' });
        const payload = jwt.verify(token, process.env.JWT_SECRET);
        if (payload.role !== 'admin') {
            return res.status(403).json({ success: false, message: 'Not Authorized! Admin role required.' });
        }
        req.user = payload;
        next();
    } catch (err) {
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};
