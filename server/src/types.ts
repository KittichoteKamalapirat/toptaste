import { Request, Response, Express } from "express";
import { Session } from "express-session";
import { Redis } from "ioredis";
import { createUserLoader } from "./utils/createUserLoader";
export type MyContext = {
  // req: Request & { session: Express.Session };
  req: Request & { session?: Session & { userId?: number } };
  res: Response;
  redis: Redis;
  userLoader: ReturnType<typeof createUserLoader>;
};
