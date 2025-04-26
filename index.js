const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB  = require('./config/db'); 
const userRoutes = require( "./routes/userRoutes/index");
const hostRoutes = require( "./routes/hostRoutes/index");
const adminRoutes = require( "./routes/adminRoutes/index");
const cookieParser = require("cookie-parser");
const  morgan = require('morgan')

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
app.use( "/api/user", userRoutes );

app.use( "/api/host", hostRoutes );
app.use( "/api/admin", adminRoutes);

const PORT = process.env.PORT || 5000 ;


app.listen( PORT , () => console.log(`server is running on http://localhost:${PORT}`)) 