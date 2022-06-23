import { NextFunction, Request, Response } from "express";
import httpErrors from "http-errors";
import { dataSource } from "../server";
import _ from "underscore";
import { JobAppl, JobSeeker, User } from "../models/entities";
import { getImageURL } from "./utils";

const dashboad_get = async (
  _req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    const id = res.locals.user.id;
    const seekerDetails = await User.findOne({
      where: { id },
      relations: ["jobseeker"],
    });

    if (!seekerDetails) throw new httpErrors.NotFound();

    const { password, ...seekerDetailsDto } = seekerDetails;

    return res.json(seekerDetailsDto);
  } catch (error) {
    console.log(error);
    return nxt(error);
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
      relations: ["jobseeker"],
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
  nxt: NextFunction
) => {
  console.log(res.locals.user);
  const id = res.locals.user.id;
  try {
    const startupDetails = await JobSeeker.findOne({
      where: { userId: id },
    });
    console.log(startupDetails);

    const sd = _.pick(req.body, [
      "displayName",
      "about",
      "skills",
      "education",
    ]);

    if (!startupDetails) {
      throw new httpErrors.BadRequest();
    }
    const updatedData = await JobSeeker.update(
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
    return nxt(error);
  }
};

const logo_update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = res.locals.user.id;

    const startupDetails = await JobSeeker.findOne({
      where: { userId: id },
    });

    if (!startupDetails) {
      throw new httpErrors.BadRequest();
    }

    if (!req.file) throw new httpErrors.BadRequest();

    const imgUrl = await getImageURL(req.file);

    await JobSeeker.update(
      {
        userId: id,
      },
      {
        pfpURL: imgUrl,
      }
    );

    return res.json({ newLogoUrl: imgUrl });
  } catch (error) {
    return next(error);
  }
};

const resume_update = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = res.locals.user.id;

    const startupDetails = await JobSeeker.findOne({
      where: { userId: id },
    });

    if (!startupDetails) {
      throw new httpErrors.BadRequest();
    }

    if (!req.file) throw new httpErrors.BadRequest();

    const fileUrl = await getImageURL(req.file);

    await JobSeeker.update(
      {
        userId: id,
      },
      {
        resumePdfURL: fileUrl,
      }
    );

    return res.json({ newPdfUrl: fileUrl });
  } catch (error) {
    return next(error);
  }
};

const jobs_get = async (_req: Request, res: Response, nxt: NextFunction) => {
  try {
    const queryRunner = await dataSource.createQueryRunner();
    const jobs = await queryRunner.manager.query(
      `select j.*,s.id as sid, s."displayName", s."userId" as suserid from jobs j, startup s where s."userId" = j.userid;`
    );

    return res.json(jobs);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

const apply_job = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const { sid, title } = req.body;

    const appluserid = res.locals.user.id;

    await JobAppl.insert({
      sid,
      appluserid,
      title,
    });

    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

const profile_get = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const id = +req.params.id;
    const seekerDetails = await User.findOne({
      where: { id },
      relations: ["jobseeker"],
    });

    if (!seekerDetails) throw new httpErrors.NotFound();

    const { password, ...seekerDetailsDto } = seekerDetails;

    return res.json(seekerDetailsDto);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

export {
  dashboad_get,
  details_update,
  logo_update,
  details_investors_get,
  resume_update,
  jobs_get,
  apply_job,
  profile_get,
};

