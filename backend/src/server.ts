import express from 'express';
import morganBody from 'morgan-body';
import cors from 'cors';
import { router } from './route';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';
import helmet from 'helmet';

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 50,
    standardHeaders: true,
    legacyHeaders: true,
    handler: async (req, res) => { return res.status(429).json({ statusCode: 429, success: false, message: "Limite de conexões atingido, tente novamente em 1 minuto." }) }
});

const logPath = path.join(__dirname, './logs');
if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
};

const logFileName = 'express.log';
const logFilePath = path.join(logPath, logFileName);
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const app = express();
const port = 80;
app.use(helmet());
morganBody(app, {
    noColors: true,
    stream: logStream
});
morganBody(app);
app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.use((req, res) => res.status(404).json({ statusCode: 404, message: "Not Found" }));

app.listen(port, () => console.log(`🚀🚀 Server running port ${port}`));