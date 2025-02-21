const { Router } = require("express");
const medicalRecController = require("../controllers/medicalRecController");
const medicalRecRouter = Router();


medicalRecRouter.get("/prescriptions", medicalRecController.getPrescriptions);


module.exports = medicalRecRouter; 