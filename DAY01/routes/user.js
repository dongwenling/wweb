const express=require('express');
const pool=require('../pool');
//引入连接池模块
//创建空的路由
var router=express.Router();
console.log('111');
//检索用户
router.get('/detail',(req,res)=>{
    var obj=req.query;
    console.log(obj);
    var $uid=obj.uid;
    if(!$uid){
        res.send({code:401,msg:'uid required'});
        return;
    }

    pool.query('select * from xz_user where uid=?',[$uid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    })

});
//用户登录
router.post('/login',(req,res)=>{
    var obj=req.body;
    var $uname=obj.uname;
    var $upwd=obj.upwd;
    if(!$uname){
        res.send({code:401,msg:'uname required'});
        return;
    }
    if(!$upwd){
        res.send({code:401,msg:'upwd required'});
        return;
    }
    pool.query('select * from xz_user where uname=? and upwd=?',[$uname,$upwd],(err,result)=>{

        if (err) throw err;
        if(result.length>0){
            res.send({code:200,msg:'login suc'});
        }else {
            res.send({code:301,msg:'login err'});
        }
    })
});
//用户注册
router.post('/reg',(req,res)=>{
    var obj=req.body;
    var $uname=obj.uname;
    var $upwd=obj.upwd;
    var $email=obj.email;
    var $phone=obj.phone;
    if(!$uname){
        res.send({code:401,msg:'uname required'});
        return;
    }
    if(!$upwd){
        res.send({code:401,msg:'upwd required'});
        return;
    }
    if(!$email){
        res.send({code:401,msg:'email required'});
        return;
    }
    if(!$phone){
        res.send({code:401,msg:'phone required'});
        return;
    }
    pool.query('insert into xz_user set ?',[obj],(err,result)=>{
       if (err) throw err;
       if(result.affectedRows>0){
           res.send({code:200,msg:'reg suc'})
       }
    });

});

//导出路由
module.exports=router;