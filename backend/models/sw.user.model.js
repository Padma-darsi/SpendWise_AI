import mongoose from "mongoose";

const swUserSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true
    },

    emailAddress: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },

    hashedPassword: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

/*
  MODEL NAME  : SW_User
  COLLECTION  : sw_users
  (Explicitly defined to avoid overwrite errors)
*/
const SW_User = mongoose.model("SW_User", swUserSchema, "sw_users");

export default SW_User;
