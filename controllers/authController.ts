import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader: string | undefined = req.headers["authorization"];
  const accessToken: string | undefined =
    authHeader && authHeader?.split(" ")[1];
  if (accessToken == null) return res.sendStatus(401);
  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err, username) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.body.username = username;
      next();
    }
  );
};
