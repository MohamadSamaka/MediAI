const appointmentService = require("../services/appointmentService");

class AppointmentController {
  async createAppointment(req, res, next) {
    try {
      const appointment = await appointmentService.createAppointment(
        req.body,
        req.user
      );
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async getAppointment(req, res) {
    try {
      const appointment = await appointmentService.getAppointmentById(
        req.params.id
      );
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointment" });
    }
  }

  async getAllAppointments(req, res) {
    try {
      const appointments = await appointmentService.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching appointments" });
    }
  }

  async cancelAppointment(req, res) {
    try {
      await appointmentService.cancelAppointment(req.params.id, req.user);
      res.json({ message: "Appointment canceled" });
    } catch (error) {
      res.status(500).json({ message: "Error canceling appointment" });
    }
  }

  async getAppointmentsByUser(req, res) {
    try {
      const appointments = await appointmentService.getAppointmentsByUser(
        req.params.userId
      );
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching user appointments" });
    }
  }

  async getAppointmentsByDoctor(req, res) {
    try {
      const appointments = await appointmentService.getAppointmentsByDoctor(
        req.params.doctorId
      );
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctor appointments" });
    }
  }
}

module.exports = new AppointmentController();
