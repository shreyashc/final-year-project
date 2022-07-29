import { NextFunction, Request, Response } from "express";

import httpErrors from "http-errors";
import { Jobs, Startup } from "../models/entities/";

const addJob = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const { title, description, experience, salary, applyby } = req.body;
    const userid = +res.locals.user.id;
    await Jobs.insert({
      title,
      description,
      experience,
      salary,
      applyby,
      userid,
    });
    return res.sendStatus(201);
  } catch (error) {
    return nxt(error);
  }
};

const getJobs = async (_req: Request, res: Response, nxt: NextFunction) => {
  try {
    const userid = +res.locals.user.id;

    const jobs = await Jobs.find({
      where: { userid },
    });
    return res.json(jobs);
  } catch (error) {
    return nxt(error);
  }
};

const getJobsId = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const id = +req.params.sid;

    const s = await Startup.findOne({
      where: { id },
    });

    if (!s) throw new httpErrors.NotFound();

    const jobs = await Jobs.find({
      where: { userid: s.userId },
    });
    return res.json(jobs);
  } catch (error) {
    return nxt(error);
  }
};

export { addJob, getJobs, getJobsId };

