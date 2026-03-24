import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import User from "../model/user.model.ts";

interface AuthRequest extends Request {
  user?: any;
}

export const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies?.token;
  console.log(token)

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const secret = process.env.JWT_SECRET as string;

    const decoded = jwt.verify(token, secret) as any;

    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = await User.findById(decoded.id);

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

