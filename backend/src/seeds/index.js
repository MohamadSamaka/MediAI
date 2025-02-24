const connectDB = require('../config/db');
const seedMedicalRecords = require('./seedMedicalRecordRoutes');
const seedRoles = require('./seedRoles');
const seedLocations = require('./seedLocations');
const seedUsers = require('./seedUsers'); // if you have it

(async () => {
  try {
    await connectDB();
    await seedRoles();
    await seedLocations()
    await seedUsers();
    await seedMedicalRecords();
    console.log('All seeding operations completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
