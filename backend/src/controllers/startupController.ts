import { NextFunction, Request, Response } from "express";
import { User } from "../models/entities";
import httpErrors from "http-errors";

const dashboad_get = async (
  _req: Request,
  res: Response,
  _nxt: NextFunction
) => {
  try {
    console.log(res.locals.user);
    const id = res.locals.user.id;
    const startupDetails = await User.findOne({
      where: { id },
      relations: ["startup"],
    });

    if (!startupDetails) throw new httpErrors.NotFound();

    //  delete startupDetails.password;

    return res.json(startupDetails);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export { dashboad_get };
