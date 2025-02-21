const medicalRecModel = require("../models/medicalRecordModel");

class MedicalRecRepository {
  async getPrescriptions(userId) {
    //this returns all of the medical record we need the prescreption
    const prescriptions = await medicalRecModel.findOne({ userId }, 'prescriptions');
    return prescriptions;
  }
}

module.exports = new MedicalRecRepository();
