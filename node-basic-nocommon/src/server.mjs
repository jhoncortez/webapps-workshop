import http from 'http';
// Create a server
export const server = http.createServer((req, res) => {
    // Set the response header
    res.writeHead(200, { 'Content-Type': 'text/plain' });

    // Send a response
    res.end('Hello, World!');
});