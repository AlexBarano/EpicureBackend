import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserSchema from "../models/user";

import UserAuthFail from "../errors/UserAuthFail";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  //// find user with email else throw error
  const user = await UserSchema.findOne({ email });
  if (!user) {
    throw new UserAuthFail(`No user found with email: ${email}`);
  }
  // user hashed pasword from db
  const hashedPassword = user.password;

  //// compare password with hashed password else throw error
  if (!(await bcrypt.compare(password, hashedPassword))) {
    throw new UserAuthFail("Password does not match");
  }
  //// user is authenticated and can proceed to get the jwt token
  const accessToken = jwt.sign(
    { email },
    process.env.ACCESS_TOKEN_SECRET as string,
    { expiresIn: "2m" }
  );
  return accessToken;
};
