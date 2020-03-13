const express=require('express');
const pool=require('../pool');
var router=express.Router();
router.post('/login',(req,res)=>{
    var obj=req.body;
    console.log(obj);
    var $uname=obj.uname;
    var $upwd=obj.upwd;
    if(!$uname){
        res.send("用户名不存在");
        return;
    }
    if(!$upwd){
        res.send("密码不存在");
        return;
    }

    pool.query('select * from xz_user where uname=? and upwd=?',[$uname,$upwd],(err,result)=>{

        if(err) throw err;
        if(result.length>0){
            res.send({code:200,msg:"登录成功"});
        }else {
            res.send({code:300,msg:"用户名密码错误"})
        }
    })
})
module.exports=router;