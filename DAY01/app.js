const express=require('express');
const bodyParser=require('body-parser');
const userRouter=require('./routes/user');
//创建web服务器
var server=express();
server.listen(3000);
server.use(express.static('./public'));
//配置中间件
server.use(bodyParser.urlencoded({
    extended: false
}));
server.use('/user',userRouter);
