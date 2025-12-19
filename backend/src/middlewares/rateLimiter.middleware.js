import rateLimit from "../config/upstash.config.js";
const rateLimiter = async (_, res, next) => {
    try {
        const { success } = await rateLimit.limit('my-rate-limit-key');// req.ip for specific user rate limitting of userid if authentication is there instead of 'my-rate-limit-key'
        
        if (!success) {
            return res.status(429).json({ message: "Too many requests. Please try again later." });
        }
        next();
    } catch (error) {
        console.error(`Rate Limiter Error: ${error}`);
        res.status(500).json({ message: "Internal server error in rate limiter." });
        next(error);
    }
};

export default rateLimiter;
