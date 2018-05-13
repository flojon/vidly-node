const lib = require('../../../models/index');
const jwt = require('jsonwebtoken');
const config = require('config');

describe('user.generateAuthToken', () => {
    it("generates a valid auth token with isAdmin false", () => {
        const user = new lib.User({ isAdmin: false });
        const token = user.generateAuthToken();
        const decodedToken = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decodedToken._id).toBe(user._id.toString());
        expect(decodedToken.isAdmin).toBeFalsy();
    });

    it("generates a valid auth token with isAdmin true", () => {
        const user = new lib.User({ isAdmin: true });
        const token = user.generateAuthToken();
        const decodedToken = jwt.verify(token, config.get('jwtPrivateKey'));
        expect(decodedToken._id).toBe(user._id.toString());
        expect(decodedToken.isAdmin).toBeTruthy();
    });
});
