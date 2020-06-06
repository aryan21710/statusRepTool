const express = require('express');
const path = require('path');
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const expressValidator = require('express-validator');
// Needed to source dotenv file configurations.
require("dotenv").config();

const app = express();
const publicPath = path.join(__dirname, '..', 'frontend/public');
const port = process.env.PORT || 8002;
// IMPORT ALL MIDDLEWARES

// BODYPARSER is needed to get access to post data. It will give access to request.body and convert it into JSON object.
// it extracts the entire body portion of an incoming request and exposes it in request.body. Its relevant in case of POST
// or PUT
app.use(bodyParser.json());

// MORGAN IS NEEDED TO CONSOLE.LOG THE ROUTE RELATED INFORMATION COMING TO SERVER. EXAMPLE IS AS FOLLOWS.
// GET /api 304 8.282 ms - - (HTTP REQUEST CAME TO END-POINT /api. )
app.use(morgan("dev"));


// COOKIE-PARSER:- The cookie parser parses cookies and puts the cookie information on req object in the middleware. It will
// also decrypt signed cookies provided you know the secret. THIS IS BASICALLY NEEDED TO SAVE THE USER CREDENTIALS IN COOKIES.
app.use(cookieParser());

app.use(cors());

app.use(expressValidator());
app.use(express.static(publicPath));

console.log('PUBLICPATH:-' + publicPath);

// IMPORT ROUTES
const authRoutes = require("./Routes/auth.js");
const statusRoutes = require("./Routes/statusReport.js");


// Connect to the MONGOOSE DB
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost/statusReportingTool", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  });


app.use('/userauth',authRoutes)
app.use('/status',statusRoutes)


app.get('*', (req, res) => {
	res.sendFile(path.join(publicPath, 'dist/index.html'));
});

app.listen(port, () => {
	console.log('SERVER LISTENING ON:-' + port);
});


