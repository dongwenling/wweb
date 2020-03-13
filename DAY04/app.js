const express=require('express');
const bodyParser=require('body-parser');
const productRouter=require('./routes/product');
const userRouter=require('./routes/user');
const demoRouter=require('./routes/demo');
const myProRouter=require('./routes/myPro');
var server=express();
server.listen(3000);
server.use(express.static('./public'));
server.use(express.static('./ajax'));
server.use(express.static('./myPro'));
server.use(bodyParser.urlencoded({
    extended:false
}));
server.use('/user',userRouter);
server.use('/product',productRouter);
server.use('/demo',demoRouter);
server.use('/myPro',myProRouter);