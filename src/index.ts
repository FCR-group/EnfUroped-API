import server from "./server";
import UTILS from "./utils/consts";

server.listen(UTILS.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server is running on http://localhost:${UTILS.PORT}`);
});
