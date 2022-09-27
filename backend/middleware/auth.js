
const jsonwebtoken = require('jsonwebtoken');


/** Gets the token generated 
 * Execute try / catch to detecte problems
 * 
 * @param {request, response, next} request: the request sent, the response from the backend and next execute the other code
 * 
 *  1. Get token from request the split to get only the token
 */
module.exports = (request, response, next) => {
    try {
        const token = request.headers.authorization.split(' ')[1];

        const decodedToken = jsonwebtoken.verify(token, process.env.SECRETE_TOKEN);
        const userId = decodedToken.userId;


        if (request.body.userId && (request.body.userId !== userId)) {
            response.status(401).json({message: "error"})
        }
        else {
             next();
        }
        
        request.auth = {
            userId: userId
        };
    }
    catch (error) {
        response.status(401).json({ message: 'Invalid request' });
    }
};



