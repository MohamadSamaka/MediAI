// src/seeds/seedRoles.js

const Role = require('../models/roleModel');

/**
 * Seeds default roles in the DB if they don't already exist.
 */
async function seedRoles() {
  const defaultRoles = ['admin', 'patient', 'doctor'];

  for (const roleName of defaultRoles) {
    // Check if this role already exists
    const existingRole = await Role.findOne( {roleName: roleName});
    if (!existingRole) {
      await Role.create({ roleName: roleName });
      console.log(`Seeded role: ${roleName}`);
    }
  }
}

module.exports = seedRoles;