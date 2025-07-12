import { Ratelimit } from "@upstash/ratelimit"
import { Redis } from "@upstash/redis"

import dotenv from "dotenv"

dotenv.config()

const rateLimitObject = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(10, "60 s")
})

export default rateLimitObject