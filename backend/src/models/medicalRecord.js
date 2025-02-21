const mongoose = require('mongoose');
const appointment = require('./appointment');

const medicalRecordSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true}, 
    prescriptions: [ {  
        medication: String, 
        dosage: String, 
        frequency: String, 
        prescribed_by: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }, // Doctor ID 
        date_prescribed: { type: Date, default: Date.now }, notes: String } ],
        
        
        diagnosis: [ { condition: String, diagnosed_by: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }, // Doctor ID 
        date: { type: Date, default: Date.now } }, ] ,
    
        
    medicalHistory: { 
        type: [String],
        default: [] , 
    surgeries:  {type: [String], 
    default: []}
}, 
   doctorNotes:[{ timestamp: { type: Date, default: Date.now }, notes: string, docId:{type: mongoose.Schema.Types.ObjectId, ref: "Doctor"}}],
appointmentId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Appointment', required: true }]
});

module.exports = mongoose.model('MedicalRecord', medicalRecordSchema);

