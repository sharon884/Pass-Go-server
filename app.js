const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB  = require('./config/db'); 
const userRoutes = require( "./routes/userRoutes/index");
const hostRoutes = require( "./routes/hostRoutes/index");
const adminRoutes = require( "./routes/adminRoutes/index");
const refresTokenRoute = require("./routes/golbalRoutes/refreshtokenRoute")
const cookieParser = require("cookie-parser");
const  morgan = require('morgan');


dotenv.config();

const app = express() ;

app.use(morgan('dev'))

app.use(express.json());
app.use(cors({
    origin :process.env.FRONTEND_URL, 
    credentials : true,
}));
app.use(cookieParser());


connectDB();

app.get( '/' , ( req , res ) => {
    res.send("PASS-GO is running !");
});

app.get('/test', (req, res) => {
    // Access the io instance from the app object
    // This 'socketio' key is set in server.js
    const io = req.app.get('socketio');
    if (io) {
        io.to("admins").emit("new-verify-request", {
            hostId: 1,
            name: 'Hello from test route!',
            time: Date.now(),
        });
        console.log("Test event emitted to 'admins' room.");
        res.send("Test event sent to admins!");
    } else {
        console.error("Socket.IO instance not found on app object in /test route.");
        res.status(500).send("Socket.IO not initialized for the /test route.");
    }
});

app.use( "/api/user", userRoutes );
app.use( "/api/host", hostRoutes );
app.use( "/api/admin", adminRoutes);
app.use( "/api/auth", refresTokenRoute);


module.exports = app;