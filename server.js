const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Set required headers for SharedArrayBuffer
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Cross-Origin-Resource-Policy', 'cross-origin');
    
    let filePath = path.join(__dirname, req.url === '/' ? 'test-browser.html' : req.url);
    
    // Handle node_modules requests
    if (req.url.startsWith('/node_modules/')) {
        filePath = path.join(__dirname, req.url);
    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }
        
        // Set appropriate content type
        const ext = path.extname(filePath);
        const contentTypes = {
            '.html': 'text/html',
            '.js': 'application/javascript',
            '.wasm': 'application/wasm'
        };
        
        res.setHeader('Content-Type', contentTypes[ext] || 'text/plain');
        res.writeHead(200);
        res.end(data);
    });
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
    console.log('Required headers set for SharedArrayBuffer support');
});