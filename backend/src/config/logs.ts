import path from "path";
import fs from "fs";

export const createFilePath = () => {
  const logPath = path.join(__dirname, "./logs");

  if (!fs.existsSync(logPath)) {
    fs.mkdirSync(logPath);
  }

  const logFileName = "express.log";

  const logFilePath = path.join(logPath, logFileName);

  const logStream = fs.createWriteStream(logFilePath, { flags: "a" });

  return logStream;
};
