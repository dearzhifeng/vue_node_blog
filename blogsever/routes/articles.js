const config = require('../db/db');
const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const $sql = require('../db/sqlMap');
const sql = $sql.article;

// 连接数据库
let conn = mysql.createConnection(config.mysql);
conn.connect();

function dateFormat (originVal) {
    const dt = new Date(originVal)

    const y = dt.getFullYear()
    const m = (dt.getMonth() + 1 + '').padStart(2, '0')
    const d = (dt.getDate() + '').padStart(2, '0')

    const hh = (dt.getHours() + '').padStart(2, '0')
    const mm = (dt.getMinutes() + '').padStart(2, '0')
    const ss = (dt.getSeconds() + '').padStart(2, '0')

    return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
}

//添加文章
router.post('/addarticle',(req,res)=>{
    const title = req.body['title']
    const category = req.body['category']
    const labels = req.body['labels'].join(",")
    const author = req.body['author']
    const cover = req.body['cover']
    const content = req.body['content']
    const html = req.body['html']
    const createtime = dateFormat(req.body['createtime'])
console.log(createtime)
   // res.send('ok')
    conn.query(sql.add, [title,category,labels,author,cover,content,html,createtime],(err,result)=>{
        if(!err){
            console.log(result)
            res.send({result,status:200})
        }
        else{
            console.log(err)
            res.send(err)
        }
    })
})

//获取所有文章
router.get('/articlelist', function(req, res) {
    let param = req.query;
    param.query = `%${req.query.query}%`
    console.log(param.query)
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
            res.json({articlelist:result,total})
        }
        else {
            console.log(err)
        }
    })
});

//前台获取文章
// router.get('/blogarticlelist', function(req, res) {
//     let param = req.query;
//     console.log(req.query)
//     param.queryvalue = `%${req.query.queryvalue}%`
//
//    // console.log(param.queryvalue)
//     let total=0;
//     conn.query(sql.blogquerynum,[param.queryname,param.queryvalue],(err,result)=>{
//         if(!err){
//             total=result[0]['count(*)']
//         }
//         else {
//             console.log(err)
//         }
//     })
//     conn.query(sql.blogqueryAll,[param.queryname,param.queryvalue,param.pagesize*1,(param.pagenum-1)*param.pagesize],(err,result)=>{
//         if(!err){
//             res.json({articlelist:result,total})
//         }
//         else {
//             console.log(err)
//         }
//     })
// });

router.get('/blogarticlelist',(req,res)=>{
    let param = req.query;
    param.query = `%${req.query.query}%`
    console.log(param.query)
    let total=0;
    if(param.queryname ==='title'){
        conn.query(sql.blogquerynumbytitle,[param.query],(err,result)=>{
            if(!err){
                total=result[0]['count(*)']
            }
            else {
                console.log(err)
            }
        })
        conn.query(sql.blogquerybytitle,[param.query,param.pagesize*1,(param.pagenum-1)*param.pagesize],(err,result)=>{
            if(!err){
                res.json({articlelist:result,total})
            }
            else {
                console.log(err)
            }
        })
    }
    else if(param.queryname ==='category'){
        conn.query(sql.blogquerynumbycategory,[param.query],(err,result)=>{
            if(!err){
                total=result[0]['count(*)']
            }
            else {
                console.log(err)
            }
        })
        conn.query(sql.blogquerybycategory,[param.query,param.pagesize*1,(param.pagenum-1)*param.pagesize],(err,result)=>{
            if(!err){
                res.json({articlelist:result,total})
            }
            else {
                console.log(err)
            }
        })
    }
    else {
        conn.query(sql.blogquerynumbylabel,[param.query],(err,result)=>{
            if(!err){
                total=result[0]['count(*)']
            }
            else {
                console.log(err)
            }
        })
        conn.query(sql.blogquerybylabel,[param.query,param.pagesize*1,(param.pagenum-1)*param.pagesize],(err,result)=>{
            if(!err){
                res.json({articlelist:result,total})
            }
            else {
                console.log(err)
            }
        })
    }
})


//根据id获取单篇文章
router.get('/article/:id',(req,res)=>{
    let id=req.url.split('/')[2]
    conn.query(sql.querybyid,id,(err,result)=>{
        if(err){
            console.log(err)
            res.json({status:201})
        }
        else{
            console.log(result)
            res.json({article:result})
        }
    })
})

//修改文章
router.put('/editarticle',(req,res)=>{
    const id = req.body['id']
    const title = req.body['title']
    const category = req.body['category']
    const labels = req.body['labels'].join(",")
    const cover = req.body['cover']
    const content = req.body['content']
    const html = req.body['html']

    conn.query(sql.edit, [title,category,labels,cover,content,html,id],(err,result)=>{
        if(!err){
            console.log(result)
            res.send({result,status:200})
        }
        else{
            console.log(err)
            res.send(err)
        }
    })
})

//修改文章状态
router.put('/article/:id/state/:state',(req,res)=>{
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

//删除文章
router.delete('/article/:id', (req,res) =>{
    let id=req.url.split('/')[2]
    conn.query(sql.delete,id,(err,result)=>{
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



//前台获取热门文章
router.get('/ArticleListByCategory',(req,res)=>{
    conn.query(sql.blogquerybycategory,[],(err,result)=>{
        if(!err){
            res.json({articlelist:result})
        }
        else {
            console.log(err)
        }
    })
})


//前台根据分类搜索文章
router.get('/NewArticles',(req,res)=>{
    conn.query(sql.blogqueryNew,[],(err,result)=>{
        if(!err){
            res.json({articlelist:result})
        }
        else {
            console.log(err)
        }
    })
})


module.exports = router
