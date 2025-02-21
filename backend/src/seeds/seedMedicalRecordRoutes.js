const MedicalRecord = require("../models/medicalRecordModel");
const User = require("../models/userModel");
// const Appointment = require("../models/appointmentModel");

async function seedMedicalRecords() {
  const user = await User.findOne({ email: "admin@example.com" });
  if (!user) {
    console.warn("User not found. Please create a user first.");
    return;
  }

//   const appointment = await Appointment.findOne({ appointment_id: "1234567890" });
//   if (!appointment) {
//     console.warn("Appointment not found. Please create an appointment first.");
//     return;
//   }

  const existingRecord = await MedicalRecord.findOne({ userId: user._id });
  if (!existingRecord) {
    const medicalRecord = new MedicalRecord({
      userId: user._id,
    //   appointmentId: [
    //     {
    //       appointment_time: appointment.appointment_time,
    //       appointment_id: appointment._id,
    //     },
    //   ],
    });

    await medicalRecord.save();
    console.log("Seeded medical record for user:", user.email);
  }
}

module.exports = seedMedicalRecords;
