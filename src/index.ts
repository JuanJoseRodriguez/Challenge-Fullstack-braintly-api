import "dotenv/config";
import { app } from "./server";

const server = app.listen(process.env.PORT, () => {
  const { NODE_ENV, HOST, PORT } = process.env;
  console.log(`Server (${NODE_ENV}) running on port http://${HOST}:${PORT}`);
});

const onCloseSignal = () => {
  console.log("sigint received, shutting down");
  server.close(() => {
    console.log("server closed");
    process.exit();
  });
  setTimeout(() => process.exit(1), 10000).unref(); // Force shutdown after 10s
};

process.on("SIGINT", onCloseSignal);
process.on("SIGTERM", onCloseSignal);
