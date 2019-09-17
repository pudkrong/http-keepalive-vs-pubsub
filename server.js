const express = require('express');
const app = express();

const { ServiceBroker } = require('moleculer');
const broker = new ServiceBroker({
  transporter: {
    type: 'redis'
  }
});

broker.createService({
  name: 'rpc',
  actions: {
    get(ctx) {
      return 'Hello World';
    }
  }
});

app.get('/', function (req, res) {
  res.json({ msg: 'Hello World' });
});

app.listen(3000);
broker.start();
