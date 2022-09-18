// Imports the library dotenv
require('dotenv').config();

// Voir pour implémenter un autre module pour https
const http = require('http');

// Imports application.js
const application = require('./application');


/** Checks value of port with if statement
 * If not a number it return the value / if greater or equals to 0 it returns the port
 * @return {PORT} the valide port and if not return false
 */
const portValueCheck = valueOfPort => {
    const port = parseInt(valueOfPort, 10);
    // If port is not a number
    if (isNaN(port)) {
        return valueOfPort;
    }
    if (port >= 0) {
        return port;
    }

    return false;
}


/** Setting port value after check in function portValueCheck
 * 
 * PORT and ANOTHER_PORT are set in env file
 */
const port = portValueCheck(process.env.PORT || process.env.ANOTHER_PORT);
application.set('port', port);



/** Handling error for system calls - arrow function
 * 1. if statement on system to return an error if it's diffent than listen
 * 2. address = get the connextion address
 * 3. binding = gets the type of addresse
 * 4. if statement to check if permissions is denied error is consoled out and process.exit terminate the connexion
 * 5. Same process for port already in use
 */
const errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }   

    // if ('EACCES') {
    //     console.error(binding + ' requires higher priviledge');
    //     process.exit(1);
    // }
    // else if ('EADDRINUSE') {
    //     console.error(binding + ' is already in use');
    //     process.exit(1);
    // }
};


/** Creates server with port in application.set
 * 
 */
const server = http.createServer(application);
server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const binding = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

    console.log('Listening on ' + binding);
});

server.listen(port);