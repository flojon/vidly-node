const config = require('config');
const winston = require('winston');

if (!config.get('jwtPrivateKey')) {
    winston.error("Missing JWT_PRIVATE_KEY!");
    process.exit(1);
}
