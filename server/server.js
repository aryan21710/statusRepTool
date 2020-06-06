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
const publicPath = path.join(__dirname);
const port = process.env.PORT || 5000;
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
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..','/frontend/build')))
  //
  app.get('*', (req, res) => {
    console.log('REQUEST INSIDE * ENDPOINT')
    res.sendfile(path.join(__dirname , '..','/frontend/build/index.html'))
  })
}

console.log('PUBLICPATH:-' + publicPath);

// IMPORT ROUTES
const authRoutes = require("./Routes/auth.js");
const statusRoutes = require("./Routes/statusReport.js");
app.use('/userauth',authRoutes)
app.use('/status',statusRoutes)

//config DB..
const db = require('../config/keys.js').mongoURI;

// Connect to the MONGOOSE DB
mongoose
  .connect(db, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
  })
  .then(() => {
    console.log(`CONNECTED TO DATABASE WITH ENV ${db}` );
  });







// app.get('/', (req, res) => {
//   res.send('Root route of server');
// });




app.listen(port, () => {
	console.log('SERVER LISTENING ON:-' + port);
});


