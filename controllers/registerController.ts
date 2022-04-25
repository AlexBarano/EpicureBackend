import e, { Request, Response } from "express";

import * as registerHandler from "../handlers/registerHandler";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    await registerHandler.register(email, password);
  } catch (error) {
    res.status(500).json({ msg: "error registring new user", error });
  }
  res.status(200).json({ msg: "Created new user!" });
};
