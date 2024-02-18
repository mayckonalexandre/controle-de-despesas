
module.exports = {
  apps: [
    {
      name: "apinode",
      script: "./dist/server.js",
      instances: "max",
      exec_mode: "cluster",
      max_memory_restart: "1G",
      max_restarts: "10",
    },
  ],
};