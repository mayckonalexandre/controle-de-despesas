import express from "express";
import "express-async-errors";
import morganBody from "morgan-body";
import cors from "cors";
import { router } from "./route";
import { limiter } from "./config/rate-limit";
import helmet from "helmet";
import { errorMiddleware } from "./middleware/error";
import { createFilePath } from "./config/logs";

const app = express();

const port = 80;

app.use(helmet());

morganBody(app, {
  noColors: true,
  stream: createFilePath(),
});

morganBody(app);

app.use(limiter);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(router);
app.use((req, res) =>
  res.status(404).json({ statusCode: 404, message: "Not Found" })
);
app.use(errorMiddleware);
app.listen(port, () => {
  console.log(
    "------------------------------------------------------------------------------------"
  );
  console.log("\n");
  console.log(`🚀 Server running on port ${port} !! 🚀`);
  console.log("\n");
  console.log(
    "------------------------------------------------------------------------------------"
  );
});
