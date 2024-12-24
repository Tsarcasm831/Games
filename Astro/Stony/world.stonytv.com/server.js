const express = require('express');
const path = require('path');
const app = express();

// CORS middleware
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

// Serve static files with proper MIME types
app.use(express.static(__dirname, {
    setHeaders: (res, filePath) => {
        if (filePath.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
        }
        // Enable CORS for all static files
        res.setHeader('Access-Control-Allow-Origin', '*');
        // Cache control
        res.setHeader('Cache-Control', 'no-cache, must-revalidate');
    }
}));

// Handle SvelteKit's data endpoints
app.get('/__data.json', (req, res) => {
    res.json({
        type: 'data',
        nodes: [],
        parent: null
    });
});

// Handle Vercel Analytics script
app.get('/_vercel/insights/script.js', (req, res) => {
    res.type('application/javascript').send('');
});

// Special handling for node imports
app.get('/nodes/*.js', (req, res, next) => {
    res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
    next();
});

// Handle all routes for SPA
app.get('*', (req, res) => {
    if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({
            type: 'page',
            nodes: [],
            parent: null
        });
    }
    res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
