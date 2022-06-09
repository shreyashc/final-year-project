import { NextFunction, Request, Response } from "express";
// import httpErrors from "http-errors";
import _ from "underscore";
import { Messages } from "../models/entities";

const addNewPchat = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const { chatId, investorUnread, startupUnread, sUserId, iUserId } =
      req.body;

    const m = await Messages.create({
      chatId,
      investorUnread,
      startupUnread,
      sUserId,
      iUserId,
    });
    return res.json(m);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

export { addNewPchat };

