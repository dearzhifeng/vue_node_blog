const config = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');
const sql = $sql.user;

// 连接数据库
let conn = mysql.createConnection(config.mysql);
conn.connect();

/* GET users listing. */
router.get('/userlist', function(req, res) {
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
      res.json({userlist:result,total})
    }
    else {
      console.log(err)
    }
  })
});

//添加用户
router.post('/adduser',(req ,res)=>{
  console.log(req.body)
  console.log('正在请求adduser' )
  conn.query(sql.add, [req.body['username'],req.body['password'],req.body['email'],req.body['phone']],(err,result)=>{
    if(!err){
      console.log(result)
      res.json({status:200})
    }
    else{
      console.log(err)
      res.json({status:201})
    }
  })

})

//修改用户状态
router.put('/users/:id/state/:state',(req,res)=>{
    //console.log(req)
  console.log(req.url.split('/'))
    let id=req.url.split('/')[2]
    let state = req.url.split('/')[4]
    console.log(typeof(id))
    console.log(state)
    conn.query(sql.updatestate,[state,id],(err,result)=>{
      if(!err){
        console.log(result)
        res.json({status:200})
      }
      else{
        console.log(err)
        res.json({status:201})
      }
    })
})

//获取单条用户
router.get('/users/:id',(req,res)=>{
  let id=req.url.split('/')[2]
  conn.query(sql.querybyid,id,(err,result)=>{
    if(err){
      console.log(err)
      res.json({status:201})
    }
    else{
      console.log(result)
      res.json({user:result})
    }
  })
})

//修改用户信息
router.put('/edituser', (req,res)=>{
  const editForm = req.body
  console.log(editForm)
  conn.query(sql.updateusers,[editForm.username,editForm.password,editForm.email,editForm.phone,editForm.id],(err,result)=>{
    if(!err){
      console.log(result)
      res.json({status:200})
    }
    else{
      console.log(err)
      res.json({status:201})
    }
  })
})

//删除用户
router.delete('/users/:id', (req,res) =>{
  let id=req.url.split('/')[2]
  conn.query(sql.deleteuser,id,(err,result)=>{
    if(!err){
      console.log(result)
      res.json({status:200})
    }
    else{
      console.log(err)
      res.json({status:201})
    }
  })
})



module.exports = router;
