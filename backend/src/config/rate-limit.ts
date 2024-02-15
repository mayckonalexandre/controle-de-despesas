import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 50,
  standardHeaders: true,
  legacyHeaders: true,
  handler: async (req, res) => {
    return res.status(429).json({
      statusCode: 429,
      success: false,
      message: "Limite de conexões atingido, tente novamente em 1 minuto.",
    });
  },
});
