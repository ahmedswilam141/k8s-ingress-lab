const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
  res.end(`
    <html>
      <body style="font-family:sans-serif;text-align:center;padding:60px;background:#f0f4ff">
        <h1>🏠 Welcome to MyApp</h1>
        <p>This is the <strong>Frontend</strong> — public landing page</p>
      </body>
    </html>
  `);
}).listen(3000, () => console.log('Frontend running on :3000'));