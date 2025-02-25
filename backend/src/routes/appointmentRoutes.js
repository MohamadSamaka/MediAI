
const { Router } = require("express");

const appointmentRouter = Router();

const appointmentController = require("../controllers/appointmentController");
//the ids are appoinment id 
appointmentRouter.get("/:id", appointmentController.getAppointment);
appointmentRouter.get("/", appointmentController.getAllAppointments);
appointmentRouter.post("/", appointmentController.createAppointment);
appointmentRouter.delete("/:id", appointmentController.cancelAppointment);

appointmentRouter.get("/user/:userId", appointmentController.getAppointmentsByUser);//user fetching his future appointments
appointmentRouter.get("/doctor/:doctorId", appointmentController.getAppointmentsByDoctor);//doctor fetching his future appointments

module.exports = appointmentRouter;
