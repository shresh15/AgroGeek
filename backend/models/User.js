import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String, // "farmer" or "company"
  phone: String,
  address: String,
});

const User = mongoose.model("User", UserSchema);
export default User;
