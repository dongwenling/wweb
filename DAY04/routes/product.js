const express=require('express');
const pool=require('../pool');
var router=express.Router();
//商品列表
router.get('/list',(req,res)=>{
var $pno=parseInt(req.query.pno);
var $count=parseInt(req.query.count);
if(!$pno){
    $pno=1;
}
if(!$count){
    $count=2
}
var $start=($pno-1)*$count;
pool.query('select * from xz_laptop limit ?,?',[$start,$count],(err,result)=>{
    if (err) throw err;
    if(result.length>0){
        res.send({code:200,msg:result});
    }
})
});
//添加商品
router.post('/add',(req,res)=>{
    var obj=req.body;
    console.log(obj);
    var i=400;
    for(var key in obj){
        i++;
       if(!obj[key]){
           res.send({code:i,msg:key+'required'});
           return;
       }
    }
    pool.query('insert into xz_laptop set ?',[obj],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:200,msg:result});
        }
    })

});
module.exports=router;
