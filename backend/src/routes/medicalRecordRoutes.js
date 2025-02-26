const { Router } = require("express");
const medicalRecController = require("../controllers/medicalRecController");
const medicalRecRouter = Router();


medicalRecRouter.get("/prescriptions", medicalRecController.getPrescriptions);
medicalRecRouter.get("/:userId", medicalRecController.getMedicalRecord);
medicalRecRouter.delete("/cancel-appointment/:appointmentId", medicalRecController.cancelAppointment); // ✅ Cancel Appointment


module.exports = medicalRecRouter; 