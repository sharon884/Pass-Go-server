const express = require("express");
const cors = require("cors");
const dotenv = require('dotenv');
const connectDB  = require('./config/db'); 
const userRoutes = require( "./routes/userRoutes");


dotenv.config();

const app = express() ;

app.use(express.json());
app.use(cors());

connectDB();

app.get( '/' , ( req , res ) => {
    res.send("PASS-GO is running !");
});
app.use( "/api/user" , userRoutes );

const PORT = process.env.PORT || 5000 ;


app.listen( PORT , () => console.log(`server is running on http://localhost:${PORT}`)) 