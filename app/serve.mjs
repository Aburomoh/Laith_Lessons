import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { dirname, resolve, extname, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.jpeg': 'image/jpeg' };
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const route = pathname === '/' ? '/app/index.html' : pathname;
    const allowed = /^\/app\/(?:index\.html|app\.js|styles\.css|assets\/(?:illustrations|tutor|pages)\/[\w-]+\.webp)$/.test(route)
      || /^\/source-pages\/page-\d{2}\.jpeg$/.test(route);
    if (!allowed) { res.writeHead(404).end('Not found'); return; }
    const path = resolve(root, '.' + route);
    if (!path.startsWith(root + sep)) { res.writeHead(403).end(); return; }
    const bytes = await readFile(path);
    res.writeHead(200, { 'Content-Type': mime[extname(path)] || 'application/octet-stream' }); res.end(bytes);
  } catch { res.writeHead(404).end('Not found'); }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173'));
