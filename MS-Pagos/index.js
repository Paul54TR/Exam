var express = require('express');
var jwt = require('jsonwebtoken');
var app = express();
var port = 3000;



app.listen(port,()=>{
    console.log("Sevidor corriendo en puerto: " + port);
});