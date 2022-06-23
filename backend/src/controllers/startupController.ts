import { NextFunction, Request, Response } from "express";
import { Startup, User } from "../models/entities";
import httpErrors from "http-errors";
import _ from "underscore";
import { getImageURL } from "./utils";
import { dataSource } from "../server";

const dashboad_get = async (
  _req: Request,
  res: Response,
  nxt: NextFunction
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
    return nxt(error);
  }
};

const startups_get = async (
  _req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    const startups = await Startup.find();

    return res.json(startups);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

const startup_details_get = async (
  req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    const id = +req.params.startupid;
    const startupDetails = await Startup.findOne({
      where: { id },
    });

    if (!startupDetails) throw new httpErrors.NotFound();

    return res.json(startupDetails);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

const details_update = async (
  req: Request,
  res: Response,
  nxt: NextFunction
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
    return nxt(error);
  }
};

const highlights_update = async (
  req: Request,
  res: Response,
  nxt: NextFunction
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
    return nxt(error);
  }
};

const people_update = async (
  req: Request,
  res: Response,
  nxt: NextFunction
) => {
  console.log(res.locals.user);
  const id = res.locals.user.id;
  try {
    const startupDetails = await Startup.findOne({
      where: { userId: id },
    });

    const sd = _.pick(req.body, [
      "p1",
      "b1",
      "r1",
      "p2",
      "b2",
      "r2",
      "p3",
      "b3",
      "r3",
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
    return nxt(error);
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
  next: NextFunction
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
    return next(error);
  }
};

const job_appl_get = async (
  _req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    const id = res.locals.user.id;
    const queryRunner = await dataSource.createQueryRunner();
    const q = `select a.*, j.*  from job_seeker j ,job_appl a, startup s where a.sid=s.id and a.appluserid=j."userId" and s."userId"=${id}`;
    console.log(q);

    const appls = await queryRunner.manager.query(q);

    return res.json(appls);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

export {
  dashboad_get,
  details_update,
  logo_update,
  highlights_update,
  people_update,
  pitch_update,
  startups_get,
  startup_details_get,
  job_appl_get,
};

