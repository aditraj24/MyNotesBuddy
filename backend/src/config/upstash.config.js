import {Ratelimit} from '@upstash/ratelimit';
import {Redis} from '@upstash/redis';


//create a rateLimiter that allows 100 requests per 60 seconds
const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(100, '60 s'),
  analytics: true,
});

export default ratelimit;