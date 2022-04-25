import bcrypt from "bcrypt";

export const register = async (
  email: string,
  password: string
): Promise<void> => {
  //// check if email already in db

  //// hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //// add email and hashed password to db
};
