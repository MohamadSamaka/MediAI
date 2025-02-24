const connectDB = require("../config/db");
const Locations = require("../models/locationModel");

async function seedLocations() {
  try {
    // Connect to the database
    await connectDB();
    console.log("Database connected.");

    // Clear existing location documents
    await Locations.deleteMany({});
    console.log("Existing locations cleared.");

    // Sample data: each document contains a single location string
    const locationsData = [
      { locationName: "New York" },
      { locationName: "Los Angeles" },
      { locationName: "Chicago" },
      { locationName: "Houston" },
      { locationName: "Phoenix" },
      { locationName: "Philadelphia" },
      { locationName: "San Antonio" },
      { locationName: "San Diego" },
      { locationName: "Dallas" }
    ];

    // Insert sample data into the collection
    await Locations.insertMany(locationsData);
    console.log("Locations seeded successfully.");
  } catch (error) {
    console.error("Error seeding locations:", error);
  }
}

module.exports = seedLocations;
