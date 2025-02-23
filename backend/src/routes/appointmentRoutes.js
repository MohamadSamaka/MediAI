
const { Router } = require("express");

const appointmentRouter = Router();

const appointmentController = require("../controllers/appointmentController");

appointmentRouter.get("/:id", appointmentController.getAppointment);
appointmentRouter.get("/", appointmentController.getAllAppointments);
appointmentRouter.post("/", appointmentController.createAppointment);
appointmentRouter.delete("/:id", appointmentController.cancelAppointment);
appointmentRouter.get("/user/:userId", appointmentController.getAppointmentsByUser);
appointmentRouter.get("/doctor/:doctorId", appointmentController.getAppointmentsByDoctor);

module.exports = appointmentRouter;
