const express = require('express');
const router = express.Router();
const loginRouter = require('./login')
const adminRouter = require('./admin')
const userRouter = require('./users')
const labelRouter = require('./labels')
const categoryRouter = require('./categories')
 const articleRouter = require('./articles')




router.use('/',loginRouter,adminRouter,userRouter,labelRouter,categoryRouter,articleRouter);
// router.get('/admin',async function verifyToken(req, res, next) {
// // if(req.url.indexOf('admin')>-1){
// // let token =
// // }
//     console.log(req)
//     console.log('123')
//     next()
// })

module.exports = router;
