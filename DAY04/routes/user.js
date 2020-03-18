const express=require('express');
const pool=require('../pool');
var router=express.Router();
//用户登录
router.get('/login',(req,res)=>{
    console.log("1111")
    var obj=req.query;
    var $uname=obj.uname;
    var $upwd=obj.upwd;
    if(!$uname){
        res.send({code:401,msg:"uname required"})
    }
    if(!$upwd){
        res.send({code:402,msg:"upwd required"})
    }
    pool.query('select * from xz_user where uname=? and upwd=?',[$uname,$upwd],(err,result)=>{
        if (err) throw err;
        if(result.length>0){
            res.send({code:200,msg:result});
        }else {
            res.send({code:200,msg:"login err"});
        }
    })
});
//用户注册
router.post('/reg',(req,res)=>{
    console.log("reg")
    var obj=req.body;
    var $uname=obj.uname;
    var $upwd=obj.upwd;
    var $email=obj.email;
    var $phone=obj.phone;
    if(!$uname){
        res.send({code:401,msg:"uname required"});
        return;
    }
    if(!$upwd){
        res.send({code:402,msg:'upwd required'});
        return;
    }
    if(!$email){
        res.send({code:403,msg:'email required'});
        return;
    }
    if(!$phone){
        res.send({code:404,msg:'phone required'});
        return;
    }

    pool.query('insert into xz_user set ?',[obj],(err,result)=>{
        if (err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:"reg suc"});
        }
    })
});
//用户修改
router.post('/update',(req,res)=>{
    console.log("update");
    var obj=req.body;
    var $uid=obj.uid;
    var $email=obj.email;
    var $phone=obj.phone;
    var $user_name=obj.user_name;
    var $gender=obj.gender;
    var $uname=obj.uname;
    var $upwd=obj.upwd;
    console.log("aaaa"+$uid);
    console.log($uname);
    console.log($uid,$email,$phone,$user_name,$gender);
    if(!$uid){
        res.send({code:401,msg:'uid required'});
        return;
    }
    if(!$email){
        res.send({code:402,msg:'email required'});
        return;
    }
    // if(!$phone){
    //     res.send({code:403,msg:'phone required'});
    //     return;
    // }
    if(!$user_name){
        res.send({code:404,msg:'user_name required'});
        return;
    }
    if(!$gender){
        res.send({code:405,msg:'gender required'});
        return;
    }
    pool.query('update xz_user set email=?,  uname=? ,user_name=? , gender=? , upwd=? where uid=?',[$email,$uname,$user_name,$gender,$upwd,$uid],(err,result)=>{
        if (err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:"update suc"});
        }else {
            res.send({code:301,msg:"update err"});
        }
    })

});
//用户详情
router.get('/detail',(req,res)=>{
    var obj=req.query;
    var $uid=obj.uid;
    if(!$uid){
        res.send({code:400,msg:"uid required"});
    }
    pool.query('select * from xz_user where uid=?',[$uid],(err,result)=>{
        if (err) throw err;
        if(result.length>0){
            res.send(result);
        }
    })

});
//删除用户
router.get('/delete',(req,res)=>{
console.log("5555555");
    var obj=req.query;
    var $uid=obj.uid;
    if(!$uid){
        res.send({code:400,msg:"uid required"});
    }
    pool.query('delete from xz_user where uid=?',[$uid],(err,result)=>{
        if (err) throw err;
        if(result.affectedRows>0){
            res.send("1");
        }else {
            res.send("0");
            }
    });

});
//用户列表
router.post('/list',(req,res)=>{
    console.log("222222");
    var obj=req.body;
    console.log(typeof(obj.pno));
    var $pno=parseInt(obj.pno);
    var $count=parseInt(obj.count);
    if(!$pno){
        $pno=1;
    };
    if(!$count){
        $count=1000;
    };
    var $start=($pno-1)*$count;

    pool.query('select * from xz_user limit ?,?',[$start,$count],(err,result)=>{
        if (err) throw err;
        if(result.length>0){
            res.send(result);
        }
    });
    //     pool.query('SELECT * FROM xz_user LIMIT ?,?',[$start,$count],(err,result)=>{
    //     if(err) throw err;
    //
    //     res.send(result);
    // });
});
// router.get('/list',(req,res)=>{
//     //获取数据
//     var obj=req.query;
//     //转整型
//     var $pno=parseInt(obj.pno);
//     var $count=parseInt(obj.count);
//     //验证数据,如果页码为空，赋值为1
//     //如果数量为空，赋值3
//     if(!$pno){
//         $pno=1;
//     }
//     if(!$count){
//         $count=3;
//     }
//     //计算start
//     var $start=($pno-1)*$count;
//     //执行SQL语句
//     pool.query('SELECT * FROM xz_user LIMIT ?,?',[$start,$count],(err,result)=>{
//         if(err) throw err;

//         res.send(result);
//     });
// });


module.exports=router;
