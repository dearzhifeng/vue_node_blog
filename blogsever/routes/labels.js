const config = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');
const sql = $sql.label;

// 连接数据库
let conn = mysql.createConnection(config.mysql);
conn.connect();

/* GET labels listing. */
router.get('/labellist', (req, res)=> {
    let param = req.query;
    param.query = `%${req.query.query}%`
    let total=0;
    conn.query(sql.querynum,[param.query],(err,result)=>{
        if(!err){
            total=result[0]['count(*)']
        }
        else {
            console.log(err)
        }
    })
    conn.query(sql.queryAll,[param.query,param.pagesize*1,(param.pagenum-1)*param.pagesize],(err,result)=>{
        if(!err){
            console.log(result)
            res.json({labellist:result,total})
        }
        else {
            console.log(err)
        }
    })
});

router.get('/labelnamelist',(req,res)=>{
    conn.query(sql.getalllabelsname,(err,result)=>{
        if(!err){
            console.log(result)
            res.send(result)
        }
        else {
            console.log(err)
        }
    })
})

//添加标签事件
router.post('/addlabel',(req,res)=>{
    conn.query(sql.add,[req.body.labelname],(err,result)=>{
        if(!err){
            console.log(result)
            res.send(result)
        }
        else{
            console.log(err)
            res.send(err)
        }
    })
})

//编辑标签事件
router.put('/editlabel',(req,res)=>{
    console.log(req.body)
    conn.query(sql.edit,[req.body.labelname,req.body.id],(err,result)=>{
        if(!err){
            console.log(result)
            res.send(result)
        }
        else{
            console.log(err)
            res.send(err)
        }
    })
})

router.delete('/label/:id',(req,res)=>{
    let id=req.url.split('/')[2]
    conn.query(sql.delete,id,(err,result)=>{
        if(!err){
            console.log(result)
            res.send(result)
        }
        else{
            console.log(err)
            res.send(err)
        }
    })
})


module.exports = router;
