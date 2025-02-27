const doctorRepository = require("../repositories/doctorRepository");
<<<<<<< Updated upstream
const medicalRecordRepository = require("../repositories/medicalRecordRepository");
const appointmentRepository = require("../repositories/appointmentRepository");
const appointmentService= require("../services/appointmentService")

class DoctorService {
  async createDoctor(data, userReq) {
     try {
    if(!userReq.role.toLowerCase()=="admin"){
      throw new Error("you are not admin! you cant create a new doctor")
    }
    else{

      // Validate the request body
      const { error } = validateDoctor(req.body);
      if (error) {
        return res.status(400).json({ errors: error.details.map((e) => e.message) });
      }
      return await doctorRepository.createDoctor(data);
    }
  }
     catch(error){
      return res.status(500).json({ error: err.message });
     }
    }
   
  

  async getDoctorById(data, id) {
    return await doctorRepository.create(id);
  }


  async getDoctorById(id) {
    return await doctorRepository.getDoctorById(id);
=======
const appointmentRepository = require("../repositories/appointmentRepository");
const appointmentService = require("../services/appointmentService");

class DoctorService {
  async createDoctor(data, userReq) {
    try {
      if (!userReq.role.toLowerCase() == "admin") {
        throw new Error("you are not admin! you cant create a new doctor");
      } else {
        // Validate the request body
        const { error } = validateDoctor(req.body);
        if (error) {
          return res
            .status(400)
            .json({ errors: error.details.map((e) => e.message) });
        }
        return await doctorRepository.createDoctor(data);
      }
    } catch (error) {
      return res.status(500).json({ error: err.message });
    }
  }

  async getDoctorById(id) {
    return await doctorRepository.getDoctorbyObjId(id);
>>>>>>> Stashed changes
  }

  async getAllDoctors() {
    return await doctorRepository.getAllDoctors();
  }

  async getDoctorsByExpertise(expertise) {
    return await doctorRepository.getDoctorsByExpertise(expertise);
  }

  async updateDoctor(id, data) {
    return await doctorRepository.updateDoctor(id, data);
  }

  async addAppointment(doctorId, appointment) {
    return await doctorRepository.addAppointment(doctorId, appointment);
  }

  async removeAppointment(doctorId, appointmentId) {
    return await doctorRepository.removeAppointment(doctorId, appointmentId);
  }

<<<<<<< Updated upstream

=======
>>>>>>> Stashed changes
  async getDoctorAppointments(doctorId) {
    return await doctorRepository.getDoctorAppointments(doctorId);
  }

  async getAvailableAppointments(doctorId) {
    return await doctorRepository.getAvailableAppointments(doctorId);
  }

  async getFirstAvailableAppointment(doctorId) {
    return await doctorRepository.getFirstAvailableAppointment(doctorId);
  }

  async cancelAppointment(appointmentId) {
    // Fetch appointment details
<<<<<<< Updated upstream
    const appointment = await appointmentRepository.getAppointmentById(appointmentId);
=======
    const appointment = await appointmentRepository.getAppointmentById(
      appointmentId
    );
>>>>>>> Stashed changes
    if (!appointment) throw new Error("Appointment not found");

    // Goes to appointment service that calls on all the parties to delete the appointment
    return await appointmentService.cancelAppointment(appointmentId);
  }
<<<<<<< Updated upstream



  
=======
>>>>>>> Stashed changes
}

module.exports = new DoctorService();
