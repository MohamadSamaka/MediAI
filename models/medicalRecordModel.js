const mongoose = require('mongoose');

const medicalRecordSchema = new mongoose.Schema({
    userId: { type: String, required: true }, 
    medications: { type: [String], default: [] }, 
    currentDiagnosis: { type: [String], default: [] },
    allergies: { type: [String], default: [] }, 
    pastDiseases: { type: [String], default: [] }, 
    surgeries: { type: [String], default: [] }, 
    notes: { type: String, default: "" }, 
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);

