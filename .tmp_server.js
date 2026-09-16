const h = require('http');
const fs = require('fs');
const path = require('path');
const port = 8090;
const mime = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.jpg': 'image/jpeg'
};
h.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/') p = '/market.html';
  const fp = path.join(__dirname, p);
  fs.readFile(fp, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end('not found ' + fp);
      return;
    }
    const ext = path.extname(fp);
    res.writeHead(200, { 'Content-Type': mime[ext] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(port, () => console.log('listening', port));
