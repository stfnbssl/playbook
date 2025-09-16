import { Request, Response, NextFunction } from "express";

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  const required = process.env.ADMIN_KEY;
  if (!required) return next();
  const got = req.header("x-api-key");
  if (got && got === required) return next();
  res.status(401).json({ error: "unauthorized" });
}

export default requireAuth;
