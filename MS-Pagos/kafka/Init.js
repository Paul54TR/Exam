const kafka = require('kafka-node');

const client = new kafka.KafkaClient({kafkaHost: "kafka:9092"});

/*productor*/

const producer = new kafka.Producer(client);

client.createTopics( [{ topic: 'TOPIC', paritions: 5 ,  replicationFactor: 2 },
{ topic: 'T1', partitions: 23 ,  replicationFactor: 3}],(err,result)=>{
    if(err) console.log("ERROR AL CREAR TOPICS");
    else console.log(result);

});

const consumer = new kafka.Consumer(client, [ {topic: 'TOPIC'}]);

consumer.on('message',(message)=>{
    console.log(message);
})

producer.on("ready",()=>{
    producer.send([{topic: 'TOPIC' , messages: "{'name': 'Paul'}"}],(err,data)=>{
        if(err) console.log("ERROR AL ENVIAR MENSAJE");
        else console.log(data);
    });
})
