const doctorService = require("../services/doctorService");

class DoctorController {
  async getDoctor(req, res) {
    try {
      const doctor = await doctorService.getDoctorById(req.params.id);
      res.json(doctor);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctor" });
    }
  }

  //this is for admin
  async getAllDoctors(req, res) {
    try {
      const doctors = await doctorService.getAllDoctors();
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctors" });
    }
  }


  async getDoctorsByExpertise(req, res) {
    try {
      const doctors = await doctorService.getDoctorsByExpertise(req.params.expertise);
      res.json(doctors);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctors by expertise" });
    }
  }

  async getDoctorAppointments(req, res) {
    try {
      const appointments = await doctorService.getDoctorAppointments(req.params.doctorId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching doctor appointments" });
    }
  }

  async getAvailableAppointments(req, res) {
    try {
      const appointments = await doctorService.getAvailableAppointments(req.params.doctorId);
      res.json(appointments);
    } catch (error) {
      res.status(500).json({ message: "Error fetching available appointments" });
    }
  }

  async getFirstAvailableAppointment(req, res) {
    try {
      const appointment = await doctorService.getFirstAvailableAppointment(req.params.doctorId);
      res.json(appointment);
    } catch (error) {
      res.status(500).json({ message: "Error fetching first available appointment" });
    }
  }
///it will call on deleting in user and appointments as well
  async cancelAppointment(req, res) {
    try {
      await doctorService.cancelAppointment(req.params.appointmentId);
      res.json({ message: "Appointment successfully canceled" });
    } catch (error) {
      res.status(500).json({ message: "Error canceling appointment", error: error.message });
    }
}

}

module.exports = new DoctorController();
