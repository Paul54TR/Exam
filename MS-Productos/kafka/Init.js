const kafka = require('kafka-node');
const Product = require("../models/product");
const client = new kafka.KafkaClient({kafkaHost: "kafka:9092"});

/*productor*/

const producer = new kafka.Producer(client);

client.createTopics( [{ topic: 'CreateProducts', paritions: 5 ,  replicationFactor: 2 },{ topic: 'UpdateProducts', paritions: 20 ,  replicationFactor: 3 }],(err,result)=>{
    if(err) console.log("ERROR AL CREAR TOPICS");
    else console.log(result);
});

const consumerCreate = new kafka.Consumer(client, [ {topic: 'CreateProducts'}]);
const consumerUpdate = new kafka.Consumer(client, [ {topic: 'UpdateProducts'}]);

consumerCreate.on('message',(DataProduct)=>{
    const data =  JSON.stringify(DataProduct.value);
    var newProduct = new Product();
    newProduct.price = data.price;
    newProduct.name = data.name;
    newProduct.amount = data.amount;
    newProduct.save(null,(err,result)=>{
        if(err) console.log("ERROR AL GUARDAR DATOS");
        else console.log(result);
    })
})

consumerUpdate.on('message',(DataUpdate)=>{
    const data = JSON.stringify(DataProduct.value);
    Product.findById(data.Id,(err,product)=>{        
    })
    Product.updateOne({_id: data.Id},{amount: data.stock},(err,docs)=>{
        if(err) console.log("Error al Actualizar");
        else console.log(docs);
    });
})
