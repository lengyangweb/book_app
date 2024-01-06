import userRoute from "./userRoute.js";
import bookRoute from "./bookRouter.js";
import groupRoute from "./groupRouter.js";

const register = (app) => {
  // users
  app.use("/api/users", userRoute);
  // book
  app.use("/api/books", bookRoute);
  // group
  app.use("/api/groups", groupRoute);
};

export default register;
