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
      sd
    );
    return res.json(updatedData);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const highlights_update = async (
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

    const sd = _.pick(req.body, ["h1", "d1", "h2", "d2", "h3", "d3"]);

    if (!startupDetails) {
      throw new httpErrors.BadRequest();
    }
    const updatedData = await Startup.update(
      {
        userId: id,
      },
      sd
    );
    return res.json(updatedData);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};
const people_update = async (
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

    const sd = _.pick(req.body, ["p1", "b1", "p2", "b2", "p3", "b3"]);

    if (!startupDetails) {
      throw new httpErrors.BadRequest();
    }
    const updatedData = await Startup.update(
      {
        userId: id,
      },
      sd
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
const pitch_update = async (
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

    const fileUrl = await getImageURL(req.file);

    await Startup.update(
      {
        userId: id,
      },
      {
        pithPdfURL: fileUrl,
      }
    );

    return res.json({ newPdfUrl: fileUrl });
  } catch (error) {
    return _next(error);
  }
};

export {
  dashboad_get,
  details_update,
  logo_update,
  highlights_update,
  people_update,
  pitch_update,
};
