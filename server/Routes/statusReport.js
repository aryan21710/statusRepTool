
const express = require('express');
const router= express.Router()

const {postStatus,getAllStatusReports}=require('../Controllers/statusReport')
const {userById}=require('../Controllers/auth')

router.param('userId',userById)
router.post('/postStatus/:userId',postStatus)
router.get('/getAllStatusReports/:userId',getAllStatusReports)


module.exports= router