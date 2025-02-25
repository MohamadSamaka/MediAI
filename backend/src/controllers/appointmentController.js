const AppointmentService = require("../services/appointmentService");

class AppointmentController {
  async create(req, res, next) {
    try {
      const appointment = await AppointmentService.createAppointment(req.body, req.user);
      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const appointments = await AppointmentService.getAppointments(req.user);
      res.json(appointments);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const appointment = await AppointmentService.getAppointmentById(req.params.id, req.user);
      res.json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const appointment = await AppointmentService.updateAppointment(req.params.id, req.body, req.user);
      res.json(appointment);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await AppointmentService.deleteAppointment(req.params.id, req.user);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AppointmentController();
