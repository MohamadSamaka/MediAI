const { Router } = require("express");
const AppointmentController = require("../../controllers/appointmentController");
const appointmentRouters = Router();

appointmentRouters.post("/", (req, res, next) => AppointmentController.create(req, res, next));
appointmentRouters.get("/", (req, res, next) => AppointmentController.getAll(req, res, next));
appointmentRouters.get("/:id", (req, res, next) => AppointmentController.getById(req, res, next));
appointmentRouters.put("/:id", (req, res, next) => AppointmentController.update(req, res, next));
appointmentRouters.delete("/:id", (req, res, next) => AppointmentController.delete(req, res, next));

module.exports = appointmentRouters;
