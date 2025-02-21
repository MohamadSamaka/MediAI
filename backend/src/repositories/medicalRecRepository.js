const medicalRec = require("../models/medicalRecordModel");

class MedicalRecRepository {

    async getPrescriptions(userId){
        //this returns all of the medical record we need the prescreption
       const medicRec= await medicalRec.findOne({userId});
       return medicRec.prescriptions;//is this the right way? 
       medicRec.doctorNotes
    }


}
  

module.exports = new MedicalRecRepository()