const express=require('express');
const bodyParser=require('body-parser');
const mysql=require('mysql');
var server=express();
server.listen(3000);
//托管静态资源到public下
server.use(express.static('./public'));
//配置中间件
server.use(bodyParser.urlencoded({
    extended:false
}));
//使用连接池连接mysql
var pool=mysql.createPool({
    host:'127.0.0.1',
    port:'3306',
    user:'root',
    password:'',
    database:'tedu',
})

console.log('yes');
//根据表单的请求准备路由
server.get('/add',(req,res)=>{
    console.log('no');
    var obj=req.body;
    console.log(obj);
});

//根据表单的请求准备路由
server.post('/add',(req,res)=>{
    //获取浏览器端post请求的数据
    var obj=req.body;
    //将数据插入到数据库
    pool.query('INSERT INTO emp SET ?',[obj],(err,result)=>{
        if(err) throw err;
        //console.log(result);
        if(result.affectedRows>0){
            res.send({code:200,msg:'add suc'});
        }
    });
});