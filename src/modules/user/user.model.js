import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const profileSchema = new mongoose.Schema(
  {
    bio: String,
    skills: [String],
    resumeUrl: String,
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["jobseeker", "employer", "admin"],
      required: true,
    },
    isApproved: {
      type: Boolean,
      default: function () {
        return this.role !== "employer"; // everyone except employers will be auto-approved
      },
    },
    isBlocked: { type: Boolean, default: false },
    profile: profileSchema,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.matchPassword = async function (plain) {
  return bcrypt.compare(plain, this.password);
};

export const User = mongoose.model("User", userSchema);
