const amqplib = require('amqplib/callback_api');
const queue = 'command';
const fetch = (...args) =>
  import('node-fetch').then(({ default: fetch }) => fetch(...args));

amqplib.connect('amqp://rabbitmq', (err, conn) => {
  if (err) throw err;

  // Listener
  conn.createChannel((err, ch2) => {
    if (err) throw err;

    ch2.assertQueue(queue);

    ch2.consume(queue, (msg) => {
      if (msg !== null) {
        const data = JSON.parse(msg.content)
        const id = data.id;

        fetch(`http://api:8088/api/commands`,  {
          method: 'put',
          body: JSON.stringify({
            _id: id,
            flag: 2
          }),
          headers: {'Content-Type': 'application/json'}
        })
          .then((response) => response.json().then((data) => console.log(`Commande ${data.name} traitée`)))
        
        ch2.ack(msg);
      } else {
        console.log('Consumer cancelled by server');
      }
    });
  });
});