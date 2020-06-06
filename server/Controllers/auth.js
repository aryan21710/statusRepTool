const jwt = require("jsonwebtoken");
const expressJwt = require("express-jwt");
const UserCredModel = require("../Models/auth.js");


const signUp = (req, res, next) => {
    console.log("req.body:-", req.body);
    const {  email } = req.body;
    UserCredModel.findOne({ email: email }, (error, user) => {
      console.log("error", error);
      console.log("user", user);
      if (error || user) {
        return res.status(400).json({
          error: "EMAIL ALREADY REGISTERED.",
        });
      }
  
      const userCredDoc = new UserCredModel(req.body);
      userCredDoc.save((error, user) => {
        if (error) {
          return res.status(400).json({
            error: "EMAIL ALREADY REGISTERED.",
          });
        }
        user.salt = undefined;
        user.hashed_password = undefined;
        res.json({ user });
        next();
      });
    });
  };
  
  const signIn = (req, res, next) => {
    const { email, password } = req.body;
    console.log('req.body',req.body)
    if (email.length == 0) {
      return res.status(401).json({
        error: "PLEASE ENTER EMAIL ADDRESS",
      });
    }
    UserCredModel.findOne({ email: email }, (error, user) => {
      if (error || !user) {
        return res.status(400).json({
          error: "INVALID EMAIL ID. PLEASE SIGNUP",
        });
      }
      if (password.length == 0) {
        return res.status(401).json({
          error: "PLEASE ENTER PASSWORD",
        });
      } else {
        if (!user.authenticate(password)) {
          return res.status(401).json({
            error: "WRONG PASSWORD ENTERED.",
          });
        } else {
          const { _id, email, name, role } = user;
          const token = jwt.sign({ _id, role }, process.env.JWT_SECRET_KEY);
          res.cookie("SignInToken", token, { expire: new Date() + 9999 });
          // POPULATE req.signedInUser whenever there is userId coming in as a route paramter in url from the frontend.
          res.json({
            token,
            userCred: {
              _id,
              email,
              name,
            },
          });
        }
      }
  
      next();
    });
  };

const userById = (req, res, next, id) => {
  UserCredModel.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({ error: "USER NOT FOUND" });
    }
    user.salt = undefined;
    user.hashed_password = undefined;
    req.signedInUser = user;
    next();
  });
};

const signOut = (req, res) => {
  console.log("*************************************************");
    res.clearCookie("SignInToken");
    res.json({
      message: "USER SIGNED OUT SUCCESSFULLY",
    });
  };
  
  const requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET_KEY,
    userProperty: "auth",
  });
  
  const isUserAuthenticated = (req, res, next) => {
    console.log('req.signedInuser',req.signedInUser);
    console.log('req.auth', req.auth)
    if (!(req.signedInUser && req.auth && req.signedInUser._id == req.auth._id)) {
      return res.status(403).json({
        error: "Access Denied",
      });
    }
    next();
  };


module.exports={userById,signUp,signIn, requireSignIn, signOut, isUserAuthenticated}