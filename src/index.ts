import "./utils/configureEnvFile";
import prisma from "./prismaClient";
import server from "./server";
import { PORT, NODE_ENV } from "./utils/env";

prisma.$connect().then(() => {
  server.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server is running on http://localhost:${PORT} in ${NODE_ENV} mode`);
  });
});
