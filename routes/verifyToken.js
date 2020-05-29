module.exports = function(req, res, next) {
    const userIdFromSession = req.session.userId;

    //const token = req.header('auth-token');
    if(!userIdFromSession) return res.status(401).send('Access Denied');
    try {
        const userId = userIdFromSession;//jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userId;
        next();
    } catch(err) {
        res.status(400).send('Invalid token');
    }
}