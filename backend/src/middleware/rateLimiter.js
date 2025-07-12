import rateLimit from "../config/upstash.js"

const rateLimiter = async (_, res, next) => {
    try {
        const { success } = await rateLimit.limit("my-limit-key")

        if (!success) return res.status(429).json({ message: "Too many requests" })

        next()
    } catch (error) {
        console.error(error)
        res.status(500).json({ message: "Internal server error" })
    }
}

export default rateLimiter