const cron = require("node-cron");
const appointmentService = require("../services/appointmentService");


// Remove past appointments daily at midnight

cron.schedule("0 0 * * *", async () => {
  console.log("Running daily appointment cleanup...");
  const today = new Date();
  const pastAppointments = await appointmentService.getAllAppointments();

  for (let appointment of pastAppointments) {
    if (appointment.dateTime < today) {
      await appointmentService.removeAppointment(appointment._id);
    }
  }
});


async function UpdateAppointments(){

  cron.schedule("0 0 * * *", async () => {
    console.log("Running daily appointment cleanup...");
    const today = new Date();
    const pastAppointments = await appointmentService.getAllAppointments();
  
    for (let appointment of pastAppointments) {
      if (appointment.dateTime < today) {
        await appointmentService.removeAppointment(appointment._id);
      }
    }
  });

}