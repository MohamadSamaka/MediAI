const connectDB = require("../config/db");
const Expertise = require("../models/expertiseModel");

async function seedExpertise() {
  try {
    // Connect to the database
    await connectDB();
    console.log("MongoDB Connected...");

    // Clear existing expertises
    await Expertise.deleteMany({});
    console.log("Existing expertises cleared.");

    // Sample expertise data
    const expertiseData = [
      { name: "Cardiology", description: "Expertise in heart and vascular system." },
      { name: "Neurology", description: "Expertise in brain and nervous system." },
      { name: "Orthopedics", description: "Expertise in bones and joints." },
      { name: "Dermatology", description: "Expertise in skin, hair, and nails." },
      { name: "Pediatrics", description: "Expertise in child healthcare." }
    ];

    // Insert sample data
    await Expertise.insertMany(expertiseData);
    console.log("Expertise data seeded successfully.");
  } catch (error) {
    console.error("Error seeding expertise:", error);
  }
}

module.exports = seedExpertise;
