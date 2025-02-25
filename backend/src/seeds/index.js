// src/seeds/index.js

const connectDB = require('../config/db');
const seedMedicalRecords = require('./seedMedicalRecordRoutes');
const seedRoles = require('./seedRoles');
const seedUsers = require('./seedUsers'); // if you have it
const shirinSeeds=require('./shirinSeeds');

(async () => {
  try {
    await connectDB();
    //await shirinSeed();
    //await seedRoles();

    ///await seedUsers();
    ///await seedMedicalRecords();

    console.log('All seeding operations completed.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
})();
