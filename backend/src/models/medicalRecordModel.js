const mongoose = require("mongoose");


const medicalRecordSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  prescriptions: [
    {
      medication: String,
      dosage: String,
      frequency: String,
      prescribed_by: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }, // Doctor ID
      date_prescribed: { type: Date, default: Date.now },
      notes: String,
    },
  ],

  diagnosis: [
    {
      condition: String,
      diagnosed_by: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" }, // Doctor ID
      date: { type: Date, default: Date.now },
    },
  ],

  medicalHistory: {
    type: [String],
    default: [],
    surgeries: {
      type: [String],
      default: [],
    },
  },

  doctorNotes: [
    {
      timestamp: { type: Date, default: Date.now },
      notes:{type: String},
      docId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor" },
    },
  ],

  appointmentId: [
    {
      appointment_time: { type: Date, required: true },
      appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
    
      }
    },
  ],
});

medicalRecordSchema.pre("save", function (next) {
  this.appointments.sort((a, b) => a.appointment_time - b.appointment_time);
  next();
});


module.exports = mongoose.model("MedicalRecord", medicalRecordSchema);



