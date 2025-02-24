const LocationService = require("../services/locationService");

class LocationController {
  async create(req, res, next) {
    try {
      const location = await LocationService.createLocation(req.body);
      res.status(201).json(location);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const location = await LocationService.getLocationById(req.params.id);
      res.json(location);
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const locations = await LocationService.getAllLocations();
      res.json(locations);
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const location = await LocationService.updateLocation(req.params.id, req.body);
      res.json(location);
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      await LocationService.deleteLocation(req.params.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new LocationController();
