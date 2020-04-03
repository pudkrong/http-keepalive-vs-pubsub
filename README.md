# HTTP with Keepalive vs HTTP without Keepalive

I want to demostate how keepalive impacts on the performance. Basically, I have created simple express server application 
and clients to send 20 requests at a time to server and measure the execution time.

I also add pub/sub into the comparision. 

The result is below

## HTTP without keepalive (It fires over 10k connections to server)
```
round 1: 28.950 secs
round 2: 42.912 secs
round 3: 38.237 secs
round 4: 24.884 secs
round 5: 44.157 secs
avg: 35.828 secs
```

## HTTP with keepalive (It fires about 10k connections to server)
```
round 1: 1.959 secs
round 2: 2.701 secs
round 3: 1.760 secs
round 4: 1.461 secs
round 5: 1.362 secs
avg: 1.849 secs
```

## PUB SUB
```
round 1: 4.264 secs
round 2: 4.508 secs
round 3: 4.499 secs
round 4: 4.715 secs
round 5: 3.957 secs
avg: 4.389 secs
```

**Note:** Pub/Sub performance is not good as HTTP because it spends 1 request to redis and 1 more request from redis.
However, we don't need to worry about to setup nginx properly in case we need to run server more than 1 process. 

**nginx does not use keepalive in upstream**
