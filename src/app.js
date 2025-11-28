import express from "express";
import cors from "cors";

import { notFound, errorHandler } from "./middlewares/error.middleware.js";

import jobRouter from "./modules/job/job.route.js";
import userRouter from "./modules/user/user.route.js";
import adminRouter from "./modules/admin/admin.route.js";
import authRouter from "./modules/auth/auth.route.js";
import applicationRouter from "./modules/application/application.route.js";

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://job-portal-client-neon-sigma.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Job Portal API");
});

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/admin", adminRouter);

// error middlewares
app.use(notFound);
app.use(errorHandler);

export default app;
