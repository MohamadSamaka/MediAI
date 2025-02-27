
const { Router } = require("express");

const appointmentRouter = Router();

const appointmentController = require("../../controllers/appointmentController");
//the ids are appoinment id 
appointmentRouter.get("/:id",(req, res)=> appointmentController.getAppointment(req, res));
appointmentRouter.get("/",(req, res)=> appointmentController.getAllAppointments(req, res));

appointmentRouter.post("/",(req, res, next)=> appointmentController.createAppointment(req, res, next));
appointmentRouter.delete("/:id",(req, res)=> appointmentController.cancelAppointment(req, res));

appointmentRouter.get("/user/:userId",(req, res) => appointmentController.getAppointmentsByUser(req, res));//user fetching his future appointments
appointmentRouter.get("/doctor/:doctorId",(req, res)=> appointmentController.getAppointmentsByDoctor(req, res));//doctor fetching his future appointments

module.exports = appointmentRouter;


//next in controller 
