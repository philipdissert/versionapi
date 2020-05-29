module.exports = function(req, res, next) {
    const userIdFromSession = req.session.userId;
    const verifiedEmail = req.session.verifiedEmail;

    //const token = req.header('auth-token');
    if(!userIdFromSession) return res.status(401).send('Access Denied');
    if(!verifiedEmail) return res.redirect('/api/verifiyMail')
    try {
        const userId = userIdFromSession;//jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = userId;
        next();
    } catch(err) {
        res.status(400).send('Invalid token');
    }
}