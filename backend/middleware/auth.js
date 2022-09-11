
const jsonwebtoken = require('jsonwebtoken');

/** Gets the token generated 
 * Execute try / catch to detecte problems
 * 
 * @param {*} request 
 * @param {*} response 
 * @param {*} next 
 * 
 *  1. Get token from request the split to get only the token
 */
module.exports = (request, response, next) => {
    try {
        const generatedToken = request.headers.authorization.split(' ')[1];

        const tokenToDecode = jsonwebtoken.verify(generatedToken, process.env.SECRETE_TOKEN);
        const userId = tokenToDecode.userId;

        request.auth = {
            userId: userId
        };

    }
    catch (error) {
        response.status(401).json({ error })
    }
};

