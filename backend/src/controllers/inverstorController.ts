import { NextFunction, Request, Response } from "express";
import httpErrors from "http-errors";
import _ from "underscore";
import { Investor, User } from "../models/entities";
import { getImageURL } from "./utils";

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

const dashboad_get = async (
  _req: Request,
  res: Response,
  _nxt: NextFunction
) => {
  try {
    const id = res.locals.user.id;
    const investorDetails = await User.findOne({
      where: { id },
      relations: ["investor"],
    });

    console.log(investorDetails);

    if (!investorDetails) throw new httpErrors.NotFound();

    const { password, ...investorDetailsDto } = investorDetails;

    return res.json(investorDetailsDto);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

const details_investors_get = async (
  req: Request,
  res: Response,
  _nxt: NextFunction
) => {
  try {
    const id = +req.params.id;

    const investorDetails = await User.findOne({
      where: { id },
      relations: ["investor"],
    });

    if (!investorDetails) throw new httpErrors.NotFound();

    const { password, ...investorDetailsDto } = investorDetails;

    return res.json(investorDetailsDto);
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
    const startupDetails = await Investor.findOne({
      where: { userId: id },
    });

    const sd = _.pick(req.body, [
      "displayName",
      "contactEmail",
      "shortDesc",
      "iType",
      "investedIn",
    ]);

    if (!startupDetails) {
      throw new httpErrors.BadRequest();
    }
    const updatedData = await Investor.update(
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

    const startupDetails = await Investor.findOne({
      where: { userId: id },
    });

    if (!startupDetails) {
      throw new httpErrors.BadRequest();
    }

    if (!req.file) throw new httpErrors.BadRequest();

    const imgUrl = await getImageURL(req.file);

    await Investor.update(
      {
        userId: id,
      },
      {
        pfpURL: imgUrl,
      }
    );

    return res.json({ newLogoUrl: imgUrl });
  } catch (error) {
    return res.send(error);
  }
};

export {
  all_investors_get,
  dashboad_get,
  details_update,
  logo_update,
  details_investors_get,
};

