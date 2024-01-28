// const app = require("./app")
import { app } from "./app";
import { main } from "./server/db/dbconfiguration";

const port = process.env.PORT || 8000;

app.listen(port, () => {
  main();
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
