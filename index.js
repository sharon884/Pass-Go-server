// server.js
const http = require("http");
const app = require("./app"); // Your Express app
const { Server } = require("socket.io");
const dotenv = require('dotenv'); // Ensure dotenv is configured if not already in app.js for PORT

dotenv.config(); // Load .env variables

const httpServer = http.createServer(app);

// Initialize Socket.IO with the HTTP server
const io = new Server(httpServer, {
    cors: {
        origin: process.env.FRONTEND_URL || "http://localhost:5173",
        credentials: true,
    },
});

// Attach the io instance to the Express app object
// This makes it accessible from request handlers (e.g., in your routes)
app.set('socketio', io);

// Pass the initialized 'io' instance to your socket setup module
// This is where io.on('connection', ...) will be correctly set up.
require("./socket/index")(io);

const port = process.env.PORT || 5000;
httpServer.listen(port, () => {
    console.log(`API + WebSocket server running on http://localhost:${port}`);
});
