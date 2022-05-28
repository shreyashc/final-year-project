import { NextFunction, Request, Response } from "express";
import { Startup, User } from "../models/entities";
import httpErrors from "http-errors";
import _ from "underscore";
import { getImageURL } from "./utils";

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

    const { password, ...startupDetailsDto } = startupDetails;

    return res.json(startupDetailsDto);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const details_update = async (
  req: Request,
  res: Response,
  _nxt: NextFunction
) => {
  console.log(res.locals.user);
  const id = res.locals.user.id;
  try {
    const startupDetails = await Startup.findOne({
      where: { userId: id },
    });

    const sd = _.pick(req.body, [
      "displayName",
      "contactEmail",
      "shortDesc",
      "website",
      "amountRaised",
      "ytURL",
      "revenue",
      "profit",
    ]);

    if (!startupDetails) {
      throw new httpErrors.BadRequest();
    }
    const updatedData = await Startup.update(
      {
        userId: id,
      },
      {
        ...sd,
      }
    );
    return res.json(updatedData);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const logo_update = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const id = res.locals.user.id;

    const startupDetails = await Startup.findOne({
      where: { userId: id },
    });

    if (!startupDetails) {
      throw new httpErrors.BadRequest();
    }

    if (!req.file) throw new httpErrors.BadRequest();

    const imgUrl = await getImageURL(req.file);

    await Startup.update(
      {
        userId: id,
      },
      {
        logoURL: imgUrl,
      }
    );

    return res.json({ newLogoUrl: imgUrl });
  } catch (error) {
    return res.send(error);
  }
};

export { dashboad_get, details_update, logo_update };
