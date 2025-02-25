const LocationRepository = require("../repositories/locationRepository");
const { validateLocationCreation, validateLocationUpdate } = require("../validators/locationValidator");
const JsonedResponseError = require("../errors/JsonedResponseError");

class LocationService {
  async createLocation(data) {
    validateLocationCreation(data);
    return await LocationRepository.create(data);
  }

  async getLocationById(id) {
    const location = await LocationRepository.findById(id);
    if (!location) throw new JsonedResponseError("Location not found", 404);
    return location;
  }

  async getAllLocations() {
    return await LocationRepository.findAll();
  }

  async updateLocation(id, data) {
    validateLocationUpdate(data);
    const location = await LocationRepository.update(id, data);
    if (!location) throw new JsonedResponseError("Location not found", 404);
    return location;
  }

  async deleteLocation(id) {
    const location = await LocationRepository.delete(id);
    if (!location) throw new JsonedResponseError("Location not found", 404);
    return location;
  }
}

module.exports = new LocationService();
