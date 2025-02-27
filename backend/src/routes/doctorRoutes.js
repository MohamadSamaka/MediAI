
const { Router } = require("express");

const doctorRouter = Router();

const doctorController = require("../controllers/doctorController");

doctorRouter.get("/:id", doctorController.getDoctor);
doctorRouter.get("/", doctorController.getAllDoctors);
doctorRouter.get("/expertise/:expertise", doctorController.getDoctorsByExpertise);
<<<<<<< Updated upstream
doctorRouter.get("/:doctorId/Doc-available-appointments", doctorController.getFirstAvailableAppointments);
=======

>>>>>>> Stashed changes
doctorRouter.delete("/cancel-appointment/:appointmentId", doctorController.cancelAppointment);
doctorRouter.get("/:doctorId/availableAppointments", doctorController.getAvailableAppointments);// ret format [{ "date": "2025-02-27", "time": "10:00:00"}]
doctorRouter.get("/:doctorId/appointments", doctorController.getDoctorAppointments);


module.exports = doctorRouter;

