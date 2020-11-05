const kafka = require('kafka-node');

const client = new kafka.KafkaClient({kafkaHost: "kafka:9092"});

/*productor*/

const producer = new kafka.Producer(client);

client.createTopics( [{ topic: 'stateOrder', paritions: 5 ,  replicationFactor: 2 }],(err,result)=>{
    if(err) console.log("ERROR AL CREAR TOPICS");
    else console.log(result);
});

const consumerState = new kafka.Consumer(client, [ {topic: 'stateOrder'}]);
const consumerAdd = new kafka.Consumer(client, [ {topic: 'addOrder'}]);

consumerState.on('message',(message)=>{
    console.log(message);
})


consumerAdd.on('message',(message)=>{
    console.log(message);
})