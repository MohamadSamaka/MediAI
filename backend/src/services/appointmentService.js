const appointmentRepository = require("../repositories/appointmentRepository");
const medicalRecordRepository = require("../repositories/medicalRecRepository");
const doctorRepository = require("../repositories/doctorRepository");
const JsonedResponseError = require("../errors/JsonedResponseError");

class AppointmentService {
  async createAppointment(data, reqUser) {
    //we get dateTime, doc ID user Id , location
    // Validate data with Joi.
    validateAppointmentCreation(data);
    if (reqUser == "admin" || data.patient == reqUser) {
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
    } else {
      throw new JsonedResponseError(
        "youre not allowed to make a reservation for other patients"
      );
    }
  }

  async getAppointmentById(id) {
    return await appointmentRepository.getAppointmentById(id);
  }

  async getAllAppointments() {
    return await appointmentRepository.getAllAppointments();
  }

  //removing from array of appointment of doc and patient then deltes obj
  async cancelAppointment(id, reqUser) {
    const appointment = await appointmentRepository.getAppointmentById(id);

    if (!appointment)
      throw new JsonedResponseError("Appointment not found", 404);
    //if admin or if doc/user that are in the appointment
    if (reqUser.role.toLowerCase() == "doctor") {
      const doc_id = await doctorRepository.getDoctorByUserId(reqUser.id);
      if (doc_id == id.doctor) {
        // Remove from user medical record
        await medicalRecordRepository.removeAppointment(
          appointment.patient,
          id
        );

        // Remove from doctor's schedule
        await doctorRepository.removeAppointment(appointment.doctor, id);

        // Delete appointment from the system
        await appointmentRepository.cancelAppointment(id);
      }
    } else if (
      reqUser.role.toLowerCase() == "admin" ||
      appointment.patient == reqUser.id
    ) {
      // Remove from user medical record
      await medicalRecordRepository.removeAppointment(appointment.patient, id);

      // Remove from doctor's schedule
      await doctorRepository.removeAppointment(appointment.doctor, id);

      // Delete appointment from the system
      await appointmentRepository.cancelAppointment(id);
    } else {
      throw new JsonedResponseError(
        "You are not allowed to cancel someone elses appointment",
        404
      );
    }
  }

  //Removing appointments that already happened in users and doc future appointments
  //*use func in service to go through array of appointments do remove those who are done
  async removeAppointment(id) {
    const appointment = await appointmentRepository.getAppointmentById(id);

    if (!appointment) throw new Error("Appointment not found");

    // Remove from user medical record
    await medicalRecordRepository.removeAppointment(appointment.patient, id);

    // Remove from doctor's schedule
    await doctorRepository.removeAppointment(appointment.doctor, id);
  }

  //
  async getAppointmentsByUser(userId) {
    return await appointmentRepository.getAppointmentsByUser(userId);
  }

  async getAppointmentsByDoctor(doctorId) {
    return await appointmentRepository.getAppointmentsByDoctor(doctorId);
  }
}

module.exports = new AppointmentService();
