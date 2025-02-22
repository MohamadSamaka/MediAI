const User = require("../models/userModel");
const MedicalRecord = require("../models/medicalRecordModel");
const ChatLog = require("../models/chatLogModel")

class UserRepository {
  async createUser(userData) {
    let newUser, newMedRecord, newChatLog;

    try {
      // 1. Create the user
      newUser = await User.create(userData);
      if (!newUser) {
        throw new Error("User creation failed.");
      }

      // 2. Create the medical record with reference to the new user
      newMedRecord = await MedicalRecord.create({ userId: newUser._id });
      if (!newMedRecord) {
        // Rollback: delete the user if the medical record creation fails
        await User.findByIdAndDelete(newUser._id);
        throw new Error("Medical record creation failed.");
      }

      // 3. Create the chat log for the new user
      newChatLog = await ChatLog.create({ user_id: newUser._id });
      if (!newChatLog) {
        // Rollback: remove medical record and user if chat log creation fails
        await MedicalRecord.findByIdAndDelete(newMedRecord._id);
        await User.findByIdAndDelete(newUser._id);
        throw new Error("Chat log creation failed.");
      }

      // 4. Update the user with the IDs of the medical record and chat log
      newUser.medicalInfoId = newMedRecord._id;
      newUser.chatLogId = newChatLog._id;
      const updatedUser = await newUser.save();
      if (!updatedUser) {
        // Rollback: delete chat log, medical record, and user if update fails
        await ChatLog.findByIdAndDelete(newChatLog._id);
        await MedicalRecord.findByIdAndDelete(newMedRecord._id);
        await User.findByIdAndDelete(newUser._id);
        throw new Error("User update with associated records failed.");
      }

      return updatedUser;
    } catch (error) {
      throw error;
    }
  }

  async getAllUsers() {
    return await User.find()
  }

  async getUserByEmail(email) {
    return await User.findOne({ email }).populate("roleId", "roleName");
  }

  async getUserById(id, roleAsName = false) {
    return await User.findById(id).populate("roleId", "roleName").toJSON({roleAsName})
  }

  async updateUser(id, updateData) {
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }
}

module.exports = new UserRepository();
