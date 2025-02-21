const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    experties: { type: String, required: true }, 
    location: { type: String, required: true }, 
    doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor', required: true },
    dateTime: { type: Date, required: true }, 
    status: { type:Boolean, default: false },//false=available, true=booked 
    patient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null }, 
});

module.exports = mongoose.model('appointment', appointmentSchema);
