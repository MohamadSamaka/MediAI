const appointmentRepository = require("../repositories/appointmentRepository");
const medicalRecordRepository = require("../repositories/medicalRecordRepository");
const doctorRepository = require("../repositories/doctorRepository");

class AppointmentService {
  async getAppointmentById(id) {
    return await appointmentRepository.getAppointmentById(id);
  }

  async getAllAppointments() {
    return await appointmentRepository.getAllAppointments();
  }

  async createAppointment(data) {
    const appointment = await appointmentRepository.createAppointment(data);

    // Add appointment to user's medical record
    await medicalRecordRepository.addAppointment(data.patient, {
      appointment_time: data.dateTime,
      appointment_id: appointment._id,
    });

    // Add appointment to doctor's schedule
    await doctorRepository.addAppointment(data.doctor, {
      appointment_time: data.dateTime,
      appointment_id: appointment._id,
    });

    return appointment;
  }
//removing from array of appointment of doc and patient then deltes obj
  async cancelAppointment(id) {
    const appointment = await appointmentRepository.getAppointmentById(id);

    if (!appointment) throw new Error("Appointment not found");

    // Remove from user medical record
    await medicalRecordRepository.removeAppointment(appointment.patient, id);

    // Remove from doctor's schedule
    await doctorRepository.removeAppointment(appointment.doctor, id);

    // Delete appointment from the system
    await appointmentRepository.cancelAppointment(id);
  }

  //Removing appointments that already happened in users and doc future appointments
  //*use func in service to go through array of appointments do remove those who are done
  async removeAppointment(id){
    const appointment = await appointmentRepository.getAppointmentById(id);

    if (!appointment) throw new Error("Appointment not found");
    
    // Remove from user medical record
    await medicalRecordRepository.removeAppointment(appointment.patient, id);

    // Remove from doctor's schedule
    await doctorRepository.removeAppointment(appointment.doctor, id);

  }

  async getAppointmentsByUser(userId) {
    return await appointmentRepository.getAppointmentsByUser(userId);
  }

  async getAppointmentsByDoctor(doctorId) {
    return await appointmentRepository.getAppointmentsByDoctor(doctorId);
  }
}

module.exports = new AppointmentService();
