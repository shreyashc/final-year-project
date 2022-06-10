import { NextFunction, Request, Response } from "express";
// import httpErrors from "http-errors";
import _ from "underscore";
import { Messages } from "../models/entities";

const getMychats = async (_req: Request, res: Response, nxt: NextFunction) => {
  try {
    const id = +res.locals.user.id;
    const role = res.locals.user.id;
    let chats;
    if (role === "investor") {
     chats = await Messages.find({
        where: { iUserId:id },
        relations: ["investor"],
      });
    } else {
      chats = await Messages.find({
        where: { sUserId:id },
        relations: ["startup"],
      });
    }

    return res.json(chats);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};
const addNewPchat = async (req: Request, res: Response, nxt: NextFunction) => {
  try {
    const { chatId, investorUnread, startupUnread, sUserId, iUserId } =
      req.body;

    await Messages.insert({
      chatId,
      investorUnread,
      startupUnread,
      sUserId,
      iUserId,
    });
    return res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return nxt(error);
  }
};

export { addNewPchat,getMychats };

