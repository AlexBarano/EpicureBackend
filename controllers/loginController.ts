import { Request, Response } from "express";

import * as loginHandler from "../handlers/loginHandler";

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // auth user before
  let accessToken: string = "";
  try {
    accessToken = await loginHandler.login(email, password);
    res.status(200).json({ accessToken });
  } catch (error) {
    res.status(403).json({ msg: "Error login in", error });
  }
};
