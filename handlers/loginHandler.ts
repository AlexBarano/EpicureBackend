import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

import UserAuthFail from "../errors/UserAuthFail";

export const login = async (
  email: string,
  password: string
): Promise<string> => {
  //// find user with email else throw error
  const hashedPassword = "";

  //// compare password with hashed password else throw error
  if (!(await bcrypt.compare(password, hashedPassword))) {
    throw new UserAuthFail("Password does not match");
  }
  //// user is authenticated and can proceed to get the jwt token

  const accessToken = jwt.sign(
    { email, password },
    process.env.ACCESS_TOKEN_SECRET as string
  );
  return accessToken;
};
