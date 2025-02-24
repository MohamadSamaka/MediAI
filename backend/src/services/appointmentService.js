const AppointmentRepository = require("../repositories/appointmentRepository");
const { validateAppointmentCreation, validateAppointmentUpdate } = require("../validators/appointmentValidator");
const JsonedResponseError = require("../errors/JsonedResponseError");
const Doctor = require("../models/doctorModel");

class AppointmentService {
  // Create an appointment.
  // For a normal user, ensure that the "patient" field is set to the current user.
  async createAppointment(data, reqUser) {
    // Validate data with Joi.
    validateAppointmentCreation(data);
    
    // If the payload provides a doctors array, check that each doctor exists.
    if (data.doctors && Array.isArray(data.doctors)) {
      for (const doctorId of data.doctors) {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) {
          throw new JsonedResponseError(`Doctor not found with id: ${doctorId}`, 404);
        }
      }
      // For our Appointment schema we expect a single doctor,
      // so assign the first valid one.
      data.doctor = data.doctors[0];
    } else if (data.doctor) {
      const doctor = await Doctor.findById(data.doctor);
      if (!doctor) {
        throw new JsonedResponseError(`Doctor not found with id: ${data.doctor}`, 404);
      }
    } else {
      throw new JsonedResponseError("No doctor information provided", 400);
    }
    
    // For normal users, ensure they can only create an appointment for themselves.
    if (reqUser.role.toLowerCase() !== "admin" && reqUser.role.toLowerCase() !== "doctor") {
      // If patient is not provided, set it to the current user's id.
      data.patient = reqUser.id;
    }
    
    return await AppointmentRepository.create(data);
  }

  // Get list of appointments based on role:
  // - Admin sees all.
  // - Doctor sees only appointments where they are assigned.
  // - Normal user sees only appointments where they are the patient.
  async getAppointments(reqUser) {
    let filter = {};
    console.log(reqUser)
    if (reqUser.role === "doctor") {
      filter.doctor = reqUser.id;
    } else {
      filter.patient = reqUser.id;
    }
    return await AppointmentRepository.findByFilter(filter);
  }

  // Get a specific appointment.
  // Enforce that a normal user or doctor can access only their own appointments.
  async getAppointmentById(id, reqUser) {
    const appointment = await AppointmentRepository.findById(id);
    if (!appointment) throw new JsonedResponseError("Appointment not found", 404);

    // Admin can access any.
    if (reqUser.role === "admin") return appointment;

    // Doctor: only allow if appointment.doctor matches.
    if (reqUser.role === "doctor") {
      if (appointment.doctor.toString() !== reqUser.id) {
        throw new JsonedResponseError("Not authorized to access this appointment", 403);
      }
    } else {
      // Normal user: only allow if appointment.patient matches.
      if (!appointment.patient || appointment.patient.toString() !== reqUser.id) {
        throw new JsonedResponseError("Not authorized to access this appointment", 403);
      }
    }
    return appointment;
  }

  // Update an appointment.
  // We assume that update operations (e.g., canceling an appointment) are allowed only if the current user
  // is authorized to access the appointment.
  async updateAppointment(id, data, reqUser) {
    // Validate update payload.
    validateAppointmentUpdate(data);
    // First, get the appointment and check permissions.
    await this.getAppointmentById(id, reqUser);
    // For admin, or for doctor if it's their own appointment, or for a normal user (patient) if it's theirs.
    return await AppointmentRepository.update(id, data);
  }

  // Delete (cancel) an appointment.
  // Normal users can only cancel their own appointments.
  async deleteAppointment(id, reqUser) {
    // Check that the appointment exists and that the user is allowed to cancel.
    await this.getAppointmentById(id, reqUser);
    return await AppointmentRepository.delete(id);
  }
}

module.exports = new AppointmentService();
