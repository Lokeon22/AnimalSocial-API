require("express-async-errors");
import Express from "express";
import { AppError } from "./utils/AppError";

const routes = require("./routes");

const app = Express();

app.use(Express.json());
app.use(routes);

app.use(
  (
    error: Express.ErrorRequestHandler,
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    if (error instanceof AppError) {
      // Client Error
      return res.status(error.statusCode).json({
        status: "error",
        message: error.message,
      });
    }

    return res.status(500).json({
      status: "error",
      message: "Internal server error",
    });
  }
);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
