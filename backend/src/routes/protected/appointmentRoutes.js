const { Router } = require("express");
const AppointmentController = require("../../controllers/appointmentController");
const ProtectedAppointmentRouter = Router();

ProtectedAppointmentRouter.post("/", (req, res, next) => AppointmentController.create(req, res, next));
ProtectedAppointmentRouter.get("/", (req, res, next) => AppointmentController.getAll(req, res, next));
ProtectedAppointmentRouter.delete("/:id", (req, res, next) => AppointmentController.delete(req, res, next));

module.exports = ProtectedAppointmentRouter;
