const roleAuth = (allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.role)) {
            return res.status(403).json({ message: `'roleMiddleware - Access denied: Insufficient permissions'` })
        }
        next();
    }
}

module.exports = { roleAuth };