const roleService = require("../services/roleService");

class RoleController {
 
  async getAllRoles(req, res) {
    try {
      const roles = await roleService.getAllRoles();
      return res.status(200).json({
        success: true,
        data: roles,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  
///check what is dis for
  async getRoleById(req, res) {
    try {
      const { id } = req.params;
      const role = await roleService.getRoleById(id);
      if (!role) {
        return res.status(404).json({
          success: false,
          message: "Role not found",
        });
      }
      return res.status(200).json({
        success: true,
        data: role,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateRole(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const updatedRole = await roleService.updateRole(id, updateData);

      if (!updatedRole) {
        return res.status(404).json({
          success: false,
          message: "Role not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: updatedRole,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteRole(req, res) {
    try {
      const { id } = req.params;
      const deletedRole = await roleService.deleteRole(id);

      if (!deletedRole) {
        return res.status(404).json({
          success: false,
          message: "Role not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: deletedRole,
      });
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new RoleController();
