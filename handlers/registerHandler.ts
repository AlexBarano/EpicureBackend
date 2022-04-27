import bcrypt from "bcrypt";

import UserAuthFail from "../errors/UserAuthFail";
import UserSchema from "../models/user";

export const register = async (
  email: string,
  password: string
): Promise<void> => {
  //// check if email already in db
  const exists = await UserSchema.exists({ email });
  if (exists) {
    throw new UserAuthFail(
      `User with email ${email} already exists, try other email`
    );
  }
  //// hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //// add email and hashed password to db
  await UserSchema.create({ email, password: hashedPassword });
};
