import mongoose from "mongoose";

const alertSchema = new mongoose.Schema(
  {
    userRef: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    title: String,
    message: String,
    type: {
      type: String,
      enum: ["info", "warning", "danger"],
      default: "info"
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

export default mongoose.model("Alert", alertSchema);
