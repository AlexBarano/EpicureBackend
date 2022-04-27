import e, { Request, Response } from "express";

import * as registerHandler from "../handlers/registerHandler";

export const register = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    await registerHandler.register(email, password);
    res.status(201).json({ msg: "Created new user!" });
  } catch (error) {
    res.status(400).json({ msg: "error registring new user", error });
  }
};
