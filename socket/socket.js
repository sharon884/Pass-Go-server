const { Server } = require("socket.io");

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors : {
            origin : process.env.FRONTEND_URL || "http://localhost:5173",
            credentials : true,
        },
    });

    io.on("connection", (socket) => {
        console.log("socket connected:", socket.id);

        socket.on("verifying-host", (hostId) => {
            socket.join(hostId);
            console.log(`host ${hostId} joined their room`);
        });

        socket.on("disconnect", () => {
            console.log("socket disconnected",socket.id);
        });
    });
    return io;
}

module.exports = initializeSocket;