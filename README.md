# socket-server
A small application that reads messages from a rabbit queue and forwards them to a socket.

# Configuration
This application requires a configuration file named rabbit.json next to index.js. This json file should have the following fields:
* host: The hostname or ip address of the rabbit server.
* login: The username to use when connecting to the rabbit server.
* password: The password to use when connecting to the rabbit server.
* exchange: The name of the exchange to bind the queue to.
 
# Usage
If desired you can specify the port to listen for socket.io connections using:
`--port` or `-p`

## Sample usage
`node index.js --port 8002`
