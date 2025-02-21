const { Router } = require("express");
const authRouter = require("./authRoutes");
const adminRouter = require("./admin");
const appRouter = Router()
const medicalRecRouter = require("./medicalRecordRoutes");

appRouter.use("/api/auth", authRouter);
appRouter.use("/api/admin", adminRouter )
appRouter.use("/api/", medicalRecRouter)

module.exports = appRouter