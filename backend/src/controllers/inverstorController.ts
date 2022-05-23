import { NextFunction, Request, Response } from "express";
import { Investor } from "../models/entities";

const all_investors_get = async (
  _req: Request,
  res: Response,
  _nxt: NextFunction
) => {
  try {
    const inverstors = await Investor.find();
    return res.json(inverstors);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export { all_investors_get };
