const config = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');
const sql = $sql.category;

// 连接数据库
let conn = mysql.createConnection(config.mysql);
conn.connect();

/* GET categorys listing. */
router.get('/categorylist', (req, res)=> {
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
            res.json({categorylist:result,total})
        }
        else {
            console.log(err)
        }
    })
});

//获取分类名称
router.get('/categorynamelist',(req,res)=>{
    conn.query(sql.getallcategoriesname,(err,result)=>{
        if(!err){
            console.log(result)
            res.send(result)
        }
        else {
            console.log(err)
        }
    })
})

//添加分类事件
router.post('/addcategory',(req,res)=>{
    conn.query(sql.add,[req.body.categoryname],(err,result)=>{
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

//编辑分类事件
router.put('/editCategory',(req,res)=>{
    console.log(req.body)
    conn.query(sql.edit,[req.body.categoryname,req.body.id],(err,result)=>{
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

router.delete('/category/:id',(req,res)=>{
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
