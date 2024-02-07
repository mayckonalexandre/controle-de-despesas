import express from 'express';
import morganBody from 'morgan-body';
import cors from 'cors';
import { router } from './route';

const app = express();
const port = 80;
morganBody(app);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router)
app.use((req, res) => res.status(404).json({ statusCode: 404, message: "Not Found" }));

app.listen(port, () => console.log(`🚀🚀 Server running port ${port}`));