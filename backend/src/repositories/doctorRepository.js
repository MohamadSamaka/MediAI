const { json } = require("body-parser");
const Doctor = require("../models/DoctorModel");
const JsonedResponseError = require("../errors/JsonedResponseError");

class DoctorRepository {
///later for registration
  async createDoctor(data){
    return await Doctor.create(data);

  }

async getDoctorbyObjId(id){
  return await Doctor.findById(id);
}
    async getDoctorByUserId(docUserId) {
        return await Doctor.find({id: docUserId});
      }
    
      async getAllDoctors() {
        return await Doctor.find();
      }
    
      async getDoctorsByExpertise(expertise) {
        return await Doctor.find({ experties: expertise });
      }
    
      async updateDoctor(id, data) {
        return await Doctor.findByIdAndUpdate(id, data, { new: true });
      }

      // Get doctor's appointments sorted by date
  async getDoctorAppointments(doctorId) {
    try{
      const doc=await Doctor.find(doctorId).select("appointments").populate("appointments.appointment_id");;
   if(!doc){
    throw new JsonedResponseError("doctor not find", 404)
   }
   
    return  doc;
    } catch(error){
      throw new Error(error.message);
    }
   
  }
//we valdiated at appointments
      async addAppointment(doctorId, appointment) {
        return await Doctor.findByIdAndUpdate(
          doctorId,
          { $push: { appointments: appointment } },
          { new: true }
        );
      }
    
      async removeAppointment(doctorId, appointmentId) {
        return await Doctor.findByIdAndUpdate(
          doctorId,
          { $pull: { appointments: { appointment_id: appointmentId } } },
          { new: true }
        );
      }


  async removePastAppointments(doctorId, today) {
    return await Doctor.findByIdAndUpdate(
      doctorId,
      { $pull: { appointments: { appointment_time: { $lt: today } } } }, 
      { new: true }
    );
  }

      async getAvailableAppointments(doctorId) {
        const doctor = await Doctor.findById(doctorId);
        if (!doctor) return [];
    
        const today = new Date();
        let availableSlots = [];
    
        for (let dayOffset = 0; dayOffset < 7; dayOffset++) {
          let day = new Date();
          day.setDate(today.getDate() + dayOffset);
          let dayName = day.toLocaleString("en-US", { weekday: "long" });
    
          let workingDay = doctor.workingTime.find(d => d.day === dayName);
          if (!workingDay) continue;
    
          let startTime = new Date(day.toDateString() + " " + workingDay.start_time);
          let endTime = new Date(day.toDateString() + " " + workingDay.end_time);
    
          // Fetch booked appointments for the doctor on this day
          let bookedAppointments = await this.getDoctorAppointments(doctorId);
       
          let bookedTimes = bookedAppointments.map(a => a.dateTime.getTime());
    
          for (let time = startTime.getTime(); time < endTime.getTime(); time += 15 * 60000) {
            if (!bookedTimes.includes(time)) {
              availableSlots.push({ date: day.toISOString().split("T")[0], time: new Date(time).toTimeString().split(" ")[0] });
            }
          }
        }
        return availableSlots;
      }



  // Get the first available appointment slot
  async getFirstAvailableAppointment(doctorId) {
    let availableAppointments = await this.getAvailableAppointments(doctorId);
    return availableAppointments.length ? availableAppointments[0] : null;
  }
}

module.exports = new DoctorRepository();
