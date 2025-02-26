const Locations = require("../models/locationModel");

class LocationRepository {
  async create(data) {
    return await Locations.create(data);
  }

  async findById(id) {
    return await Locations.findById(id);
  }

  async findAll() {
    return await Locations.find({});
  }

  async update(id, data) {
    return await Locations.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return await Locations.findByIdAndDelete(id);
  }
}

module.exports = new LocationRepository();
