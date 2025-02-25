const { Router } = require("express");
const authMiddleware = require("../../middlewares/authMiddleware");
const protectedRouter = Router();
const ProtectedAppointmentRouter = require("./appointmentRoutes");
const ProtectedexpertiesRouter = require("./expertiseRoutes");

protectedRouter.use(authMiddleware)

protectedRouter.use("/appointment", ProtectedAppointmentRouter)
protectedRouter.use("/expertise", ProtectedexpertiesRouter)

module.exports = protectedRouter;


