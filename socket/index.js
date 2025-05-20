const { Server } = require("socket.io");

const { socketAuthMiddleware } = require("../middlewares/socketMiddlewares/jwtVerifySocketMiddleware");
const app = require("../app");
let ioInstance

module.exports = (io) => { // Export a function that takes 'io' as an argument
    ioInstance = io; // Store the io instance
app.use(socketAuthMiddleware)
    console.log('Socket.IO is set up!'); // Add this line for debugging

    io.on("connection", (socket) => {
        const { role, id } = socket.user;
        console.log(`Socket connected: ${id}`);
        if (role == "admin") {
            console.log(`socket ${id} joined room <admins>`);
        }

        if (role == "host") socket.join(`host:${id}`);
        if (role == "user") socket.join(`user:${id}`);

        socket.on("some-event", (data) => {
            // Handle event
        });

        socket.on("disconnect", () => {
            console.log("user disconnected");
        });
    });
};

