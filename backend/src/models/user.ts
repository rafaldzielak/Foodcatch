import mongoose from "mongoose";
import bcrypt from "bcryptjs";

export interface UserAttrs {
  email: string;
  password: string;
  isAdmin: boolean;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

export interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  isAdmin: boolean;
}

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true, select: false },
  isAdmin: { type: Boolean, required: true },
});

userSchema.statics.build = async (attrs: UserAttrs) => {
  const { email, password } = attrs;

  let existingUser = await User.findOne({ email });
  console.log(existingUser);
  if (existingUser) throw new Error("User with that email already exists!");
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = new User({ ...attrs, isAdmin: false, password: hashedPassword });
  await user.save();
  return user;
};

const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
