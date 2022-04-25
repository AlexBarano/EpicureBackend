import { Request, Response } from "express";

import * as loginHandler from "../handlers/loginHandler";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // auth user before
  let accessToken: string = "";
  try {
    accessToken = await loginHandler.login(email, password);
  } catch (error) {
    res.status(500).json({ msg: "Error login in", error });
  }
  res.status(200).json({ accessToken });
};
