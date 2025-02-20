const mongoose = require("mongoose");
const { genSalt, hash, compare } = require("bcryptjs");
const Role = require("./roleModel");


const UserSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true
     },
    Fname: { 
        type: String, 
        required: true,
        maxlength: 30,
        minlength: 3
     },
    Lname: { 
        type: String, 
        required: true,
        maxlength: 30,
        minlength: 3
     },
    email: { type: String,
         required: true,
          unique: true
         },
        phone:{
          type: String,
          required: true,
          minlength: 13,
          maxlength: 13,
          unique: true  //מספר טלפון יהיה ייחודי? או לא האם להתיחס שיש ילדים והמספר יהיה מספר ההורים?
        },
    password: { 
        type: String,
         required: true
         }, 
    DateOfBirth: { type: Date,
         required: true
         },
    address: { type: String, 
        required: true
     },
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: Role,
    },

   medicalInfoId: { type: mongoose.Schema.Types.ObjectId, ref: 'medicalRecord' },//creat medical record
   chatLogId:{type:mongoose.Schema.Types.ObjectId, ref: 'chatLog'}//creat chat log
});



UserSchema.set("toJSON", {
  virtuals: true,
  transform: function (doc, ret, options) {
    if (ret.roleId) {
      if (options && options.roleAsName) {
        ret.role = ret.roleId.name;
      } else {
        ret.role = ret.roleId;
      }
      delete ret.roleId;
    }

    delete ret.password;
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

UserSchema.pre("save", async function (next) {
  try {
    if (!this.roleId) {
      const defaultRole = await Role.findOne({ name: "user" });
      if (!defaultRole)
        return next(new Error('Default role "user" not found.'));
      this.roleId = defaultRole._id;
    } else if (this.isModified("roleId")) {
      const role = await Role.findById(this.roleId);
      if (!role) {
        return next(new Error("Invalid roleId: No role found."));
      }
    }

    if (this.isModified("password")) {
      const salt = await genSalt(10);
      this.password = await hash(this.password, salt);
    }

    next();
  } catch (error) {
    next(error);
  }
});

UserSchema.methods.validatePassword = async function (password) {
  return compare(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);
