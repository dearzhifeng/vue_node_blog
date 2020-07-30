const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

router.get('/admin', (req,res)=>{
     jwt.verify(req.headers.authorization,'zhifeng',(err)=>{
        if (err) {
            console.log('err.message')
            res.send({status: 403, msg: '验证失败,请重新登录！'});
        }
        else {
            console.log('okk')
            res.send({status: 200, msg: '验证成功'});

        }

    })



})

module.exports = router;
