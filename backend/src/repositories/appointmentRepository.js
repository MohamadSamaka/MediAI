const Appointment = require("../models/appointmentModel");

class AppointmentRepository {
  async create(data) {
    return await Appointment.create(data);
  }

  async findById(id) {
    // populate doctor and patient for richer data (optional)
    return await Appointment.findById(id).populate("doctor patient");
  }

  async findAll() {
    return await Appointment.find().populate("doctor patient");
  }
  
  // Find appointments matching a filter
  async findByFilter(filter) {
    return await Appointment.find(filter).populate("doctor patient");
  }

  async update(id, data) {
    return await Appointment.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Appointment.findByIdAndDelete(id);
  }
}

module.exports = new AppointmentRepository();
