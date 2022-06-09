import { NextFunction, Request, Response } from "express";
// import httpErrors from "http-errors";
import _ from "underscore";
import { Messages } from "../models/entities";

const addNewPchat = async (req: Request, res: Response, _nxt: NextFunction) => {
  try {
    const { chatId, investorUnread, startupUnread, sUserId, iUserId } =
      req.body;

    await Messages.create({
      chatId,
      investorUnread,
      startupUnread,
      sUserId,
      iUserId,
    });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
};

export { addNewPchat };

