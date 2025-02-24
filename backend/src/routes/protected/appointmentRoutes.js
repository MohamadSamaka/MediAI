const { Router } = require("express");
const AppointmentController = require("../../controllers/appointmentController");
const ProtectedAppointmentRouters = Router();

ProtectedAppointmentRouters.post("/", (req, res, next) => AppointmentController.create(req, res, next));
ProtectedAppointmentRouters.get("/", (req, res, next) => AppointmentController.getAll(req, res, next));
ProtectedAppointmentRouters.delete("/:id", (req, res, next) => AppointmentController.delete(req, res, next));

module.exports = ProtectedAppointmentRouters;
