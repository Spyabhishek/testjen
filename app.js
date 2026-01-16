const http = require('http');
const url = require('url'); // Added for easier URL parsing

let appData = {
    user: "Guest",
    isPremium: false,
    points: 10
};

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    res.setHeader('Content-Type', 'text/html');

    // 1. HOME - See the current state
    if (path === '/' || path === '/home') {
        res.end(`
            <h1>Dashboard</h1>
            <p>User: <strong>${appData.user}</strong></p>
            <p>Premium: <strong>${appData.isPremium ? '✅ Yes' : '❌ No'}</strong></p>
            <p>Points: <strong>${appData.points}</strong></p>
            <hr>
            <p>Try: /set-user?name=YourName | /toggle-premium | /add-point</p>
        `);
    }

    // 2. "POST" via URL (Edit Name)
    // URL: localhost:3000/set-user?name=John
    else if (path === '/set-user') {
        if (query.name) {
            appData.user = query.name;
            res.end(`<h1>Success</h1><p>User changed to: ${query.name}</p><a href="/home">Go Back</a>`);
        } else {
            res.end(`<h1>Error</h1><p>Add ?name=something to the URL</p>`);
        }
    }

    // 3. "BOOLEAN" Toggle
    // URL: localhost:3000/toggle-premium
    else if (path === '/toggle-premium') {
        appData.isPremium = !appData.isPremium;
        res.end(`<h1>Status Updated</h1><p>Premium is now: ${appData.isPremium}</p><a href="/home">Go Back</a>`);
    }

    // 4. "EDIT" via URL (Math/Logic)
    // URL: localhost:3000/add-point
    else if (path === '/add-point') {
        appData.points += 5;
        res.end(`<h1>Point Added!</h1><p>New Total: ${appData.points}</p><a href="/home">Go Back</a>`);
    }

    else {
        res.statusCode = 404;
        res.end('<h1>Page Not Found</h1><a href="/home">Back Home</a>');
    }
});

server.listen(3000, '0.0.0.0', () => {
    console.log('Server is running! Access it via browser.');
});