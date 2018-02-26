const jwt = require('jsonwebtoken');
const config = require('config');

function auth(req, res, next) {
    let token = req.header('Authorization');
    if (!token)
        return res.status(401).send('Access denied! Authorization header is missing!');

    token = token.split(" ").pop();

    try {
        req.user = jwt.verify(token, config.get('jwtPrivateKey'));
        next();
    } catch (error) {
        res.status(400).send('Invalid token!');
    }
}

module.exports = auth;