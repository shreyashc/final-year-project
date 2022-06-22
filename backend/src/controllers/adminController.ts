import { NextFunction, Request, Response } from "express";
import { Investor, Startup } from "../models/entities";

const approveStartup = async (
  req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    const { userid } = req.body;
    await Startup.update(
      { userId: userid },
      {
        approved: true,
      }
    );
    return res.sendStatus(201);
  } catch (error) {
    return nxt(error);
  }
};

const revokeStartupApproval = async (
  req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    const { userid } = req.body;
    await Startup.update(
      { userId: userid },
      {
        approved: false,
      }
    );
    return res.sendStatus(201);
  } catch (error) {
    return nxt(error);
  }
};

const approveInvestor = async (
  req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    const { userid } = req.body;
    await Investor.update(
      { userId: userid },
      {
        approved: true,
      }
    );
    return res.sendStatus(201);
  } catch (error) {
    return nxt(error);
  }
};

const revokeInvestorApproval = async (
  req: Request,
  res: Response,
  nxt: NextFunction
) => {
  try {
    const { userid } = req.body;
    await Investor.update(
      { userId: userid },
      {
        approved: false,
      }
    );
    return res.sendStatus(201);
  } catch (error) {
    return nxt(error);
  }
};

export {
  approveStartup,
  revokeStartupApproval,
  approveInvestor,
  revokeInvestorApproval,
};

