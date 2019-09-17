'use strict';

const baseRequest = require('request-promise');
const perf = require('execution-time')();
const http = require('http');
const agent = new http.Agent({
  keepAlive: true,
  maxSockets: 100,
  keepAliveMsecs: 10000,
  timeout: 1000
});

const request = baseRequest.defaults({
  agent: agent
});

try {
(
  async () => {
    let promises = [];
    let total = 0;
    for (let i = 0; i < 5; i++) {
      perf.start();
      for (let j = 0; j < 10000; j++) {
        promises.push(request.get('http://localhost:3000'));

        if (((j + 1) % 20) == 0) {
          await Promise.all(promises);
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
} catch (error) {
  console.error(error);
}