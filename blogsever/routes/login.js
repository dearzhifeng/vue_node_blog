const config = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');
const jwt = require('jsonwebtoken');
const sql = $sql.user;

// 连接数据库
let conn = mysql.createConnection(config.mysql);
conn.connect();

router.post('/login',(req,res)=>{

    let param = req.body;
    if(!param.username || !param.password){
        res.status=401;
        return;
    }
    console.log('输出req')
    console.log(req.headers.authorization)

    conn.query(sql.login,[param.username], (err,result) => {
        console.log('正在请求')
        console.log(result)
        if(err){
            res.status=400
            console.log(err);
            return;
        }
        if(result.length === 0){
            console.log('用户名不存在');
            res.json({ msg: '用户不存在'});
            return;
        }
        if(param.password !== result[0].password){
            res.json({ status:401, msg: '密码错误'});
            return;
        }
// Token 数据
        const payload = {
            name: param.username
        }
        // 密钥
        const secret = 'zhifeng';
        let token = jwt.sign(payload, secret, { expiresIn: '1day' });
        res.json({ status:200,msg: '登录成功',token:token,username:param.username});

    });

})

module.exports = router;
