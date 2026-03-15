const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({
    service: "API",
    status: "healthy",
    message: "Welcome to the API layer",
    timestamp: new Date().toISOString()
  }));
}).listen(8080, () => console.log('API running on :8080'));