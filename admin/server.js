const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <body style="font-family:sans-serif;text-align:center;padding:60px;background:#fff4e5">
        <h1>🔒 Admin Panel</h1>
        <p>Restricted area — <strong>Admin Service</strong></p>
        <p style="color:gray">Only accessible via /admin</p>
      </body>
    </html>
  `);
}).listen(9090, () => console.log('Admin running on :9090'));
