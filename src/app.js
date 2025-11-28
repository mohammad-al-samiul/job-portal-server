import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // ← MUST IMPORT THIS

import { notFound, errorHandler } from "./middlewares/error.middleware.js";

import jobRouter from "./modules/job/job.route.js";
import userRouter from "./modules/user/user.route.js";
import adminRouter from "./modules/admin/admin.route.js";
import authRouter from "./modules/auth/auth.route.js";
import applicationRouter from "./modules/application/application.route.js";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://job-portal-client-neon-sigma.vercel.app",
    ],
    credentials: true, // Required for cookie auth
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

// Default route
app.get("/", (req, res) => {
  res.send("Job Portal API");
});

// All routes
app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/jobs", jobRouter);
app.use("/api/applications", applicationRouter);
app.use("/api/admin", adminRouter);

// Error handlers
app.use(notFound);
app.use(errorHandler);

export default app;
