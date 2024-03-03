import authRoute from "./auth.js";
import messageRoute from "./message.js";
const routes = (app) => {
  app.use("/", authRoute);
  app.use("/message", messageRoute);
};
export default routes;
