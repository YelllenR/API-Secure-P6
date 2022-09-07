/** To import env file
 * 
 */
require('dotenv').config();

// Voir pour implémenter un autre module pour https
const http = require('http');

const application = require('./application');

/** Checks value of port with if statement
 * If not a number it return the value / if greater or equals to 0 it returns the port
 */
// const normalizePort = valueOfPort => {
//     const port = parseInt(valueOfPort, 10);

//     // If port is not a number
//     if (isNaN(port)) {
//         return valueOfPort;
//     }

//     if (port >= 0) {
//         return port;
//     }

//     return false;
// }


const port = process.env.PORT || process.env.ANOTHER_PORT;
application.set('port', port)


/** Creates server with port in application.set
 * 
 */
const server = http.createServer(application);


server.listen(port);