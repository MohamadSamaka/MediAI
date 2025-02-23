const e = require("express");
const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
  },
  //change with expertiseModel
  experties: {
    type: String,
    required: true,
  },
  ///change with hospitalModel
  location: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Locations",
    required: true,
  },
  workingTime: [
    {
      day: {
        type: String,
        enum: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        required: true,
      },
      start_time: { type: String, required: true }, // Example: "09:00"
      end_time: { type: String, required: true }, // Example: "16:00"
    },
  ],
  appointments: [
    {
      appointment_time: { type: Date, required: true },
      appointment_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true,
      },
    },
  ],
});

//Ensure the appointments array remains sorted by appointment_time
doctorSchema.pre("save", function (next) {
  this.appointments.sort((a, b) => a.appointment_time - b.appointment_time);
  next();
});

module.exports = mongoose.model("Doctor", doctorSchema);
