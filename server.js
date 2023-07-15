const https = require('https');
const app =require("./app")
const fs = require('fs');

// Read the SSL certificate and private key
const options = {
  key: fs.readFileSync('./key.pem'),
  cert: fs.readFileSync('./certificate.pem')
};

// Create the HTTPS server
// const server = https.createServer(options, (req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, HTTPS!');
// });

const server=https.createServer(options,app);

// Start the server
const port = 443; // HTTPS default port
server.listen(port, () => {
  console.log(`Server running at https://localhost:${port}/`);
});