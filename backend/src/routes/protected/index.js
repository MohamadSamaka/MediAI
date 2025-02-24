const { Router } = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const protectedRouter = Router();
const ProtectedAppointmentRouters = require("./appointmentRoutes");

protectedRouter.use(authMiddleware)

protectedRouter.use("/appointment", ProtectedAppointmentRouters)

module.exports = protectedRouter;

