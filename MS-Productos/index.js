var express = require('express');
var jwt = require("./auth");
var Product = require("./models/product");
require("./database");
require("./kafka/Init");

var app = express();
var port = 3000;

app.get("/getToken",(req,res)=>{
    let token = jwt.sign({"body" : "stuff"},"Word Secret",{algorithm: 'HS256'});
    res.send({token: token});
});

app.get("/getProducts",jwt,(req,res)=>{
    Product.find({},(err,result)=>{
        console.log(result);
        if(err) return res.status(500).send("ERROR AL TRAER DATOS");
        if(!result) return res.status(400).send("NO HAY REGISTROS");        
        return res.status(200).send(result);
    });
})

app.listen(port,()=>{
    console.log("Sevidor corriendo en puerto: " + port);
});
