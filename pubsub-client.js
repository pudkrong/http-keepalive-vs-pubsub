'use strict';

const { ServiceBroker } = require('moleculer');
const perf = require('execution-time')();
const broker = new ServiceBroker({
  transporter: {
    type: 'redis'
  }
});

(
  async () => {
    await broker.start();

    let promises = [];
    let total = 0;
    for (let i = 0; i < 5; i++) {
      perf.start();
      for (let j = 0; j < 10000; j++) {
        promises.push(broker.call('rpc.get'));

        if (((j + 1) % 20) == 0) {
          await Promise.all(promises);
          // promises = [];
          promises.length = 0;
        }
      }
      const t = perf.stop().time;
      console.log(`round ${i + 1}: ${(t / 1000).toFixed(3)} secs`);

      total += t;
    }

    console.log(`avg: ${(total / 1000 / 5).toFixed(3)} secs`);
  }
)();