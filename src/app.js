import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.route.js";
import { notFound, errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Portal API");
});

app.use("/api/auth", authRoutes);

// error middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
