
const express = require('express');
const router= express.Router()

const {
    requireSignIn,
    isUserAuthenticated,
    userById
  } = require("../Controllers/auth.js");

const {postStatus,getAllStatusReports}=require('../Controllers/statusReport')

router.param('userId',userById)
router.post('/poststatus/:userId',requireSignIn,isUserAuthenticated,postStatus)
router.get('/getallstatus/:userId',requireSignIn,isUserAuthenticated,getAllStatusReports)


module.exports= router