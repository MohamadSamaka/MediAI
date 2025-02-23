
const { Router } = require("express");

const doctorRouter = Router();

const doctorController = require("../controllers/doctorController");

doctorRouter.get("/:id", doctorController.getDoctor);
doctorRouter.get("/", doctorController.getAllDoctors);
doctorRouter.get("/expertise/:expertise", doctorController.getDoctorsByExpertise);
doctorRouter.get("/:doctorId/Doc-available-appointments", doctorController.getFirstAvailableAppointments);
doctorRouter.delete("/cancel-appointment/:appointmentId", doctorController.cancelAppointment);
doctorRouter.get("/:doctorId/first-available", doctorController.getFirstAvailableAppointment);


module.exports = doctorRouter;

