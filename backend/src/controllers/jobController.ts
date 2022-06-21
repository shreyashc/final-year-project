import { NextFunction, Request, Response } from "express";

// import httpErrors from "http-errors";
import { Jobs } from "../models/entities/Jobs";


const addJob = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const { title, description, experience, salary, applyby} =
      req.body;
      const userid = +res.locals.user.id;
    await Jobs.insert({
      title, description, experience, salary, applyby, userid
    });
    return res.sendStatus(201);
  } catch (error) {
    return nxt(error);
  }
};


const getJobs = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const userid = +res.locals.user.id;
    
    const jobs= await Jobs.find({
      where: { userid}
    });
    return res.json(jobs);
  } catch (error) {
    return nxt(error);
  }
};

export { addJob , getJobs};

