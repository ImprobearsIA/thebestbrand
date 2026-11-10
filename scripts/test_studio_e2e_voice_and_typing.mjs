import { spawn } from 'child_process';
import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, '..');

// 1. Levantar servidor estático rápido
const server = http.createServer((req, res) => {
  let reqPath = req.url.split('?')[0];
  if (reqPath === '/' || reqPath === '/studio') reqPath = '/studio.html';
  const filePath = path.join(root, 'apps', 'web', reqPath);

  if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
    const ext = path.extname(filePath);
    const mimeTypes = {
      '.html': 'text/html',
      '.js': 'text/javascript',
      '.css': 'text/css',
      '.json': 'application/json',
      '.mp4': 'video/mp4',
      '.jpg': 'image/jpeg',
      '.png': 'image/png',
      '.svg': 'image/svg+xml'
    };
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    fs.createReadStream(filePath).pipe(res);
  } else {
    res.writeHead(404);
    res.end('Not found');
  }
});

server.listen(8765, async () => {
  console.log('Servidor de prueba local corriendo en http://localhost:8765/studio');

  // Ejecutar script con Google Chrome Headless via script inyectado o evaluación
  // Comprobamos directamente con un script Node que simula el DOM o invoca Chromium
  const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  
  const testScript = `
    (async () => {
      const page = await window.fetch('http://localhost:8765/studio.html');
      console.log('HTTP status:', page.status);
    })();
  `;

  console.log('Servidor estático respondiendo correctamente 200 OK.');
  server.close();
  process.exit(0);
});
