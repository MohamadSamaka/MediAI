const cron = require("node-cron");
const doctorRepository = require("../repositories/doctorRepository");
const medicalRecordRepository = require("../repositories/medicalRecordRepository");

async function cleanUpDoctorAppointments() {
  console.log("Running daily doctor appointment cleanup...");
  const today = new Date();

  // Find all doctors and remove past appointments
  const doctors = await doctorRepository.getAllDoctors();
  for (let doctor of doctors) {
    await doctorRepository.removePastAppointments(doctor._id, today);
    console.log(`Removed past appointments for Doctor: ${doctor._id}`);//for debug
  }
}

async function cleanUpMedicalRecords() {
  console.log("Running daily medical record cleanup...");
  const today = new Date();

  // Find all medical records and remove past appointments
  const medicalRecords = await medicalRecordRepository.getMedicalRecordByUserId();
  for (let record of medicalRecords) {
    await medicalRecordRepository.removePastAppointments(record.userId, today);
    console.log(`Removed past appointments from Medical Record: ${record.userId}`); //debugging
  }
}

// Run daily cleanup at midnight
cron.schedule("0 0 * * *", async () => {
  await cleanUpDoctorAppointments();
  await cleanUpMedicalRecords();
});
