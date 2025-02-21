//for errors 
const JsonedResponseError = require("../errors/JsonedResponseError");
const MedicalRecRes = require("../repositories/medicalRecRepository");

class MedicalRecService{

    async getPrescriptions(userId){
        MedicalRecRes.getPrescriptions(userId);
    }

}

module.exports = new MedicalRecService()