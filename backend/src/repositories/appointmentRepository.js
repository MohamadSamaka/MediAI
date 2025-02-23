const MedicalRecord = require("../models/MedicalRecord");
const Doctor = require("../models/Doctor");
const Appointment = require("../models/Appointment");


class AppointmentRepository {
  async getAppointmentById(id) {
    return await Appointment.findById(id).populate("doctor patient");
  }

  async getAllAppointments() {
    return await Appointment.find().populate("doctor patient");
  }

  async createAppointment(data) {
    return await Appointment.create(data);
  }

  async cancelAppointment(id) {
    return await Appointment.findByIdAndDelete(id);
  }

  async getAppointmentsByUser(userId) {
    return await Appointment.find({ patient: userId }).populate("doctor");
  }

  async getAppointmentsByDoctor(doctorId) {
    return await Appointment.find({ doctor: doctorId }).populate("patient");
  }




}

module.exports = new AppointmentRepository();


