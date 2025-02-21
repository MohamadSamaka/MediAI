// src/seeds/seedUsers.js 
//this is for intial data for db

const User = require('../models/userModel');
const Role = require('../models/roleModel');

/**
 * Seeds a default admin user if none exists.
 */
async function seedUsers() {
  const adminRole = await Role.findOne({ roleName: 'admin' });
  if (!adminRole) {
    console.warn(`Admin role not found. Please run "seedRoles" first.`);
    return;
  }

  const existingAdmin = await User.findOne({ email: 'admin@example.com' });
  if (!existingAdmin) {
    const user = await User.create({
      Fname: "Admin",
      Lname: "Admin",
      idPerson: "123456789",
      phone: "1234567891234",
      email: 'admin@example.com',
      password: 'AdminPass123',
      roleId: adminRole._id,
      DateOfBirth: "1990-05-20",
      address: "1234 Maple Street, Springfield, USA"
    });
    console.log(`Seeded default admin user: admin@example.com`);
  }
}

module.exports = seedUsers;