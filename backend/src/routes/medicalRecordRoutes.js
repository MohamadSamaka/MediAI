const { Router } = require("express");
const medicalRecController = require("../controllers/medicalRecController");
const { model } = require("mongoose");
const medicalRecRouter = Router();


medicalRecRouter.get("/prescriptions", medicalRecController.getPrescriptions);
//medicalRecRouter.get("/diagnosis", medicalRecController.getDiagnosis);//continue later 


module.exports = medicalRecRouter; 