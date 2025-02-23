const { Router } = require("express");
const medicalRecController = require("../controllers/medicalRecController");
const medicalRecRouter = Router();


medicalRecRouter.get("/prescriptions", medicalRecController.getPrescriptions);
medicalRecRouter.get("/:userId", medicalRecordController.getMedicalRecord);
medicalRecRouter.delete("/cancel-appointment/:appointmentId", medicalRecordController.cancelAppointment); // ✅ Cancel Appointment


module.exports = medicalRecRouter; 