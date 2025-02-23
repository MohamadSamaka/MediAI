const medicalRecModel = require("../models/medicalRecordModel");

class MedicalRecRepository {
  async getRecordByUserId(userId) {
    return await MedicalRecord.findOne({ userId }).populate("appointmentId.appointment_id");
  }

  async addAppointment(userId, appointment) {
    return await MedicalRecord.findOneAndUpdate(
      { userId },
      { $push: { appointmentId: appointment } },
      { new: true }
    );
  }


  async updateMedicalRecord(id, data) {
    return await MedicalRecord.findByIdAndUpdate(id, data, { new: true });
  }

  async removePastAppointments(userId, today) {
    return await MedicalRecord.findOneAndUpdate(
      { userId },
      { $pull: { appointmentId: { appointment_time: { $lt: today } } } }, 
      { new: true }
    );
  }

  async removeAppointment(userId, appointmentId) {
    return await MedicalRecord.findOneAndUpdate(
      { userId },
      { $pull: { appointmentId: { appointment_id: appointmentId } } },
      { new: true }
    );
  }




  async getPrescriptions(userId) {
    //this returns all of the medical record we need the prescreption
    const prescriptions = await medicalRecModel.findOne({ userId }, 'prescriptions');
    return prescriptions;
  }

  async getDiagnosis(userId) {
    //this returns all of the medical record we need the diagnosis
    const diagnosis = await medicalRecModel.findOne({ userId }, 'diagnosis');
    return diagnosis;
  }

  //returns the future appointments
async getAppointments(userId){
  return await medicalRecModel.findOne({ userId }, 'appointmentId');
    
}


}

module.exports = new MedicalRecRepository();
