var express = require('express');
var jwt = require('jsonwebtoken');
var Order = require("./models/orders")
var app = express();
var port = 3000;

app.get("/getJwt",(req,res)=>{
    let token = jwt.sign({"body" : "stuff"},"Word Secret",{algorithm: 'HS256'});
    res.send({token: token});
})
app.get("/getOrders",jwt,(req,res)=>{
    Order.find({},(err,result)=>{
        if(err) console.log("Error al intentar acceder a lista");
        res.send(result);
    })
})


app.listen(port,()=>{
    console.log("Sevidor corriendo en puerto: " + port);
});