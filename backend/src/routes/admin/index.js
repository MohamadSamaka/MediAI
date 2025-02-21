const { Router } = require("express");
const adminRouter = Router()
const adminMiddleware = require("../../middlewares/adminMiddleware");
const authMiddleware = require("../../middlewares/authMiddleware");
const userRouter = require("./userRoutes");
const roleRouter = require("./roleRoutes");

adminRouter.use(authMiddleware)
adminRouter.use(adminMiddleware)

adminRouter.use("/user", userRouter)
adminRouter.use("/role", roleRouter)

module.exports = adminRouter