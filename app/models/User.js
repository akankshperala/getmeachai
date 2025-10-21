import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
//   name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  profilepic: { type: String, required: true },
  password: { type: String, required: true },
  coverpic: { type: String, required: true },
  razorpayid: { type: String, required: true },
  razorpaysecret: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export default User;
