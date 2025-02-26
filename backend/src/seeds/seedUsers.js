const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const Expertise = require("../models/expertiseModel")
const Location = require("../models/locationModel")
const Role = require("../models/roleModel");
const Doctor = require("../models/doctorModel"); // Consistent casing
const ChatLog = require("../models/chatLogModel"); // Adjust the path and casing as needed

/**
 * Creates an empty ChatLog for a given user if one doesn't exist.
 * @param {mongoose.Document} user - The user document.
 */
async function createEmptyChatLog(user) {
  // Check if a ChatLog already exists for the user
  const existingLog = await ChatLog.findOne({ user_id: user._id });
  if (!existingLog) {
    await ChatLog.create({
      user_id: user._id,
      chat_session: [], // empty session array
    });
    console.log(`✅ Empty ChatLog created for user: ${user.email}`);
  } else {
    console.log(`ℹ️  ChatLog already exists for user: ${user.email}`);
  }
}

async function seedUsers() {
  try {
    console.log("Seeding Users...");

    // Fetch required roles
    const adminRole = await Role.findOne({ roleName: "admin" });
    const userRole = await Role.findOne({ roleName: "user" });
    const doctorRole = await Role.findOne({ roleName: "doctor" });
    if (!adminRole || !userRole || !doctorRole) {
      console.warn("One or more roles not found. Please run seedRoles first.");
      return;
    }

    // ----- Seed Admin User -----
    const adminEmail = "admin@example.com";
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      const hashedPassword = "AdminPass123";
      adminUser = await User.create({
        Fname: "Admin",
        Lname: "Admin",
        idPerson: "123456789",
        phone: "1234567891234",
        email: adminEmail,
        password: hashedPassword,
        roleId: adminRole._id,
        DateOfBirth: new Date("1990-05-20"),
        address: "1234 Maple Street, Springfield, USA",
      });
      console.log(`✅ Admin seeded: ${adminEmail}`);
      await createEmptyChatLog(adminUser);
    } else {
      console.log(`ℹ️  Admin already exists: ${adminEmail}`);
    }

    // ----- Seed Normal Users -----
    const normalUsers = [
      {
        Fname: "Jane",
        Lname: "Doe",
        idPerson: "22334455",
        phone: "2233445566778",
        email: "jane.doe@example.com",
        password: "UserPass123",
        DateOfBirth: new Date("1985-02-15"),
        address: "5678 Elm St, Townsville",
        roleId: userRole._id,
      },
      {
        Fname: "Mike",
        Lname: "Ross",
        idPerson: "33445566",
        phone: "3344556677889",
        email: "mike.ross@example.com",
        password: "UserPass123",
        DateOfBirth: new Date("1987-03-20"),
        address: "789 Pine St, Villagetown",
        roleId: userRole._id,
      },
    ];

    for (const userData of normalUsers) {
      let user = await User.findOne({ email: userData.email });
      if (!user) {
        userData.password = userData.password;
        user = await User.create(userData);
        console.log(`✅ Normal user seeded: ${userData.email}`);
        await createEmptyChatLog(user);
      } else {
        console.log(`ℹ️  Normal user already exists: ${userData.email}`);
      }
    }

    // ----- Seed Doctor Users -----
    // Reference IDs for expertise and location (ensure these exist in your DB)
    const expertiseId = new mongoose.Types.ObjectId("67be1caeabf4e58831b39682")
    const locationId = new mongoose.Types.ObjectId("67be1caeabf4e58831b39682");

    const doctors = [
      {
        // Doctor 1
        user: {
          Fname: "John",
          Lname: "Doe",
          idPerson: "93233311",
          phone: "9234567890123",
          email: "john.doe321@example.com",
          password: "secret123",
          DateOfBirth: new Date("1990-01-01"),
          address: "123 Main St, Cityville",
          roleId: doctorRole._id,
        },
        doctorDetails: {
          expertise: expertiseId,
          location: locationId,
          workingTime: [
            { day: "Monday", start_time: "09:00", end_time: "17:00" },
            { day: "Wednesday", start_time: "10:00", end_time: "18:00" },
          ],
        },
      },
      {
        // Doctor 2
        user: {
          Fname: "Alice",
          Lname: "Smith",
          idPerson: "987654321",
          phone: "9876543211234",
          email: "alice.smith@example.com",
          password: "DoctorPass123",
          DateOfBirth: new Date("1980-10-10"),
          address: "321 Oak St, Cityplace",
          roleId: doctorRole._id,
        },
        doctorDetails: {
          expertise: expertiseId,
          location: locationId,
          workingTime: [
            { day: "Monday", start_time: "08:00", end_time: "16:00" },
            { day: "Tuesday", start_time: "09:00", end_time: "17:00" },
          ],
        },
      },
      {
        // Doctor 3
        user: {
          Fname: "Bob",
          Lname: "Johnson",
          idPerson: "111222333",
          phone: "1112223334444",
          email: "bob.johnson@example.com",
          password: "DoctorPass123",
          DateOfBirth: new Date("1978-07-07"),
          address: "654 Cedar Ave, Metropolis",
          roleId: doctorRole._id,
        },
        doctorDetails: {
          expertise: expertiseId,
          location: locationId,
          workingTime: [
            { day: "Tuesday", start_time: "10:00", end_time: "18:00" },
            { day: "Thursday", start_time: "09:00", end_time: "17:00" },
          ],
        },
      },
    ];

    for (const entry of doctors) {
      let doctorUser = await User.findOne({ email: entry.user.email });
      if (!doctorUser) {
        entry.user.password = entry.user.password;
        doctorUser = await User.create(entry.user);
        console.log(`✅ Doctor seeded: ${entry.user.email}`);
        await Doctor.create({
          id: doctorUser._id, // Link to the User model
          expertise: entry.doctorDetails.expertise,
          location: entry.doctorDetails.location,
          workingTime: entry.doctorDetails.workingTime,
        });
        console.log(`✅ Doctor details linked for: ${entry.user.email}`);
        await createEmptyChatLog(doctorUser);
      } else {
        console.log(`ℹ️  Doctor already exists: ${entry.user.email}`);
      }
    }
  } catch (error) {
    console.error("❌ Error seeding users:", error);
    throw error;
  }
}

module.exports = seedUsers;
